from backend.channel.domain import Channel
from backend.channel.repository import ChannelRepository
from backend.common.slack_api import SlackAPI
from backend.mail.domain import Mail
from backend.mail.repository import MailRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class ChannelDTO:
    def __init__(self, channel: Channel) -> None:
        self.team_name = channel.team_name


class ChannelService:
    def __init__(self) -> None:
        self.mail_repository = MailRepository()
        self.user_repository = UserRepository()
        self.channel_repository = ChannelRepository()
        self.slack_api = SlackAPI()

    def add(self, code, user_id):
        channel = self.slack_api.install(code, user_id)
        user: User = self.user_repository.ReadByID(user_id).run()
        if not user:
            # 메일 수신자 정보가 조회되지않을때 처리로직 추가해야함
            pass
        channels: list[Channel] = self.channel_repository.ReadByUserID(user.id).run()
        for channel in channels:
            channel.send_notification(mail)

    def read(self, user_id):
        channel_list = list()
        channels = self.channel_repository.ReadByUserID(user_id).run()
        for channel in channels:
            channel_list.append(ChannelDTO(channel))
        return channel_list
