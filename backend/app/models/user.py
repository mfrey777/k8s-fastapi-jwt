from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.types import Date
from .base import Base


class User(Base):
    __tablename__ = 'user'
    username = Column(String, primary_key=True, index=True)
    email = Column(String)
    full_name = Column(String)
    disabled = Column(Boolean)
    hashed_password = Column(String)
