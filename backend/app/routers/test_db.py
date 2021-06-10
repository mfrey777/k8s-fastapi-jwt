from fastapi import APIRouter
from starlette.requests import Request

from typing import Optional, List
from sqlalchemy import text
from pydantic import BaseModel
from sqlalchemy.future import select
from app.schemas.user import User, UserInDB


# class User(BaseModel):
#     username: str
#     email: Optional[str] = None
#     full_name: Optional[str] = None
#     disabled: Optional[bool] = None


# class UserInDB(User):
#     hashed_password: str


class UserInDBSchema(BaseModel):
    username: str
    email: str
    full_name: str
    disabled: bool
    dehashed_passwordaths: str


router = APIRouter()


@router.get("/orm", response_model=List[UserInDBSchema])
async def show_records_orm(request: Request):
    #     records = db.query(models.Record).all()
    #     return records
    async with request.app.state.db_session as session:
        async with session.begin():
            records = await session.execute(select(UserInDB).order_by(UserInDB.id).where(UserInDB.id < 100))
            return records.scalars().all()


@router.get("/orm_sql", response_model=List[UserInDBSchema])
async def show_records_orm_sql(request: Request):
    #     records = db.query(models.Record).all()
    #     return records
    async with request.app.state.db_session as session:
        async with session.begin():
            resultset = await session.execute(text('SELECT * FROM User'))
            results_as_dict = resultset.mappings().all()
            return results_as_dict


@router.get("/core", response_model=List[UserInDBSchema])
async def show_records_core(request: Request):
    #     records = db.query(models.Record).all()
    #     return records
    async with request.app.state.db_ession as session:
        conn = await session.connection()
        # resultset = await conn.execute(select(Record).order_by(Record.id).where(Record.id < 100))
        resultset = await conn.execute(text('SELECT * FROM User'))
        results_as_dict = resultset.mappings().all()
        return results_as_dict
