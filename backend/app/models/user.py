from sqlalchemy import Column, Integer, String
from sqlalchemy.sql.elements import BooleanClauseList
from sqlalchemy.types import Date
from app.connections import Base


class User(Base):
    username:  Column(String, primary_key=True, index=True)
    email: Column(String)
    full_name: Column(String)
    disabled: Column(bool)
    hashed_password: Column(String)
