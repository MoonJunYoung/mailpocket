import json

from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import SubscribeModel
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

    def load_newsletters_by_keys(self, keys: list) -> list[NewsLetter]:
        result = list()
        for key in keys:
            platform = self.platforms.get(key)
            newsletter = NewsLetter(
                id=key,
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
                    id=None, newsletter=newsletter.id, user_id=self.user.id
                )
                self.session.add(subscribe_model)
            self.session.commit()
