from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import MailModel
from backend.common.s3 import S3Connector
from backend.mail.domain import Mail
from backend.newsletter.domain import NewsLetter


class MailRepository(S3Connector):
    def read_by_s3_object_key(self, s3_object_key):
        try:
            object = self.seoul_s3_client.get_object(
                Bucket=self.seoul_bucket_name, Key=s3_object_key
            )
        except:
            object = self.virginia_s3_client.get_object(
                Bucket=self.virginia_bucket_name, Key=s3_object_key
            )
        mail_content = object["Body"].read()
        mail = Mail(id=None, mail_content=mail_content, s3_object_key=s3_object_key)
        return mail

    class CreateMail(MysqlCRUDTemplate):
        def __init__(self, mail: Mail) -> None:
            self.mail = mail
            super().__init__()

        def execute(self):
            mail_model = MailModel(
                id=None,
                s3_object_key=self.mail.s3_object_key,
                summary_list=self.mail.summary_list,
                newsletter_id=self.mail.newsletter_id,
            )
            self.session.add(mail_model)
            self.session.commit()
            self.mail.id = mail_model.id

    class ReadMail(MysqlCRUDTemplate):
        def __init__(self, mail: Mail) -> None:
            self.mail = mail
            super().__init__()

        def execute(self):
            mail_model = (
                self.session.query(MailModel)
                .filter(MailModel.s3_object_key == self.mail.s3_object_key)
                .first()
            )
            if not mail_model:
                return None

            self.mail.id = mail_model.id
            self.mail.summary_list = mail_model.summary_list
            self.mail.newsletter_id = mail_model.newsletter_id
            return True

    # 이론상 쿼리를 뉴스레터만큼 81번 보내는건데.. 리펙토링 생각해보기
    class ReadOneMailByNewsletter(MysqlCRUDTemplate):
        def __init__(self, newsletter: NewsLetter) -> None:
            self.newsletter = newsletter
            super().__init__()

        def execute(self):
            mail_model = (
                self.session.query(MailModel)
                .filter(MailModel.newsletter_id == self.newsletter.id)
                .first()
            )
            if not mail_model:
                return None
            mail = Mail(
                id=mail_model.id,
                s3_object_key=mail_model.s3_object_key,
                summary_list=mail_model.summary_list,
            )
            return mail
