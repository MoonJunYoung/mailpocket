from backend.channel.repository import ChannelRepository
from backend.common.slack_api import SlackAPI
from backend.mail.repository import MailRepository
from backend.newsletter.repository import NewsLetterRepository
from backend.user.repository import UserRepository


class MailService:
    def __init__(self) -> None:
        self.mail_repository = MailRepository()
        self.user_repository = UserRepository()
        self.channel_repository = ChannelRepository()
        self.newsletter_repository = NewsLetterRepository()
        self.slack_api = SlackAPI()

    def recv(self, s3_object_key):
        mail = self.mail_repository.read_by_s3_object_key(s3_object_key)
        mail.parser_eamil()
        self.slack_api.loging(mail)
        newsletter = self.newsletter_repository.LoadNewsLetterByFromEmail(
            mail.from_email
        ).run()
        channels = self.channel_repository.ReadChannelsByNewsletter(newsletter).run()
        notified_slack_channel_id_list = list()
        if channels:
            try:
                mail.summary()
            except:
                mail.fail_summary()
            for channel in channels:
                if channel.slack_channel_id in notified_slack_channel_id_list:
                    continue
                channel.send_notification(mail, newsletter)
                notified_slack_channel_id_list.append(channel.slack_channel_id)

    def read(self, s3_object_key):
        mail = self.mail_repository.read_by_s3_object_key(s3_object_key)
        mail.parser_eamil()
        return mail
