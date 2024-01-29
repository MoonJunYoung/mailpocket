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
