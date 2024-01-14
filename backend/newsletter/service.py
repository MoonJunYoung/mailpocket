from backend.channel.domain import Channel
from backend.channel.repository import ChannelRepository
from backend.newsletter.domain import NewsLetter
from backend.newsletter.repository import NewsLetterRepository
from backend.user.domain import User
from backend.user.repository import UserRepository


class NewsLetterService:
    def __init__(self) -> None:
        self.newsletter_repository = NewsLetterRepository()

    def get_all_newsletters(self):
        newsletter = self.newsletter_repository.load_all_newsletters()
        return newsletter

    def subscribe(self, user_id, newsletter_keys):
        pass
