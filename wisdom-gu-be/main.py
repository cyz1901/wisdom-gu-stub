from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    # 在这里运行您的代买代码
    print("Running setup code...")
    # 这里可以执行您需要的任何自定义操作
    

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
