from datetime import timedelta

from app.models.user import User as UserModel
from fastapi import APIRouter, HTTPException, Depends
from pydantic.types import StrictStr
from starlette.requests import Request

from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from starlette.requests import Request

from pydantic import BaseModel
from sqlalchemy import select

from app.schemas.user import UserInDB as UserinDBSchema

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}


class Message(BaseModel):
    msg: str


class Settings(BaseModel):
    authjwt_secret_key: str = "secret"
    # Configure application to store and get JWT from cookies
    authjwt_token_location: set = {"cookies"}
    # Only allow JWT cookies to be sent over https
    authjwt_cookie_secure: bool = False
    # Enable csrf double submit protection. default is True
    authjwt_cookie_csrf_protect: bool = True
    # Change to 'lax' in production to make your website more secure from CSRF Attacks, default is None
    # authjwt_cookie_samesite: str = 'lax'
    authjwt_denylist_enabled: bool = True
    authjwt_denylist_token_checks: set = {"access", "refresh"}
    access_expires: int = timedelta(minutes=15)
    refresh_expires: int = timedelta(days=30)


settings = Settings()


@ AuthJWT.load_config
def get_config():
    return Settings()


@ AuthJWT.token_in_denylist_loader
def check_if_token_in_denylist(decrypted_token):
    jti = decrypted_token['jti']
    print(jti)
    return False
    # entry = request.app.state.redis.get(jti)

    # return entry and entry == 'true'


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        user = UserinDBSchema(**user_dict)
        return user


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter()


class NewUser(BaseModel):
    username: str
    password: str
    confirm_password: str


@router.post('/create-user', response_model=Message)
async def login(request: Request, newUser: NewUser):
    """
    With authjwt_cookie_csrf_protect set to True, set_access_cookies() and
    set_refresh_cookies() will now also set the non-httponly CSRF cookies
    """

    # check if user exists

    # Check if password matches

    # create new user
    async with request.app.state.db_session as session:
        async with session.begin():
            session.add_all(
                [
                    UserModel(username=newUser.username, email=newUser.username, full_name=newUser.username,
                              disabled=True, hashed_password=get_password_hash(newUser.password))
                ])
        await session.commit()

    return {"msg": "User succesfully created", "tenant": "t1"}


@router.post('/login', response_model=Message)
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), Authorize: AuthJWT = Depends()):
    """
    With authjwt_cookie_csrf_protect set to True, set_access_cookies() and
    set_refresh_cookies() will now also set the non-httponly CSRF cookies
    """
    ret = {}

    async with request.app.state.db_session as session:
        async with session.begin():
            stmt = select(UserModel).where(
                UserModel.username == form_data.username)
            result = await session.execute(stmt)
            for a1 in result.scalars():
                if verify_password(form_data.password, a1.hashed_password):
                    ret['msg'] = "Successfully login"
                else:
                    raise HTTPException(status_code=401,
                                        detail="Bad username or password")

    # if not authenticate_user(fake_users_db, user.username, user.password):
    # if not authenticate_user(fake_users_db, form_data.username, form_data.password):
        # raise HTTPException(status_code=401, detail="Bad username or password")

    # Create the tokens and passing to set_access_cookies or set_refresh_cookies
    # access_token = Authorize.create_access_token(subject=user.username)
    # refresh_token = Authorize.create_refresh_token(subject=user.username)
    access_token = Authorize.create_access_token(subject=form_data.username)
    refresh_token = Authorize.create_refresh_token(subject=form_data.username)

    # Set the JWT and CSRF double submit cookies in the response
    Authorize.set_access_cookies(access_token)
    Authorize.set_refresh_cookies(refresh_token)
    ret['tenant'] = 't1'
    return ret


@ router.post('/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    # Set the JWT and CSRF double submit cookies in the response
    Authorize.set_access_cookies(new_access_token)
    return {"msg": "The token has been refresh"}


@ router.delete('/logout')
def logout(Authorize: AuthJWT = Depends()):
    """
    Because the JWT are stored in an httponly cookie now, we cannot
    log the user out by simply deleting the cookie in the frontend.
    We need the backend to send us a response to delete the cookies.
    """
    Authorize.jwt_required()

    Authorize.unset_jwt_cookies()
    return {"msg": "Successfully logout"}


# Endpoint for revoking the current users access token
@router.delete('/access-revoke')
async def access_revoke(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    # Store the tokens in redis with the value true for revoked.
    # We can also set an expires time on these tokens in redis,
    # so they will get automatically removed after they expired.
    jti = Authorize.get_raw_jwt()['jti']
    # request.app.state.redis.setex(jti, settings.access_expires, 'true')
    await request.app.state.redis.setex(jti, 10000, 'true')
    return {"detail": "Access token has been revoked"}


# Endpoint for revoking the current users refresh token
@router.delete('/refresh-revoke')
async def refresh_revoke(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    jti = Authorize.get_raw_jwt()['jti']
    await request.app.state.redis.setex(jti, settings.refresh_expires, 'true')
    return {"detail": "Refresh token has been revoke"}
