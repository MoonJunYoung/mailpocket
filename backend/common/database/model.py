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
    user_key = Column(String)
    access_token = Column(String)
    team_name = Column(String)
    team_icon = Column(String)
    user_id = Column(Integer)

    def __init__(self, id, user_key, access_token, team_name, team_icon, user_id):
        self.id = id
        self.user_key = user_key
        self.access_token = access_token
        self.team_name = team_name
        self.team_icon = team_icon
        self.user_id = user_id
