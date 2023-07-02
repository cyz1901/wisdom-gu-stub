import os
from typing import Union
import zipfile

from fastapi import FastAPI
import requests

from wisdom_gu_be.privateGPT_main.privateGPT import *

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    # 在这里运行您的代买代码
    print("Running setup code...")
    initPrivateGpt()
    
    

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}



def initPrivateGpt():
    # GitHub 存储库的 URL
    repo_url = "https://codeload.github.com/imartinez/privateGPT/zip/refs/heads/main"

    # 发送 GET 请求并下载 ZIP 存档
    response = requests.get(repo_url)
    archive_data = response.content

    # 保存 ZIP 存档到本地文件
    with open("privateGPT-main.zip", "wb") as f:
        f.write(archive_data)

    # 解压缩 ZIP 存档
    with zipfile.ZipFile("privateGPT-main.zip", "r") as zip_ref:
        zip_ref.extractall()

    # 重命名文件夹
    os.rename("privateGPT-main", "privateGPT_main")

    # 删除文件
    os.remove("privateGPT-main.zip")

    # 拼接文件路径
    file_path = os.path.join("privateGPT_main", "__init__.py")

    # 创建空的__init__.py文件
    with open(file_path, "w"):
        pass



def startPrviateGPT():
    # Parse the command line arguments
    args = parse_arguments()
    embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
    db = Chroma(persist_directory=persist_directory, embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    retriever = db.as_retriever(search_kwargs={"k": target_source_chunks})
    # activate/deactivate the streaming StdOut callback for LLMs
    callbacks = [] if args.mute_stream else [StreamingStdOutCallbackHandler()]
    # Prepare the LLM
    match model_type:
        case "LlamaCpp":
            llm = LlamaCpp(model_path=model_path, n_ctx=model_n_ctx, n_batch=model_n_batch, callbacks=callbacks, verbose=False)
        case "GPT4All":
            llm = GPT4All(model=model_path, n_ctx=model_n_ctx, backend='gptj', n_batch=model_n_batch, callbacks=callbacks, verbose=False)
        case _default:
            # raise exception if model_type is not supported
            raise Exception(f"Model type {model_type} is not supported. Please choose one of the following: LlamaCpp, GPT4All")
        
    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents= not args.hide_source)
    # Interactive questions and answers
    while True:
        query = input("\nEnter a query: ")
        if query == "exit":
            break
        if query.strip() == "":
            continue

        # Get the answer from the chain
        start = time.time()
        res = qa(query)
        answer, docs = res['result'], [] if args.hide_source else res['source_documents']
        end = time.time()

        # Print the result
        print("\n\n> Question:")
        print(query)
        print(f"\n> Answer (took {round(end - start, 2)} s.):")
        print(answer)

        # Print the relevant sources used for the answer
        for document in docs:
            print("\n> " + document.metadata["source"] + ":")
            print(document.page_content)