from fastapi import APIRouter, Header, Request
from pydantic import BaseModel

from backend.common.exceptions import catch_exception
from backend.common.oauth import Oauth
from backend.common.token import Token
from backend.user.service import UserService

user_service = UserService()


class LogInData(BaseModel):
    identifier: str
    password: str


class OauthData(BaseModel):
    token: str


class UserPresentation:
    router = APIRouter(prefix="/api/user")

    @router.get("", status_code=200)
    async def read(request: Request, Authorization: str = Header(None)):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            return user_service.read(user_id)

        except Exception as e:
            catch_exception(e, request)

    @router.post("/sign-up", status_code=201)
    async def sign_up(request: Request, login_data: LogInData):
        try:
            user_id = user_service.sign_up(
                identifier=login_data.identifier,
                password=login_data.password,
            )
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e, request)

    @router.post("/sign-in", status_code=201)
    async def sign_in(request: Request, login_data: LogInData):
        try:
            user_id = user_service.sign_in(
                identifier=login_data.identifier,
                password=login_data.password,
            )
            return Token.create_token_by_user_id(user_id)
        except Exception as e:
            catch_exception(e, request)

    @router.post("/google-login", status_code=201)
    async def google_login(oauth: OauthData):
        try:
            platform = "google"
            name, platform_id = Oauth.get_user_platform_id_by_google_oauth(oauth.token)
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/kakao-login", status_code=201)
    async def kakao_login(oauth: OauthData):
        try:
            platform = "kakao"
            name, platform_id = Oauth.get_user_platform_id_by_kakao_oauth(oauth.token)
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)

    @router.post("/naver-login", status_code=201)
    async def naver_login(oauth: OauthData):
        try:
            platform = "naver"
            name, platform_id = Oauth.get_user_platform_id_by_naver_oauth(oauth.token)
            user_id = user_service.oauth_login(name, platform_id, platform)
            return Token.create_token_by_user_id(user_id)

        except Exception as e:
            catch_exception(e)
