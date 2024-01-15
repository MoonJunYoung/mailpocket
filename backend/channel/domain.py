import json

import requests

from backend.mail.domain import Mail


class Channel:
    def __init__(
        self,
        id=None,
        webhook_url=None,
        team_name=None,
        team_icon=None,
        name=None,
        user_id=None,
    ) -> None:
        self.id = id
        self.webhook_url = webhook_url
        self.team_name = team_name
        self.team_icon = team_icon
        self.name = name
        self.user_id = user_id

    def send_notification(self, mail: Mail):
        notification_text = json.dumps(self.__make_notification_text(mail))
        data = {"text": f"{notification_text}"}
        requests.post(url=self.webhook_url, data=data)

    def __make_notification_text(self, mail: Mail):
        notification_text = [
            {
                "type": "section",
                "fields": [{"type": "mrkdwn", "text": "*새로운 메일이 도착했어요.*"}],
            },
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f"{mail.subject}",
                    "emoji": True,
                },
            },
            {
                "type": "section",
                "fields": [{"type": "mrkdwn", "text": f"*from: {mail.from_name}*"}],
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "메일 보러가기",
                        },
                        "value": "click_me",
                        "url": f"{mail.read_link}",
                        "action_id": "button-action",
                    }
                ],
            },
        ]

        return notification_text
