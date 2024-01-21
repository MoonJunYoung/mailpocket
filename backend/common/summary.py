import json
import os

import openai
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("OPENAI_API_KEY")
organization = os.environ.get("OPENAI_ORGANIZATION")
openai.organization = organization
openai.api_key = api_key

MODEL = "gpt-3.5-turbo-1106"
PRE_USER_INPUT_MSG = """
뉴스를 보고 아래 조건에 맞춰서 답변을 하세요.
뉴스는 다음 채팅에 첨부하겠습니다 기달리세요.
조건:
1. 긴 뉴스가 어떠한 내용들을 전달하려고 하는지 한눈에 알 수 있도록 해야합니다. 
2. 주제를 선별하고 각 주제마다 내용을 한눈에 볼수있게 3줄 요약 해야합니다.
3. 단순히 요약을 하는것이 아닌 새로운 뉴스를 만들어합니다.
4. 답변은 아래 json에 포맷하여 제출 해야합니다.
5. 중복된 내용을 출력하지마세요.
json = [{"{제목}":"{내용}"},{"{제목}":"{내용}"},]
"""
PRE_ASSISTANT_OUTPUT_MSG = """
뉴스를 제공해주시면 해당 뉴스 기사를 기반으로 요약을 해드릴 수 있습니다. 뉴스를 첨부해주시면 각 주제에 대한 요약을 위한 정보를 얻을 수 있습니다. 뉴스를 첨부해주시면 즉시 도움을 드리겠습니다.
"""


def parsing_html_text(html):
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text()
    strip_text = text.strip()
    replace_text = strip_text.replace("\n", "")
    return replace_text


def mail_summary(html):
    html_text = parsing_html_text(html)
    response = openai.ChatCompletion.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": PRE_USER_INPUT_MSG},
            {"role": "assistant", "content": PRE_ASSISTANT_OUTPUT_MSG},
            {"role": "user", "content": html_text},
        ],
        temperature=0,
    )
    print(f"logging:\n{response}")
    content = response["choices"][0]["message"]["content"]
    content = content.split("```json")[1].split("```")[0]
    summary_list = json.loads(content)
    return summary_list
