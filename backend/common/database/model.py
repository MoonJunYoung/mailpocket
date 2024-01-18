from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class UserModel(Base):
    __tablename__ = "user"
    id = Column("id", Integer, primary_key=True)
    identifier = Column(String)
    password = Column(String)
    name = Column(String)

    def __init__(self, id, identifier, password, name):
        self.id = id
        self.identifier = identifier
        self.password = password
        self.name = name


class ChannelModel(Base):
    __tablename__ = "channel"
    id = Column("id", Integer, primary_key=True)
    webhook_url = Column(String)
    name = Column(String)
    team_name = Column(String)
    team_icon = Column(String)
    user_id = Column(Integer)

    def __init__(self, id, webhook_url, name, team_name, team_icon, user_id):
        self.id = id
        self.webhook_url = webhook_url
        self.name = name
        self.team_name = team_name
        self.team_icon = team_icon
        self.user_id = user_id


class SubscribeModel(Base):
    __tablename__ = "subscribe"
    id = Column("id", Integer, primary_key=True)
    newsletter_id = Column(String)
    user_id = Column(Integer)

    def __init__(self, id, newsletter_id, user_id):
        self.id = id
        self.newsletter_id = newsletter_id
        self.user_id = user_id
