from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from backend.channel.presentation import ChannelPresentation
from backend.mail.presentation import MailPresentation
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


@app.get("/api/haelth_check", status_code=200)
def haelth_check():
    return "haelth_check"


@app.middleware("http")
async def log_requests(request: Request, call_next):
    x_forwarded_for = request.headers.get("x-forwarded-for")
    if x_forwarded_for:
        client_ip = x_forwarded_for.split(",")[0]
    else:
        client_ip = request.client.host
    request_path = request.url.path
    response = await call_next(request)
    # 로그에 클라이언트 IP와 요청 경로를 기록
    print(f"Request from {client_ip} to {request_path}")
    return response


app.include_router(MailPresentation.router)
app.include_router(UserPresentation.router)
app.include_router(ChannelPresentation.router)
