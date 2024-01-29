import json

import requests

from backend.common.exceptions import ChannelUserMismatchException
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

    def is_user_of_channel(self, user_id):
        if not self.user_id == user_id:
            raise ChannelUserMismatchException(self.id, user_id)

    def welcome_message_sending(self):
        welcome_message = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "이제부터 이 채널에 뉴스레터를 요약해서 보내드릴게요.\n메일 포켓을 사용하면 이런 게 좋아요.\n\n*1) 매일 쏟아지는 뉴스레터를 3줄 요약해서 슬랙에 보내드려요.*\n눈으로만 훑어보세요. 재미 있는 뉴스라면 조금 더 자세히 보고, 슬랙의 save item 을 사용하면 나중에 읽을 수도 있어요.\n*2) 메일함에 일회성 메일이 쌓이는걸 방지할 수 있어요.*\n뉴스레터 때문에 메일함이 항상 999+ 개 이상 쌓여 있고, 중요 메일 놓쳐본 적 많으시죠? 뉴스레터는 메일 포켓이 받고, 슬랙으로 요약해서 슝- 보내 드릴게요.",
                },
            }
        ]

        data = {"blocks": welcome_message}
        requests.post(url=self.webhook_url, data=json.dumps(data))

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
                        "text": f"{newsletter.name}의 새로운 소식이 도착했어요.\n*<{mail.read_link}|{mail.subject}>*",
                    }
                ],
            },
        ]
        if mail.summary_list:
            summary_news_slack_notification_text_list = list()
            for subject, content in mail.summary_list.items():
                summary_news_slack_notification_text_list.append(
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": f"*{subject}*\n{content}",
                        },
                    }
                )
            notification_text += summary_news_slack_notification_text_list
        return notification_text
