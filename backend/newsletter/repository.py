import json

from backend.channel.domain import Channel
from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import ChannelModel, SubscribeModel, UserModel
from backend.newsletter.domain import NewsLetter
from backend.user.domain import User


class NewsLetterRepository:
    def __init__(self) -> None:
        with open("backend/newsletter/list.json", "r") as json_file:
            self.platforms = json.load(json_file)

    def load_all_newsletters(self) -> list[NewsLetter]:
        result = list()
        for id, platform in self.platforms.items():
            newsletter = NewsLetter(
                id=id,
                name=platform.get("name"),
                category=platform.get("category"),
            )
            result.append(newsletter)
        return result

    def load_newsletter_by_id(self, id) -> NewsLetter:
        platform = self.platforms.get(id)
        newsletter = NewsLetter(
            id=id,
            name=platform.get("name"),
            category=platform.get("category"),
        )
        return newsletter

    def load_newsletters_by_ids(self, ids: list) -> list[NewsLetter]:
        result = list()
        for id in ids:
            platform = self.platforms.get(id)
            newsletter = NewsLetter(
                id=id,
                name=platform.get("name"),
                category=platform.get("category"),
            )
            result.append(newsletter)
        return result

    class CreateUserNewslettersMapping(MysqlCRUDTemplate):
        def __init__(self, user: User, newsletters: list[NewsLetter]) -> None:
            self.user = user
            self.newsletters = newsletters
            super().__init__()

        def execute(self):
            for newsletter in self.newsletters:
                subscribe_model = SubscribeModel(
                    id=None, newsletter_id=newsletter.id, user_id=self.user.id
                )
                self.session.add(subscribe_model)
            self.session.commit()

    class loadUserChannelsByNewsletter(MysqlCRUDTemplate):
        def __init__(self, newsletter: NewsLetter) -> None:
            self.newsletter = newsletter
            super().__init__()

        def execute(self):
            channels = list()
            subscribe_models = (
                self.session.query(SubscribeModel)
                .filter(SubscribeModel.newsletter_id == self.newsletter.id)
                .all()
            )
            if not subscribe_models:
                return None
            for subscribe_model in subscribe_models:
                user_id = subscribe_model.user_id
                channel_models = (
                    self.session.query(ChannelModel)
                    .filter(ChannelModel.user_id == user_id)
                    .all()
                )
                for channel_model in channel_models:
                    channel = Channel(
                        id=channel_model.id,
                        webhook_url=channel_model.webhook_url,
                        name=channel_model.name,
                        team_name=channel_model.team_name,
                        team_icon=channel_model.team_icon,
                        user_id=channel_model.user_id,
                    )
                    channels.append(channel)
            return channels

        def run(self) -> list[Channel]:
            return super().run()
