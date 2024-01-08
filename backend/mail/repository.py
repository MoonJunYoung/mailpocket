from backend.common.s3 import S3Connector
from backend.mail.domain import Mail


class MailRepository(S3Connector):
    def read_by_s3_object_key(self, s3_object_key):
        object = self.s3_client.get_object(Bucket=self.bucket_name, Key=s3_object_key)
        mail_content = object["Body"].read()
        mail = Mail(mail_content, s3_object_key)
        return mail
