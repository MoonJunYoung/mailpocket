from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.mail.presentation import MailPresentation

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", status_code=200)
def haelth_check():
    return "haelth_check"


app.include_router(MailPresentation.router)
