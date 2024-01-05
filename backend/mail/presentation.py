from fastapi import APIRouter
from pydantic import BaseModel

from backend.mail.service import MailService

mail_service = MailService()


class S3MailRecvData(BaseModel):
    s3_object_key: str
    mail_content: str


class MailPresentation:
    router = APIRouter(prefix="/api/mail")

    @router.post("/recv", status_code=200)
    async def recv_mail(s3_email_recv_data: S3MailRecvData):
        mail_service.recv(
            mail_content=s3_email_recv_data.mail_content,
            s3_object_key=s3_email_recv_data.s3_object_key,
        )
