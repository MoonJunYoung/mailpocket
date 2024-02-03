from fastapi import APIRouter, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from backend.channel.presentation import ChannelPresentation
from backend.mail.presentation import MailPresentation
from backend.newsletter.presentition import NewsLetterPresentation
from backend.user.presentation import UserPresentation

app = FastAPI()
main_router = APIRouter(prefix="/testapi")
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@main_router.get("/haelth-check", status_code=200)
def haelth_check():
    return "haelth_check"


main_router.include_router(MailPresentation.router)
main_router.include_router(UserPresentation.router)
main_router.include_router(ChannelPresentation.router)
main_router.include_router(NewsLetterPresentation.router)
app.include_router(main_router)
