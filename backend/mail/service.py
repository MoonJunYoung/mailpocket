from backend.channel.domain import Channel
from backend.channel.repository import ChannelRepository
from backend.mail.domain import Mail
from backend.mail.repository import MailRepository
from backend.newsletter.repository import NewsLetterRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class MailService:
    def __init__(self) -> None:
        self.mail_repository = MailRepository()
        self.user_repository = UserRepository()
        self.channel_repository = ChannelRepository()
        self.newsletter_repository = NewsLetterRepository()

    def recv(self, s3_object_key):
        mail = self.mail_repository.read_by_s3_object_key(s3_object_key)
        mail.parser_eamil()
        newsletter = self.newsletter_repository.load_newsletter_by_id(mail.from_name)
        channels = self.channel_repository.loadChannelsByNewsletter(newsletter).run()
        notified_slack_channel_id_list = list()
        if channels:
            pass
        for channel in channels:
            if channel.slack_channel_id in notified_slack_channel_id_list:
                continue
            channel.send_notification(mail, newsletter)
            notified_slack_channel_id_list.append(channel.slack_channel_id)

    def read(self, s3_object_key):
        mail = self.mail_repository.read_by_s3_object_key(s3_object_key)
        mail.parser_eamil()
        return mail.html_body
