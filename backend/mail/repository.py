from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import MailModel
from backend.common.s3 import S3Connector
from backend.mail.domain import Mail


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
        mail = Mail(mail_content, s3_object_key)
        return mail

    class CreateMail(MysqlCRUDTemplate):
        def __init__(self, mail: Mail) -> None:
            self.mail = mail
            super().__init__()

        def execute(self):
            mail_model = MailModel(
                id=None,
                s3_object_key=self.mail.s3_object_key,
                subject=self.mail.subject,
                summary_list=self.mail.summary_list,
                newsletter_id=self.mail.newsletter_id,
            )
            self.session.add(mail_model)
            self.session.commit()
