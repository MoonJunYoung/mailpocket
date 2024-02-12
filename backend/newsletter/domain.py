from backend.mail.domain import Mail


class NewsLetter:
    def __init__(
        self,
        id,
        name,
        category,
        send_date,
        mail: Mail = None,
        mails: list[Mail] = None,
    ) -> None:
        self.id = id
        self.name = name
        self.category = category
        self.send_date = send_date
        self.mail = mail
        self.mails = mails
