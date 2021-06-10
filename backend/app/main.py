from jose import JWTError, jwt
from typing import Optional, List

from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from sqlalchemy import text
from pydantic import BaseModel
from sqlalchemy.future import select

from .connections import get_redis_pool, async_session, init_models

from .routers import test_redis, test_db
from .schemas.user import UserInDB


"""
By default, the CRSF cookies will be called csrf_access_token and
csrf_refresh_token, and in protected endpoints we will look
for the CSRF token in the 'X-CSRF-Token' headers. only certain
methods should define CSRF token in headers default is ('POST','PUT','PATCH','DELETE')
"""


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI(docs_url='/api/docs', openapi_url='/api/openapi.json')
# app = FastAPI()

app.include_router(test_redis.router, prefix="/api/redis")
app.include_router(test_db.router, prefix="/api/db")

# # database
# @app.on_event("startup")
# async def startup_db_client():
#     app.pg_client = AsyncIOMotorClient(settings.DB_URL)
#     app.pg = app.mongodb_client[settings.DB_NAME]


# @app.on_event("shutdown")
# async def shutdown_db_client():
#     app.mongodb_client.close()


# CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


class BasicUser(BaseModel):
    username: str
    password: str


# class User(BaseModel):
#     username: str
#     email: Optional[str] = None
#     full_name: Optional[str] = None
#     disabled: Optional[bool] = None


# class UserInDB(User):
#     hashed_password: str


# class UserInDBSchema(BaseModel):
#     username: str
#     email: str
#     full_name: str
#     disabled: bool
#     dehashed_passwordaths: str


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


@ AuthJWT.load_config
def get_config():
    return Settings()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


@app.on_event('startup')
async def starup_event():
    print('app startup triggered')
    app.state.redis = await get_redis_pool()
    print('before init_models')
    await init_models()
    print('after init_models')
    app.state.db_session = async_session()


@app.on_event('shutdown')
async def shutdown_event():
    await app.state.redis.wait_closed()
    # await app.state.db_session.wait_closed()


# @app.get('/api/redis-set-key')
# async def redis_set_key():
#     await app.state.redis.set('key', 'val')
#     return True


# @app.get('/api/redis-get-key')
# async def redis_get_key():
#     val = await app.state.redis.get('key')
#     return val


# async def get_all():
#     return await app.state.redis.keys('*')

# @app.get('/api/redis-get-all')
# async def redis_keys():
#     return get_all()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@app.post('/api/login', response_model=Message)
# def login(user: BasicUser, Authorize: AuthJWT = Depends()):
async def login(form_data: OAuth2PasswordRequestForm = Depends(), Authorize: AuthJWT = Depends()):
    """
    With authjwt_cookie_csrf_protect set to True, set_access_cookies() and
    set_refresh_cookies() will now also set the non-httponly CSRF cookies
    """

    # if not authenticate_user(fake_users_db, user.username, user.password):
    if not authenticate_user(fake_users_db, form_data.username, form_data.password):
        raise HTTPException(status_code=401, detail="Bad username or password")

    # Create the tokens and passing to set_access_cookies or set_refresh_cookies
    # access_token = Authorize.create_access_token(subject=user.username)
    # refresh_token = Authorize.create_refresh_token(subject=user.username)
    access_token = Authorize.create_access_token(subject=form_data.username)
    refresh_token = Authorize.create_refresh_token(subject=form_data.username)

    # Set the JWT and CSRF double submit cookies in the response
    Authorize.set_access_cookies(access_token)
    Authorize.set_refresh_cookies(refresh_token)
    return {"msg": "Successfully login"}


@app.post('/api/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    # Set the JWT and CSRF double submit cookies in the response
    Authorize.set_access_cookies(new_access_token)
    return {"msg": "The token has been refresh"}


@app.delete('/api/logout')
def logout(Authorize: AuthJWT = Depends()):
    """
    Because the JWT are stored in an httponly cookie now, we cannot
    log the user out by simply deleting the cookie in the frontend.
    We need the backend to send us a response to delete the cookies.
    """
    Authorize.jwt_required()

    Authorize.unset_jwt_cookies()
    return {"msg": "Successfully logout"}


@app.get('/api/protected')
def protected(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"user": current_user}


# @app.get("/api/records/orm", response_model=List[UserInDBSchema])
# async def show_records_orm():
#     #     records = db.query(models.Record).all()
#     #     return records
#     async with async_session() as session:
#         async with session.begin():
#             records = await session.execute(select(UserInDB).order_by(UserInDB.id).where(UserInDB.id < 100))
#             return records.scalars().all()


# @app.get("/api/records/orm_sql", response_model=List[UserInDBSchema])
# async def show_records_orm_sql():
#     #     records = db.query(models.Record).all()
#     #     return records
#     async with async_session() as session:
#         async with session.begin():
#             resultset = await session.execute(text('SELECT * FROM Records WHERE id < 100 ORDER BY id'))
#             results_as_dict = resultset.mappings().all()
#             return results_as_dict


# @app.get("/api/records/core", response_model=List[UserInDBSchema])
# async def show_records_core():
#     #     records = db.query(models.Record).all()
#     #     return records
#     async with async_session()as session:
#         conn = await session.connection()
#         # resultset = await conn.execute(select(Record).order_by(Record.id).where(Record.id < 100))
#         resultset = await conn.execute(text('SELECT * FROM Records WHERE id < 100 ORDER BY id'))
#         results_as_dict = resultset.mappings().all()
#         return results_as_dict
