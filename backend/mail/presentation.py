from fastapi import APIRouter, Request
from pydantic import BaseModel

from backend.common.exceptions import catch_exception
from backend.mail.service import MailService

mail_service = MailService()


class S3MailRecvData(BaseModel):
    s3_object_key: str


class MailPresentation:
    router = APIRouter(prefix="/api/mail")

    @router.post("/recv", status_code=200)
    async def recv_mail(request: Request, s3_email_recv_data: S3MailRecvData):
        try:
            mail_service.recv(
                s3_object_key=s3_email_recv_data.s3_object_key,
            )
        except Exception as e:
            catch_exception(e, request)
