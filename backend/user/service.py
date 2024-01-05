from backend.user.domain import User
from backend.user.repository import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()

    def sign_up(self, identifier, password, name):
        user = User(
            id=None,
            name=name,
            identifier=identifier,
            password=password,
        )
        if self.user_repository.ReadByIdentifier(identifier=user.identifier).run():
            user.identifier_is_not_unique()
        user.password_encryption()
        self.user_repository.Create(user).run()
        return user.id

    def sign_in(self, identifier, password):
        user: User = self.user_repository.ReadByIdentifier(identifier).run()
        if not user:
            # 사용자 검색 실패 로직 추가해야함
            pass
        user.check_password_match(password)
        return user.id

    def read(self, user_id):
        user: User = self.user_repository.ReadByID(user_id).run()
        del user.password
        return user
