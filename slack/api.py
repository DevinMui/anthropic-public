from logging import Logger
from graphqlclient import GraphQLClient
from typing import Optional

import json

classify_query = """
mutation Classify($input: ClassifyInput!) {
  classify(input: $input) {
    ingester_item {
      id
    }
  }
}
"""

url = "https://dolphin-app-xqueq.ondigitalocean.app/graphql"

client = GraphQLClient(url)

"""
provider is slack / email
message is the message to be ingested (slack message)
link is the permalink to the message
metadata will be decided on soon™ but will prob contain avatars and other data to be displayed on the web
"""
def classify(provider: str, message: str, link: str, metadata: Optional[str]) -> bool:
    variables = {
        'input': {
            'provider': provider,
            'message': message,
            'link': link,
            'metadata': metadata
        }
    }
    try:
        result = client.execute(classify_query, variables)
        data = json.loads(result)
        if 'errors' in data:
            Logger.error("GraphQL query failed: %s", data['errors'])
            return False
        return True
    except Exception as e:
        Logger.exception(e)
        return False
