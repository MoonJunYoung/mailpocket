from fastapi import APIRouter, Header, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from backend.common.exceptions import catch_exception
from backend.common.token import Token
from backend.newsletter.service import NewsLetterService

newsletter_service = NewsLetterService()


class SubscribeData(BaseModel):
    ids: list[int]


class NewsLetterPresentation:
    router = APIRouter(prefix="/newsletter")

    @router.get("", status_code=200)
    async def get_newsletters(request: Request):
        try:
            newsletters = newsletter_service.get_all_newsletters()
            return newsletters
        except Exception as e:
            catch_exception(e, request)

    @router.patch("/subscribe", status_code=201)
    async def subscribe(
        request: Request, subscribe_data: SubscribeData, Authorization=Header(None)
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletter_service.subscribe(user_id, subscribe_data.ids)

        except Exception as e:
            catch_exception(e, request)

    @router.get("/subscribed", status_code=200)
    async def get_subscribe_newsletters(request: Request, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            subscribe_newsletters = newsletter_service.get_subscribe_newsletters(
                user_id
            )
            return subscribe_newsletters
        except Exception as e:
            catch_exception(e, request)
