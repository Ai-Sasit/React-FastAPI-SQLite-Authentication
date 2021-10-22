from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    email: str
    is_superuser: bool
    password: str
    
class Login(BaseModel):
	username: str
	password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    is_superuser: Optional[bool] = None