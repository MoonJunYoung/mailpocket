from backend.channel.repository import ChannelRepository
from backend.common.slack_api import SlackAPI
from backend.mail.domain import Mail
from backend.mail.repository import MailRepository
from backend.newsletter.repository import NewsLetterRepository
from backend.user.repository import UserRepository


class MailDTO:
    def __init__(self, mail: Mail) -> None:
        pass


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
        mail.set_newsletter_id(newsletter.id)
        mail.summary()
        self.mail_repository.CreateMail(mail).run()
        self.newsletter_repository.UpdateNewsletterLastRecvDateTime(newsletter).run()

        channels = self.channel_repository.ReadChannelsByNewsletter(newsletter).run()
        notified_slack_channel_id_list = list()
        if channels:
            for channel in channels:
                if channel.slack_channel_id in notified_slack_channel_id_list:
                    continue
                self.slack_api.sending_mail_recv_notification(
                    channel=channel, mail=mail, newsletter=newsletter
                )
                notified_slack_channel_id_list.append(channel.slack_channel_id)

    def read(self, s3_object_key):
        mail = self.mail_repository.read_by_s3_object_key(s3_object_key)
        self.mail_repository.ReadMail(mail).run()
        mail.parser_eamil()
        return mail

    def get_last_mail_of_newsletter_by_newsletter_id(self, user_id, newsletter_id):
        user = self.user_repository.ReadByID(user_id).run()
        mail = self.mail_repository.ReadLastMailOfNewsltterByNewsletterID(
            newsletter_id
        ).run()
        self.mail_repository.load_by_s3_object_key(mail)
        mail.parser_eamil()
        return mail
