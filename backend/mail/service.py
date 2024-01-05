from backend.channel.domain import Channel
from backend.channel.repository import ChannelRepository
from backend.mail.domain import Mail
from backend.mail.repository import MailRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class MailService:
    def __init__(self) -> None:
        self.mail_repository = MailRepository()
        self.user_repository = UserRepository()
        self.channel_repository = ChannelRepository()

    def recv(self, mail_content, s3_object_key):
        mail = Mail(mail_content, s3_object_key)
        mail.parser_eamil()
        user: User = self.user_repository.ReadByIdentifier(mail.to_name).run()
        if not user:
            # 메일 수신자 정보가 조회되지않을때 처리로직 추가해야함
            pass
        channels: list[Channel] = self.channel_repository.ReadByUserID(user.id).run()
        for channel in channels:
            channel.send_notification(mail)
