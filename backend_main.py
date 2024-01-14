from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from backend.channel.presentation import ChannelPresentation
from backend.mail.presentation import MailPresentation
from backend.newsletter.presentition import NewsLetterPresentation
from backend.user.presentation import UserPresentation

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/haelth-check", status_code=200)
def haelth_check():
    return "haelth_check"


app.include_router(MailPresentation.router)
app.include_router(UserPresentation.router)
app.include_router(ChannelPresentation.router)
app.include_router(NewsLetterPresentation.router)
