from backend.channel.domain import Channel
from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import ChannelModel


class ChannelRepository:
    class ReadByUserID(MysqlCRUDTemplate):
        def __init__(self, user_id) -> None:
            self.user_id = user_id
            super().__init__()

        def execute(self):
            channels = list()
            channel_models = (
                self.session.query(ChannelModel)
                .filter(ChannelModel.user_id == self.user_id)
                .all()
            )
            if not channel_models:
                return channels
            for channel_model in channel_models:
                channel = Channel(
                    id=channel_model.id,
                    webhook_url=channel_model.webhook_url,
                    slack_channel_id=channel_model.slack_channel_id,
                    name=channel_model.name,
                    team_name=channel_model.team_name,
                    team_icon=channel_model.team_icon,
                    user_id=channel_model.user_id,
                )
                channels.append(channel)
            return channels

    class Create(MysqlCRUDTemplate):
        def __init__(self, channel: Channel) -> None:
            self.channel = channel
            super().__init__()

        def execute(self):
            channel_model = ChannelModel(
                id=None,
                webhook_url=self.channel.webhook_url,
                slack_channel_id=self.channel.slack_channel_id,
                name=self.channel.name,
                team_name=self.channel.team_name,
                team_icon=self.channel.team_icon,
                user_id=self.channel.user_id,
            )
            self.session.add(channel_model)
            self.session.commit()
            self.channel.id = channel_model.id
