import datetime

from sqlalchemy import func

from backend.common.database.connector import MysqlCRUDTemplate
from backend.common.database.model import (
    MailModel,
    NewsLetterModel,
    SubscribeModel,
    SubscribeRankingModel,
)
from backend.common.exceptions import UnknownFromEamilException
from backend.mail.domain import Mail
from backend.newsletter.domain import NewsLetter
from backend.user.domain import User


class NewsLetterRepository:
    class LoadNewsLetterByFromEmail(MysqlCRUDTemplate):
        def __init__(self, from_email) -> None:
            self.from_email = from_email
            super().__init__()

        def execute(self):
            newsletter_model = (
                self.session.query(NewsLetterModel)
                .filter(NewsLetterModel.from_email == self.from_email)
                .first()
            )
            if not newsletter_model:
                raise UnknownFromEamilException(self.from_email)
            newsletter = NewsLetter(
                id=newsletter_model.id,
                name=newsletter_model.name,
                from_email=newsletter_model.from_email,
                category=newsletter_model.category,
                send_date=newsletter_model.send_date,
            )
            return newsletter

        def run(self) -> NewsLetter:
            return super().run()

    class ReadNewsLettersByUser(MysqlCRUDTemplate):
        def __init__(
            self, user: User, subscribe_status, sort_type, in_mail: bool
        ) -> None:
            self.user = user
            self.in_mail = in_mail
            if subscribe_status == "subscribeable":
                pass
            if subscribe_status == "subscribed":
                pass
            if sort_type == "ranking":
                pass
            if sort_type == "recent":
                pass

            super().__init__()

        def read_newsletter_subscribe_ranking(self):
            newsletter_models = (
                self.session.query(
                    NewsLetterModel.id,
                    func.count(SubscribeModel.newsletter_id).label("subscribe_count"),
                )
                .join(
                    SubscribeModel, NewsLetterModel.id == SubscribeModel.newsletter_id
                )
                .group_by(NewsLetterModel.id)
                .order_by(func.count(SubscribeModel.newsletter_id).desc())
                .all()
            )
            print(newsletter_models)

        def execute(self):
            newsletter_list = list()
            subscribe_models = (
                self.session.query(SubscribeModel.newsletter_id)
                .filter(SubscribeModel.user_id == self.user.id)
                .all()
            )
            newsletter_ids = [
                subscribe_model[0] for subscribe_model in subscribe_models
            ]
            # newsletter_models = (
            #     self.session.query(NewsLetterModel)
            #     .filter(NewsLetterModel.id.not_in(newsletter_ids))
            #     .all()
            # )
            newsletter_models = (
                self.session.query(NewsLetterModel)
                .join(
                    SubscribeModel, NewsLetterModel.id == SubscribeModel.newsletter_id
                )
                .group_by(NewsLetterModel.id)
                .order_by(func.count(SubscribeModel.newsletter_id).desc())
                .filter(NewsLetterModel.id.not_in(newsletter_ids))
                .all()
            )
            for newsletter_model in newsletter_models:
                mail = None
                mail_model = (
                    self.session.query(MailModel)
                    .filter(MailModel.newsletter_id == newsletter_model.id)
                    .first()
                )
                if mail_model:
                    mail = Mail(
                        id=mail_model.id,
                        s3_object_key=mail_model.s3_object_key,
                        subject=mail_model.subject,
                        summary_list=mail_model.summary_list,
                    )
                newsletter = NewsLetter(
                    id=newsletter_model.id,
                    name=newsletter_model.name,
                    from_email=newsletter_model.from_email,
                    category=newsletter_model.category,
                    send_date=newsletter_model.send_date,
                    mail=mail,
                )
                newsletter_list.append(newsletter)
            return newsletter_list

    class LoadSubscribedNewsLettersByUser(MysqlCRUDTemplate):
        def __init__(self, user: User, in_mail) -> None:
            self.user = user
            self.in_mail = in_mail
            super().__init__()

        def execute(self):
            newsletter_list = list()
            subscribe_models = (
                self.session.query(SubscribeModel.newsletter_id)
                .filter(SubscribeModel.user_id == self.user.id)
                .all()
            )
            newsletter_ids = [
                subscribe_model[0] for subscribe_model in subscribe_models
            ]
            # newsletter_models = (
            #     self.session.query(NewsLetterModel)
            #     .filter(NewsLetterModel.id.in_(newsletter_ids))
            #     .all()
            # )
            newsletter_models = (
                self.session.query(NewsLetterModel)
                .join(
                    SubscribeModel, NewsLetterModel.id == SubscribeModel.newsletter_id
                )
                .group_by(NewsLetterModel.id)
                .order_by(func.count(SubscribeModel.newsletter_id).desc())
                .filter(NewsLetterModel.id.in_(newsletter_ids))
                .all()
            )
            for newsletter_model in newsletter_models:
                mail = None
                # 이론상 쿼리를 뉴스레터만큼 81번 보내는건데.. 리펙토링 생각해보기
                if self.in_mail:
                    mail_model = (
                        self.session.query(MailModel)
                        .filter(MailModel.newsletter_id == newsletter_model.id)
                        .first()
                    )
                    if mail_model:
                        mail = Mail(
                            id=mail_model.id,
                            s3_object_key=mail_model.s3_object_key,
                            subject=mail_model.subject,
                            summary_list=mail_model.summary_list,
                        )
                newsletter = NewsLetter(
                    id=newsletter_model.id,
                    name=newsletter_model.name,
                    from_email=newsletter_model.from_email,
                    category=newsletter_model.category,
                    send_date=newsletter_model.send_date,
                    mail=mail,
                )
                newsletter_list.append(newsletter)
            return newsletter_list

    class LoadNewsLetterByIDWithMails(MysqlCRUDTemplate):
        def __init__(self, id) -> None:
            self.id = id
            super().__init__()

        def execute(self):
            newsletter_model = (
                self.session.query(NewsLetterModel)
                .filter(NewsLetterModel.id == self.id)
                .first()
            )
            if not newsletter_model:
                return None
            mail_list = list()
            mail_models = (
                self.session.query(MailModel)
                .filter(MailModel.newsletter_id == newsletter_model.id)
                .all()
            )
            for mail_model in mail_models:
                mail = Mail(
                    id=mail_model.id,
                    s3_object_key=mail_model.s3_object_key,
                    subject=mail_model.subject,
                )
                mail_list.append(mail)
            newsletter = NewsLetter(
                id=newsletter_model.id,
                name=newsletter_model.name,
                from_email=newsletter_model.from_email,
                category=newsletter_model.category,
                send_date=newsletter_model.send_date,
                mails=mail_list,
            )
            return newsletter

    class Test(MysqlCRUDTemplate):
        def _read_newsletters_by_subscribe_ranking(self):
            if not self.__check_if_subscribe_ranking_is_today():
                newsletter_models = (
                    self.session.query(
                        NewsLetterModel.id,
                        func.count(SubscribeModel.newsletter_id),
                    )
                    .join(
                        SubscribeModel,
                        NewsLetterModel.id == SubscribeModel.newsletter_id,
                    )
                    .group_by(NewsLetterModel.id)
                    .order_by(func.count(SubscribeModel.newsletter_id).desc())
                    .all()
                )
                subscribe_ranking_models = [
                    SubscribeRankingModel(newsletter_model[0], newsletter_model[1])
                    for newsletter_model in newsletter_models
                ]
                self.session.add_all(subscribe_ranking_models)
                self.session.commit()
            newsletter_models = (
                self.session.query(NewsLetterModel)
                .join(
                    SubscribeRankingModel,
                    NewsLetterModel.id == SubscribeRankingModel.newsletter_id,
                )
                .group_by(NewsLetterModel.id)
                .order_by(SubscribeRankingModel.subscribe_count.desc())
                .all()
            )
            return newsletter_models

        def __check_if_subscribe_ranking_is_today(self):
            subscribe_ranking_model = self.session.query(SubscribeRankingModel).first()
            return subscribe_ranking_model.snapshot_at == datetime.date.today()

    class ReadNewsletters(MysqlCRUDTemplate):
        def __init__(self, user: User, sort_type, subscribe_status, in_mail) -> None:
            super().__init__()
            self.user = user
            self.newsletter_list = list()
            if sort_type == "recent":
                self.table_model = ""
            elif sort_type == "ranking":
                if not self.__check_if_subscribe_ranking_is_today():
                    self.__update_subscribe_ranking()

                self.table_model = (
                    self.session.query(NewsLetterModel)
                    .join(
                        SubscribeRankingModel,
                        NewsLetterModel.id == SubscribeRankingModel.newsletter_id,
                    )
                    .order_by(SubscribeRankingModel.subscribe_count.desc())
                )

            subscribe_models = (
                self.session.query(SubscribeModel.newsletter_id)
                .filter(SubscribeModel.user_id == self.user.id)
                .all()
            )
            subscribed_newsletter_ids = [
                subscribe_model[0] for subscribe_model in subscribe_models
            ]
            if subscribe_status == "subscribed":
                self.newsletter_models = self.table_model.filter(
                    NewsLetterModel.id.in_(subscribed_newsletter_ids)
                ).all()
            elif subscribe_status == "subscribable":
                self.newsletter_models = self.table_model.filter(
                    NewsLetterModel.id.not_in(subscribed_newsletter_ids)
                ).all()

            for newsletter_model in self.newsletter_models:
                mail = None
                if in_mail:
                    mail_model = (
                        self.session.query(MailModel)
                        .filter(MailModel.newsletter_id == newsletter_model.id)
                        .order_by(MailModel.id.desc())
                        .first()
                    )
                    if mail_model:
                        mail = Mail(
                            id=mail_model.id,
                            s3_object_key=mail_model.s3_object_key,
                            subject=mail_model.subject,
                            summary_list=mail_model.summary_list,
                            newsletter_id=mail_model.newsletter_id,
                        )
                newsletter = NewsLetter(
                    id=newsletter_model.id,
                    name=newsletter_model.name,
                    from_email=newsletter_model.from_email,
                    category=newsletter_model.category,
                    send_date=newsletter_model.send_date,
                    mail=mail,
                )
                self.newsletter_list.append(newsletter)

        def execute(self):
            return self.newsletter_list

        def __check_if_subscribe_ranking_is_today(self):
            subscribe_ranking_model = self.session.query(SubscribeRankingModel).first()
            return subscribe_ranking_model.snapshot_at == datetime.date.today()

        def __update_subscribe_ranking(self):
            self.session.query(SubscribeRankingModel).delete()
            newsletter_models = (
                self.session.query(
                    NewsLetterModel.id,
                    func.count(SubscribeModel.newsletter_id),
                )
                .join(
                    SubscribeModel,
                    NewsLetterModel.id == SubscribeModel.newsletter_id,
                )
                .group_by(NewsLetterModel.id)
                # .order_by(func.count(SubscribeModel.newsletter_id).desc())
                .all()
            )
            subscribe_ranking_models = [
                SubscribeRankingModel(newsletter_model[0], newsletter_model[1])
                for newsletter_model in newsletter_models
            ]
            self.session.add_all(subscribe_ranking_models)
            self.session.commit()
