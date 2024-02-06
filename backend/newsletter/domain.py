from backend.mail.domain import Mail


class NewsLetter:
    def __init__(
        self, id, name, from_email, category, send_date, mail: Mail = None
    ) -> None:
        self.id = id
        self.name = name
        self.from_email = from_email
        self.category = category
        self.send_date = send_date
        self.mail = mail
