from enum import Enum

from fastapi import APIRouter, Header, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from backend.common.exceptions import catch_exception
from backend.common.token import Token
from backend.mail.service import MailService
from backend.newsletter.service import NewsLetterService

newsletter_service = NewsLetterService()
mail_service = MailService()


class SubscribeData(BaseModel):
    ids: list[int]


class SubscribeStatus(str, Enum):
    subscribed = "subscribed"
    subscribable = "subscribable"


class SortType(str, Enum):
    ranking = "ranking"
    recent = "recent"


class Category(str, Enum):
    IT_Tech = "IT/테크"
    Health_Medical = "건강/의학"
    Design = "디자인"
    Business_Finance = "비즈/제테크"
    CurrentAffairs_Society = "시사/사회"
    Entertainment = "엔터테이먼트"
    Travel = "여행"
    Hobby_SelfImprovement = "취미/자기계발"
    Trend_Lifestyle = "트렌드/라이프"
    Food = "푸드"


class NewsLetterPresentation:
    router = APIRouter(prefix="/newsletter")

    @router.get("", status_code=200)
    async def get_newsletters(
        request: Request,
        subscribe_status: SubscribeStatus,
        sort_type: SortType,
        in_mail: bool = False,
        cursor: int = None,
        category: Category = None,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletters = newsletter_service.get_newsletters(
                user_id, subscribe_status, sort_type, in_mail, cursor, category
            )
            return newsletters
        except Exception as e:
            catch_exception(e, request)

    @router.put("/subscribe", status_code=201)
    async def newsletters_subscribe(
        request: Request,
        subscribe_data: SubscribeData,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletter_service.newsletters_subscribe(user_id, subscribe_data.ids)

        except Exception as e:
            catch_exception(e, request)

    @router.post("/{newsletter_id}/subscribe", status_code=201)
    async def newsletter_subscribe(
        request: Request,
        newsletter_id: int,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletter_service.newsletter_subscribe(user_id, newsletter_id)

        except Exception as e:
            catch_exception(e, request)

    @router.delete("/{newsletter_id}/subscribe", status_code=204)
    async def newsletter_subscribe_cancel(
        request: Request,
        newsletter_id: int,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsletter_service.newsletter_subscribe_cancel(user_id, newsletter_id)

        except Exception as e:
            catch_exception(e, request)

    @router.get("/{newsletter_id}/mail", status_code=200)
    async def get_newsletter_with_previous_mail_list(
        request: Request,
        newsletter_id: int,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            newsltter = newsletter_service.get_newsletter_with_previous_mail_list_by_newsletter_id(
                user_id, newsletter_id
            )
            return newsltter
        except Exception as e:
            catch_exception(e, request)

    @router.get("/{newsletter_id}/last-mail", status_code=200)
    async def get_newsletter_with_last_mail(
        request: Request,
        newsletter_id: int,
        Authorization=Header(None),
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            mail = mail_service.get_last_mail_of_newsletter_by_newsletter_id(
                user_id, newsletter_id
            )
            return mail
        except Exception as e:
            catch_exception(e, request)
