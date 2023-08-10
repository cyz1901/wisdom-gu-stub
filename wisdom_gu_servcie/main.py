from typing import Union

from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from langchain import ConversationChain
from langchain.chat_models import ChatOpenAI

from core import loadLLM
from lanarky import LangchainRouter
from lanarky.testing import mount_gradio_app



def create_chain():
    return ConversationChain(
        llm=loadLLM(),
        verbose=True,
    )


app = mount_gradio_app(FastAPI(title="ConversationChainDemo"))
chain = create_chain()


@app.get("/")
async def get(request: Request):
    return {"hello", "world"}


langchain_router = LangchainRouter(
    langchain_url="/chat", langchain_object=chain, streaming_mode=1
)
langchain_router.add_langchain_api_route(
    "/chat_json", langchain_object=chain, streaming_mode=2
)
langchain_router.add_langchain_api_websocket_route("/ws", langchain_object=chain)

app.include_router(langchain_router)