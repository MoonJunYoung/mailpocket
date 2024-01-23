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
PROMPT = """
- 다음 뉴스 기사를 요약하세요.
- 여러 주제를 션별하고, 각 주제마다 내용은 3~4 문장으로 요약하세요.
- 무조건 한국어로 요약해야합니다.
- 요약한 내용으로 사람들에게 소식을 전달하는 말투를 사용하세요.
- 답변은 아래 json에 포맷하여 제출 해야합니다.
- 중복된 내용을 출력하지마세요.
json = {"{제목}":"{내용}","{제목}":"{내용}",... (반복)}
"""


def parsing_html_text(html):
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text()
    strip_text = text.strip()
    replace_text = strip_text.replace("\n", "")
    return replace_text


def mail_summary(from_email, subject, html):
    html_text = parsing_html_text(html)
    response = openai.ChatCompletion.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": PROMPT},
            {"role": "user", "content": f"뉴스:{html_text}"},
        ],
        temperature=0,
    )
    print(f"summary logging: {from_email} {subject}\n{response}")
    content = response["choices"][0]["message"]["content"]
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0]
    summary_list = json.loads(content)
    return summary_list
