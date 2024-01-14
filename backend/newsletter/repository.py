import json

from backend.common.database.connector import MysqlCRUDTemplate
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

    def load_newsletters_by_keys(self, keys: list):
        result = list()
        for key, platform in self.platforms.items():
            pass

    class CreateUserNewslettersMapping(MysqlCRUDTemplate):
        def __init__(self, user: User, newsletters: list[NewsLetter]) -> None:
            self.user = user
            self.newsletters = newsletters
            super().__init__()

        def execute(self):
            for newsletter in self.newsletters:
                