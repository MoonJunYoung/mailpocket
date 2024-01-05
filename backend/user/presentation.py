from typing import Optional

from fastapi import APIRouter, Header
from pydantic import BaseModel

from backend.base.exceptions import catch_exception
from backend.base.token import Token
from backend.user.service import UserService

user_service = UserService()


class LogInData(BaseModel):
    identifier: str
    password: str
    name: str = None


class OauthData(BaseModel):
    token: str


class DepositInformationData(BaseModel):
    bank: Optional[str] = None
    account_number: Optional[str] = None
    kakao_deposit_id: Optional[str] = None


class UserPresentation:
    router = APIRouter(prefix="/api/user")

    @router.get("", status_code=200)
    async def read(Authorization: str = Header(None)):
        pass

    @router.post("/sign-up", status_code=201)
    async def sign_up(login_data: LogInData):
        user_id = user_service.sign_up(
            identifier=login_data.identifier,
            password=login_data.password,
            name=login_data.name,
        )

    @router.post("/sign-in", status_code=201)
    async def sign_in(login_data: LogInData):
        user_id = user_service.sign_in(
            identifier=login_data.identifier,
            password=login_data.password,
        )
