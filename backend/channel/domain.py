import json

import requests

from backend.mail.domain import Mail


class Channel:
    def __init__(
        self, id=None, user_key=None, access_token=None, team_name=None, user_id=None
    ) -> None:
        self.id = id
        self.user_key = user_key
        self.access_token = access_token
        self.team_name = team_name
        self.user_id = user_id

    def send_notification(self, mail: Mail):
        notification_text = json.dumps(self.__make_notification_text(mail))
        data = {"channel": f"{self.user_key}", "blocks": f"{notification_text}"}
        headers = {"Authorization": f"Bearer {self.access_token}"}
        requests.post(
            url="https://slack.com/api/chat.postMessage", headers=headers, data=data
        )

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
                "fields": [{"type": "mrkdwn", "text": f"from: {mail.from_name}"}],
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
