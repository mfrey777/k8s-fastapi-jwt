
from .user import User
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from sqlalchemy.orm import sessionmaker
from .base import Base
from app.routers.auth import get_password_hash

SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./sql_app.db"
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, future=True, echo=True)
async_session = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession)

# Base.metadata.create_all(engine)


async def init_models():
    async with engine.begin() as conn:
        print('before dropping all')
        await conn.run_sync(Base.metadata.drop_all)
        print('after dropping all / before creating all')
        await conn.run_sync(Base.metadata.create_all)
        print('after creating all')


async def init_data():
    async with async_session() as session:
        async with session.begin():
            username = 'username'
            password = 'password'
            session.add_all(
                [
                    User(username=username, email=username, full_name=username,
                         disabled=True, hashed_password=get_password_hash(password))
                ])
        await session.commit()
    return {"msg": "User succesfully created", "tenant": "t1"}
