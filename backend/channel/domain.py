import json

import requests

from backend.mail.domain import Mail
from backend.newsletter.domain import NewsLetter


class Channel:
    def __init__(
        self,
        id=None,
        webhook_url=None,
        slack_channel_id=None,
        team_name=None,
        team_icon=None,
        name=None,
        user_id=None,
    ) -> None:
        self.id = id
        self.webhook_url = webhook_url
        self.slack_channel_id = slack_channel_id
        self.team_name = team_name
        self.team_icon = team_icon
        self.name = name
        self.user_id = user_id

    def send_notification(self, mail: Mail, newsletter: NewsLetter):
        notification_text = self.__make_notification_text(mail, newsletter)
        data = {"blocks": notification_text}
        resp = requests.post(url=self.webhook_url, data=json.dumps(data))
        print("notification", resp.text)

    def __make_notification_text(self, mail: Mail, newsletter: NewsLetter):
        notification_text = [
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"{newsletter.name}: *<{mail.read_link}|{mail.subject}>*",
                    }
                ],
            },
        ]
        if mail.summary_list:
            summary_news_slack_notification_text_list = list()
            for summary in mail.summary_list:
                for subject, content in summary.items():
                    summary_news_slack_notification_text_list.append(
                        {
                            "type": "header",
                            "text": {"type": "plain_text", "text": f"{subject}"},
                        }
                    )
                    summary_news_slack_notification_text_list.append(
                        {
                            "type": "section",
                            "text": {"type": "plain_text", "text": f"{content}"},
                        }
                    )
            notification_text += summary_news_slack_notification_text_list
        return notification_text
