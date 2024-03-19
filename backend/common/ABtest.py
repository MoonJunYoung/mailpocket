import os

from dotenv import load_dotenv
from growthbook import GrowthBook

load_dotenv()

client_key = os.environ.get("GROWTHBOOK_CLIENT_KEY")


def get_features(user_id):
    result = []
    attributes = {"id": user_id}
    gb = GrowthBook(
        attributes=attributes,
        api_host="https://cdn.growthbook.io",
        client_key=client_key,
    )
    gb.load_features()
    features = gb.getFeatures()
    for feature_key in features.keys():
        feature_value = gb.get_feature_value(feature_key, None)
        result.append({"feature_key": feature_key, "feature_value": feature_value})
    return result
