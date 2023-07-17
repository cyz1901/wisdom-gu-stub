from langflow import load_flow_from_json

flow = load_flow_from_json("wisdom_gu_plugins\wisdom_gu_llma_plugin\service\resources\llmaChat.json")
# Now you can use it like any chain
flow("Hey, have you heard of Langflow?")