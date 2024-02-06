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

MODEL = "gpt-3.5-turbo-0125"
PROMPT = """
- 당신은 긴 뉴스 기사를 요약하여 사람들에게 전달하는 기자이자 아나운서의 역할을 맡고 있습니다. 제시되는 뉴스 기사들의 핵심 내용을 요약하여 주세요. 각 기사의 요약은 주요 사건, 그 사건의 영향 및 결과, 그리고 그 사건의 장기적 중요성을 포함해야 합니다.
- 요약은 각 기사별로 3 ~ 4문장으로 구성되어야 하며, 서론, 본론, 결론의 구조로 명확히 구분되어야 합니다. 각 내용은 기사의 주제를 분명하게 전달해야하며, 주제에 맞는 내용만 다루어야합니다.
- 요약 내용은 다양한 주제를 포괄하며, 각 주제에 대해 균형 잡히고 포괄적인 정보를 제공해야 합니다.
- 최종 결과는 아래의 JSON 형식으로 정리하여 제출하세요.
json = {"{제목}":"{내용}","{제목}":"{내용}",...(반복)}

- 현재형을 사용하고, 직접적인 말투보다는 설명적이고 객관적인 표현을 사용합니다.
- '논란이 있다'과 같은 표현을 '논란이 있습니다'로 변경하여, 문장을 더 공식적이고 완결된 형태로 마무리합니다.
- 개별 문장 내에서, 사실을 전달하는 동시에 적절한 예의를 갖추어 표현하며, 독자에게 정보를 제공하는 것이 목적임을 분명히 합니다.
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
    content = content.replace("{", "").replace("}", "")
    content = "{" + content + "}"
    summary_list = json.loads(content)
    return summary_list
