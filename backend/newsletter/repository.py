import datetime
import json

from backend.channel.domain import Channel
from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import (
    ChannelModel,
    NewsLetterModel,
    SubscribeModel,
    UserModel,
)
from backend.common.exceptions import UnknownFromEamilException
from backend.newsletter.domain import NewsLetter
from backend.user.domain import User


class NewsLetterRepository:
    class LoadNewsletters(MysqlCRUDTemplate):
        def execute(self):
            newsletters = list()
            newsletter_models = self.session.query(NewsLetterModel).all()
            for newsletter_model in newsletter_models:
                newsletter = NewsLetter(
                    id=newsletter_model.id,
                    name=newsletter_model.name,
                    from_email=newsletter_model.from_email,
                    category=newsletter_model.category,
                    send_date=newsletter_model.send_date,
                )
                newsletters.append(newsletter)
            return newsletters

    class LoadNewsLetterByID(MysqlCRUDTemplate):
        def __init__(self, id) -> None:
            self.id = id
            super().__init__()

        def execute(self):
            newsletter_model = (
                self.session.query(NewsLetterModel)
                .filter(NewsLetterModel.id == self.id)
                .first()
            )
            if not newsletter_model:
                return None
            newsletter = NewsLetter(
                id=newsletter_model.id,
                name=newsletter_model.name,
                from_email=newsletter_model.from_email,
                category=newsletter_model.category,
                send_date=newsletter_model.send_date,
            )
            return newsletter

    class LoadNewsLetterByFromEmail(MysqlCRUDTemplate):
        def __init__(self, from_email) -> None:
            self.from_email = from_email
            super().__init__()

        def execute(self):
            newsletter_model = (
                self.session.query(NewsLetterModel)
                .filter(NewsLetterModel.from_email == self.from_email)
                .first()
            )
            if not newsletter_model:
                raise UnknownFromEamilException(self.from_email)
            newsletter = NewsLetter(
                id=newsletter_model.id,
                name=newsletter_model.name,
                from_email=newsletter_model.from_email,
                category=newsletter_model.category,
                send_date=newsletter_model.send_date,
            )
            return newsletter

        def run(self) -> NewsLetter:
            return super().run()

    class LoadSubscribeNewsLettersByUser(MysqlCRUDTemplate):
        def __init__(self, user: User) -> None:
            self.user = user
            super().__init__()

        def execute(self):
            newsletter_list = list()
            subscribe_models = (
                self.session.query(SubscribeModel)
                .filter(SubscribeModel.user_id == self.user.id)
                .all()
            )
            if not subscribe_models:
                return None
            for subscribe_model in subscribe_models:
                newsletter_id = subscribe_model.newsletter_id
                newsletter_model = (
                    self.session.query(NewsLetterModel)
                    .filter(NewsLetterModel.id == newsletter_id)
                    .first()
                )
                newsletter = NewsLetter(
                    id=newsletter_model.id,
                    name=newsletter_model.name,
                    from_email=newsletter_model.from_email,
                    category=newsletter_model.category,
                    send_date=newsletter_model.send_date,
                )
                newsletter_list.append(newsletter)
            return newsletter_list

    class UpdateNewsletterLastRecvDateTime(MysqlCRUDTemplate):
        def __init__(self, newsletter: NewsLetter) -> None:
            self.newsletter = newsletter
            super().__init__()

        def execute(self):
            newsletter_model = (
                self.session.query(NewsLetterModel)
                .filter(NewsLetterModel.id == self.newsletter.id)
                .first()
            )
            newsletter_model.last_recv_at = datetime.datetime.now()
            self.session.commit()
