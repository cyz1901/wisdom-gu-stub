from typing import Union

from fastapi import FastAPI
from contextlib import asynccontextmanager

from core import loadLLM, sendMessage


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    loadLLM()
    yield
    # Clean up the ML models and release the resources
    print("EXITING")


app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.patch("/chat")
def chat():
    sendMessage()
    return {"answer": "answer"}