import datetime

from sqlalchemy import DATETIME, JSON, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class UserModel(Base):
    __tablename__ = "user"
    id = Column("id", Integer, primary_key=True)
    identifier = Column(String)
    password = Column(String)

    def __init__(self, id, identifier, password):
        self.id = id
        self.identifier = identifier
        self.password = password


class ChannelModel(Base):
    __tablename__ = "channel"
    id = Column("id", Integer, primary_key=True)
    webhook_url = Column(String)
    slack_channel_id = Column(String)
    name = Column(String)
    team_name = Column(String)
    team_icon = Column(String)
    user_id = Column(Integer)

    def __init__(
        self, id, webhook_url, slack_channel_id, name, team_name, team_icon, user_id
    ):
        self.id = id
        self.webhook_url = webhook_url
        self.slack_channel_id = slack_channel_id
        self.name = name
        self.team_name = team_name
        self.team_icon = team_icon
        self.user_id = user_id


class NewsLetterModel(Base):
    __tablename__ = "newsletter"
    id = Column("id", Integer, primary_key=True)
    name = Column(String)
    from_email = Column(String)
    category = Column(String)
    send_date = Column(String)
    last_recv_at = Column(DATETIME)

    def __init__(self, id, name, from_email, category, send_date):
        self.id = id
        self.name = name
        self.from_email = from_email
        self.category = category
        self.send_date = send_date


class SubscribeModel(Base):
    __tablename__ = "subscribe"
    id = Column("id", Integer, primary_key=True)
    newsletter_id = Column(Integer)
    user_id = Column(Integer)

    def __init__(self, id, newsletter_id, user_id):
        self.id = id
        self.newsletter_id = newsletter_id
        self.user_id = user_id


class MailModel(Base):
    __tablename__ = "mail"
    id = Column("id", Integer, primary_key=True)
    s3_object_key = Column(String)
    subject = Column(String)
    summary_list = Column(JSON)
    newsletter_id = Column(Integer)
    recv_at = Column(DATETIME, default=datetime.datetime.now())

    def __init__(self, id, s3_object_key, subject, summary_list, newsletter_id):
        self.id = id
        self.s3_object_key = s3_object_key
        self.subject = subject
        self.summary_list = summary_list
        self.newsletter_id = newsletter_id
