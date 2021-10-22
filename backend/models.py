from sqlalchemy import Table, Column , MetaData
from sqlalchemy.sql.sqltypes import Boolean, Integer, String
from database import engine

meta = MetaData()

Users = Table('Users', meta,
    Column('id', Integer, unique=True, primary_key=True),
    Column('username',String),
    Column('email', String),
    Column('is_superuser',Boolean),
    Column('password', String),
)

meta.create_all(engine)