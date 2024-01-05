import bcrypt

from backend.mail.domain import Mail


class User:
    def __init__(self, id, identifier=None, password=None) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password

    def password_encryption(self):
        salt = bcrypt.gensalt()
        encrypted = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        self.password = encrypted.decode("utf-8")

    def check_password_match(self, password):
        if not bcrypt.checkpw(password.encode(), self.password.encode()):
            # 비밀번호 불일치 로직 추가해야함
            pass

    def identifier_is_not_unique(self):
        # 아이디 중복 로직 추가해야함
        pass
