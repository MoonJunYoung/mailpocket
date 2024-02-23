from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import SubscribeModel, UserModel
from backend.common.exceptions import AlreadySubscribedException
from backend.user.domain import User


class UserRepository:
    class Create(MysqlCRUDTemplate):
        def __init__(self, user: User) -> None:
            self.user = user
            super().__init__()

        def execute(self):
            user_model = UserModel(
                id=None,
                identifier=self.user.identifier,
                password=self.user.password,
                platform=self.user.platform,
                platform_id=self.user.platform_id,
            )
            self.session.add(user_model)
            self.session.commit()
            self.user.id = user_model.id

    class ReadByIdentifier(MysqlCRUDTemplate):
        def __init__(self, identifier) -> None:
            self.identifier = identifier
            super().__init__()

        def execute(self):
            user_model = (
                self.session.query(UserModel)
                .filter(UserModel.identifier == self.identifier)
                .first()
            )
            if not user_model:
                return None
            user = User(
                id=user_model.id,
                identifier=user_model.identifier,
                password=user_model.password,
            )
            return user

    class ReadByID(MysqlCRUDTemplate):
        def __init__(self, id) -> None:
            self.id = id
            super().__init__()

        def execute(self):
            user_model = (
                self.session.query(UserModel).filter(UserModel.id == self.id).first()
            )
            if not user_model:
                return None
            user = User(
                id=user_model.id,
                identifier=user_model.identifier,
                password=user_model.password,
                platform_id=user_model.platform_id,
                platform=user_model.platform,
            )
            return user

    class CreateUserNewsletterMapping(MysqlCRUDTemplate):
        def __init__(self, user: User, newsletter_id) -> None:
            self.user = user
            self.newsletter_id = newsletter_id
            super().__init__()

        def execute(self):
            if (
                self.session.query(SubscribeModel)
                .filter(SubscribeModel.user_id == self.user.id)
                .filter(SubscribeModel.newsletter_id == self.newsletter_id)
                .first()
            ):
                raise AlreadySubscribedException
            subscribe_model = SubscribeModel(
                id=None, newsletter_id=self.newsletter_id, user_id=self.user.id
            )
            self.session.add(subscribe_model)
            self.session.commit()

    class DeleteUserNewsletterMapping(MysqlCRUDTemplate):
        def __init__(self, user: User, newsletter_id) -> None:
            self.user = user
            self.newsletter_id = newsletter_id
            super().__init__()

        def execute(self):
            subscribe_model = (
                self.session.query(SubscribeModel)
                .filter(SubscribeModel.user_id == self.user.id)
                .filter(SubscribeModel.newsletter_id == self.newsletter_id)
            ).first()
            self.session.delete(subscribe_model)
            self.session.commit()

    class CreateUserNewslettersMapping(MysqlCRUDTemplate):
        def __init__(self, user: User, newsletter_ids: list[int]) -> None:
            self.user = user
            self.newsletter_ids = newsletter_ids
            super().__init__()

        def execute(self):
            for newsletter_id in self.newsletter_ids:
                subscribe_model = SubscribeModel(
                    id=None, newsletter_id=newsletter_id, user_id=self.user.id
                )
                self.session.add(subscribe_model)
            self.session.commit()

    class DeleteUserNewslettersMapping(MysqlCRUDTemplate):
        def __init__(self, user: User) -> None:
            self.user = user
            super().__init__()

        def execute(self):
            subscribe_models = (
                self.session.query(SubscribeModel)
                .filter(SubscribeModel.user_id == self.user.id)
                .all()
            )
            for subscribe_model in subscribe_models:
                self.session.delete(subscribe_model)
            self.session.commit()

    class ReadUserByPlatformID(MysqlCRUDTemplate):
        def __init__(self, platform_id, platform) -> None:
            self.platform_id = platform_id
            self.platform = platform
            super().__init__()

        def execute(self):
            user_model = (
                self.session.query(UserModel)
                .filter(UserModel.platform == self.platform)
                .filter(UserModel.platform_id == self.platform_id)
                .first()
            )
            if not user_model:
                return None
            user = User(
                id=user_model.id,
                platform_id=user_model.platform_id,
                platform=user_model.platform,
            )
            return user
