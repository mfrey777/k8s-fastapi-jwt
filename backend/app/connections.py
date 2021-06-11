# from sqlalchemy.sql.sqltypes import Boolean
# from sqlalchemy.types import Date
# from sqlalchemy.sql.elements import BooleanClauseList
# from sqlalchemy import Column, Integer, Boolean,  String
import os
from aioredis import create_redis_pool, Redis

# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession


async def get_redis_pool() -> Redis:
    REDIS_HOST = os.environ.get('REDIS_HOST') or ''
    REDIS_PORT = os.environ.get('REDIS_PORT') or '6379'
    REDIS_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT
    print('creating redis pool with url: ' + REDIS_URL + '/0?encoding=utf-8')
    redis = await create_redis_pool(REDIS_URL)
    # redis = await create_redis_pool((REDIS_PORT, REDIS_PORT), '/0?encoding=utf-8')
    print('redis pool created')
    return redis


# SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./sql_app.db"
# engine = create_async_engine(SQLALCHEMY_DATABASE_URL, future=True, echo=True)
# async_session = sessionmaker(
#     engine, expire_on_commit=False, class_=AsyncSession)
# Base = declarative_base()


# class User(Base):
#     __tablename__ = 'user'
#     # user_id: Column(Integer, primary_key=True, index=True)
#     username = Column(String, primary_key=True, index=True)
#     email = Column(String)
#     full_name = Column(String)
#     disabled = Column(Boolean)
#     hashed_password = Column(String)


# async def init_models():
#     async with engine.begin() as conn:
#         print('before dropping all')
#         await conn.run_sync(Base.metadata.drop_all)
#         print('after dropping all / before creating all')
#         await conn.run_sync(Base.metadata.create_all)
#         print('after creating all')
