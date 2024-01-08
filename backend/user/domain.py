import bcrypt

from backend.common.exceptions import (
    IdentifierAlreadyException,
    PasswordNotMatchException,
)
from backend.mail.domain import Mail


class User:
    def __init__(self, id, identifier=None, password=None, name=None) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password
        self.name = name

    def password_encryption(self):
        salt = bcrypt.gensalt()
        encrypted = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        self.password = encrypted.decode("utf-8")

    def check_password_match(self, password):
        if not bcrypt.checkpw(password.encode(), self.password.encode()):
            raise PasswordNotMatchException(
                identifier=self.identifier, password=password
            )

    def identifier_is_not_unique(self):
        raise IdentifierAlreadyException(self.identifier)
