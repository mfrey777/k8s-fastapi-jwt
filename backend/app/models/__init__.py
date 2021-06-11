
from .user import User
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from sqlalchemy.orm import sessionmaker
from .base import Base

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
