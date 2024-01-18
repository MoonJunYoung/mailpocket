import json

import requests

from backend.mail.domain import Mail
from backend.newsletter.domain import NewsLetter


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

    def send_notification(self, mail: Mail, newsletter: NewsLetter):
        notification_text = self.__make_notification_text(mail, newsletter)
        data = {"blocks": notification_text}
        resp = requests.post(url=self.webhook_url, data=json.dumps(data))
        print(resp.text)

    def __make_notification_text(self, mail: Mail, newsletter: NewsLetter):
        notification_text = [
            {
                "type": "section",
                "fields": [
                    {"type": "mrkdwn", "text": f"*{newsletter.name}의 새로운 소식이 도착했어요.*"}
                ],
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
