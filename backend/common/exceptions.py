import logging
import traceback

from fastapi import HTTPException, Request

logging.basicConfig(filename="./backend_error.log", level=logging.ERROR)
logging.error(traceback.format_exc())


def catch_exception(exce, requests: Request = None):
    if issubclass(exce.__class__, CustomException):
        logging.error(f"\n===\nA custom error occurred. : {exce}\n===")
        raise HTTPException(status_code=exce.status_code, detail=exce.detail)
    logging.error(
        f"\n===\nAn unexpected error occurred. : {exce}\ndetail : {traceback.format_exc()}==="
    )
    raise HTTPException(
        status_code=500,
        detail="An internal server error occurred. If the problem persists, please contact our support team.",
    )


class CustomException(Exception):
    status_code = ""
    detail = ""


class IdentifierAlreadyException(CustomException):
    def __init__(self, identifier) -> None:
        super().__init__(f"sign-up {identifier} this idnetifier is already")

    status_code = 409
    detail = "this idnetifier is already."


class TokenIsMissingException(CustomException):
    def __init__(self) -> None:
        super().__init__(f"authorization token is missing.")

    status_code = 401
    detail = "authorization token is missing."


class InvalidTokenException(CustomException):
    def __init__(self) -> None:
        super().__init__(f"invalid authorization token.")

    status_code = 401
    detail = "invalid authorization token."


class PasswordNotMatchException(CustomException):
    def __init__(self, identifier, password) -> None:
        super().__init__(
            f"sign-in password({password}) is not match to identifier({identifier})."
        )

    status_code = 401
    detail = "incorrect identifier or password."


class IdentifierNotFoundException(CustomException):
    def __init__(self, identifier) -> None:
        super().__init__(f"sign-in identifier({identifier}) is not found.")

    status_code = 401
    detail = "incorrect identifier or password."
