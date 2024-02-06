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

    @router.get("/subscribeable", status_code=200)
    async def get_subscribeable_newsletters(
        request: Request, Authorization=Header(None)
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletters = newsletter_service.get_subscribeable_newsletters(user_id)
            return newsletters
        except Exception as e:
            catch_exception(e, request)

    @router.get("/subscribed", status_code=200)
    async def get_subscribed_newsletters(request: Request, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletters = newsletter_service.get_subscribed_newsletters(user_id)
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
