from langchain.llms import OpenAI
import os

os.environ["OPENAI_API_KEY"] = ""


def chat():
    llm = OpenAI()
    # 使用prompt
    prompt = 'hello,what is your name'
    print(llm(prompt))


# main function
if __name__ == '__main__':
    chat()

# def main():
#     print("hello world")
#     # llm = OpenAI(temerature=0.9)
#     # # 使用prompt
#     # prompt = 'hello,what is your name'
#     # print("aaaa")
#     # print(llm(prompt))