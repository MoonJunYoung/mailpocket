from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import UserModel
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
                name=self.user.name,
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
                name=user_model.name,
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
                name=user_model.name,
            )
            return user
