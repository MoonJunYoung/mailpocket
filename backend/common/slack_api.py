import os

import requests
from dotenv import load_dotenv

from backend.channel.domain import Channel

load_dotenv()
client_id = os.environ.get("SLACK_CLIENT_ID")
client_secret = os.environ.get("SLACK_CLIENT_SECRET")


class SlackAPI:
    def install(self, code, user_id):
        url = "https://slack.com/api/oauth.v2.access"
        data = {"client_id": client_id, "client_secret": client_secret, "code": code}
        response = requests.post(url, data=data).json()
        access_token = response.get("access_token")
        user_key = response.get("authed_user").get("id")
        team_name = response.get("team").get("name")
        channel = Channel(
            id=None,
            user_key=user_key,
            access_token=access_token,
            team_name=team_name,
            user_id=user_id,
        )
        return channel
