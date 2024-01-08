from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
from starlette.responses import FileResponse

app = FastAPI()


@app.exception_handler(404)
async def not_found(request: Request, exc: HTTPException):
    return FileResponse("frontend/build/index.html")


app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")
