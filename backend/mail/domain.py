from email import policy
from email.parser import BytesParser

from backend.common.gpt_prompt import mail_summary


class Mail:
    def __init__(self, mail_content=None, s3_object_key=None) -> None:
        self.mail_content = mail_content
        self.s3_object_key = s3_object_key

    def parser_eamil(self):
        parsed_email = BytesParser(policy=policy.default).parsebytes(self.mail_content)

        from_email = str(parsed_email["From"])
        subject = str(parsed_email["Subject"])
        html_body = None
        if parsed_email.is_multipart():
            for part in parsed_email.walk():
                if part.get_content_type() == "text/html":
                    html_body = part.get_payload(decode=True).decode(
                        part.get_content_charset()
                    )
                    break
        else:
            if parsed_email.get_content_type() == "text/html":
                html_body = parsed_email.get_payload(decode=True).decode(
                    parsed_email.get_content_charset()
                )

        self.from_name = from_email.split(" <")[0]
        if '"' in self.from_name:
            self.from_name = self.from_name.replace('"', "")
        self.from_email = from_email.split(" <")[1].replace(">", "")
        self.subject = subject
        self.html_body = html_body
        self.read_link = f"https://mailpocket.site/read?mail={self.s3_object_key}"
        del self.mail_content

    def summary(self):
        self.summary_list = mail_summary(self.from_email, self.subject, self.html_body)

    def fail_summary(self):
        self.summary_list = {"요약을 실패했습니다.": "본문을 확인해주세요."}

    def set_newsletter_id(self, newsletter_id):
        self.newsletter_id = newsletter_id
