import json
import os

import requests
from dotenv import load_dotenv

from backend.channel.domain import Channel
from backend.mail.domain import Mail
from backend.newsletter.domain import NewsLetter

load_dotenv()
client_id = os.environ.get("SLACK_CLIENT_ID")
client_secret = os.environ.get("SLACK_CLIENT_SECRET")


class SlackAPI:
    def connect_workspace(self, code, user_id):
        url = "https://slack.com/api/oauth.v2.access"
        data = {"client_id": client_id, "client_secret": client_secret, "code": code}
        response_json = requests.post(url, data=data).json()
        access_token = response_json.get("access_token")
        webhook_url = response_json.get("incoming_webhook").get("url").replace("\\", "")
        slack_channel_id = response_json.get("incoming_webhook").get("channel_id")
        name = response_json.get("incoming_webhook").get("channel")
        team_name = response_json.get("team").get("name")
        team_icon = self._get_team_icon(access_token)
        channel = Channel(
            id=None,
            webhook_url=webhook_url,
            slack_channel_id=slack_channel_id,
            team_name=team_name,
            team_icon=team_icon,
            name=name,
            user_id=user_id,
        )
        return channel

    def _get_team_icon(self, access_token):
        url = "https://slack.com/api/team.info"
        response = requests.get(
            url, headers={"Authorization": f"Bearer {access_token}"}
        )
        team_icon = (
            response.json().get("team").get("icon").get("image_230").replace("\\", "")
        )
        return team_icon

    def loging(
        self,
        mail: Mail,
    ):
        notification_text = self.__make_log_notification_text(mail)
        data = {"blocks": notification_text}
        resp = requests.post(
            url="https://hooks.slack.com/services/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",
            data=json.dumps(data),
        )

        print("def:logging", resp.text)

    def __make_log_notification_text(self, mail: Mail):
        notification_text = [
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"email : {mail.from_email}\nid : {mail.from_name}\n*<{mail.read_link}|{mail.subject}>*",
                    }
                ],
            },
        ]
        if mail.slack_notification_text_list:
            notification_text += mail.slack_notification_text_list

        return notification_text
