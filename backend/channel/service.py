from backend.channel.domain import Channel
from backend.channel.repository import ChannelRepository
from backend.common.slack_api import SlackAPI
from backend.mail.domain import Mail
from backend.mail.repository import MailRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class ChannelDTO:
    def __init__(self, channel: Channel) -> None:
        self.id = channel.id
        self.team_name = channel.team_name
        self.team_icon = channel.team_icon
        self.name = channel.name


class ChannelService:
    def __init__(self) -> None:
        self.mail_repository = MailRepository()
        self.user_repository = UserRepository()
        self.channel_repository = ChannelRepository()
        self.slack_api = SlackAPI()

    def add_channel(self, code, user_id):
        channel = self.slack_api.connect_workspace(code, user_id)
        self.channel_repository.Create(channel).run()
        if channel.id:
            channel.welcome_message_sending()
            return channel.id

    def get_channels(self, user_id):
        channel_list = list()
        channels = self.channel_repository.ReadChannelsByUserID(user_id).run()
        for channel in channels:
            channel_list.append(ChannelDTO(channel))
        return channel_list

    def get_channel(self, user_id, channel_id):
        channel = self.channel_repository.ReadChannelByID(channel_id).run()
        return ChannelDTO(channel)

    def remove_channel(self, user_id, channel_id):
        channel = self.channel_repository.ReadChannelByID(channel_id).run()
        channel.is_user_of_channel(user_id)
        self.channel_repository.Delete(channel)
