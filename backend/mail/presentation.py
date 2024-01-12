from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
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

    @router.get("", status_code=200)
    async def read_mail(request: Request, mail: str):
        try:
            mail_html = mail_service.read(
                s3_object_key=mail,
            )
            return HTMLResponse(content=mail_html)
        except Exception as e:
            catch_exception(e, request)
