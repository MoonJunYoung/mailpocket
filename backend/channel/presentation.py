from fastapi import APIRouter, Header, Request
from pydantic import BaseModel

from backend.channel.service import ChannelService
from backend.common.exceptions import catch_exception
from backend.common.token import Token

channel_service = ChannelService()


class SlackOauthData(BaseModel):
    code: str


class ChannelPresentation:
    router = APIRouter(prefix="/api/channel")

    @router.get("", status_code=200)
    async def read_channels(request: Request, Authorization=Header(None)):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            channels = channel_service.read(user_id)
            return channels

        except Exception as e:
            catch_exception(e, request)

    @router.post("", status_code=201)
    async def add_channel(
        request: Request, slack_oauth_data: SlackOauthData, Authorization=Header(None)
    ):
        try:
            user_id = Token.get_user_id_by_token(Authorization)
            channel_service.add(slack_oauth_data.code, user_id)

        except Exception as e:
            catch_exception(e, request)
