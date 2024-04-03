class User:
    def __init__(
        self,
        id,
        identifier=None,
        password=None,
        platform=None,
        platform_id=None,
        member_type=None,
    ) -> None:
        self.id = id
        self.identifier = identifier
        self.password = password
        self.platform = platform
        self.platform_id = platform_id
        self.member_type = member_type
