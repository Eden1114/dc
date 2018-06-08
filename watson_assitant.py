'''
credentials:
{
    "url": "https://gateway.watsonplatform.net/assistant/api",
    "username": "015fa27e-57f2-4b95-a233-0d9116989090",
    "password": "e6TwQQcPoqoe"
}
'''

'''Introduction
The IBM Watson™ Assistant service combines machine learning, natural language understanding, and integrated dialog tools to create conversation flows between your apps and your users.
'''

from watson_developer_cloud import AssistantV1
from watson_developer_cloud import WatsonApiException
import json
import watson_developer_cloud

assistant = AssistantV1(
    version='2018-02-16',
    username='015fa27e-57f2-4b95-a233-0d9116989090',
    password='e6TwQQcPoqoe',
    url='https://gateway.watsonplatform.net/assistant/api'
)
#########################
# Workspaces
#########################

create_workspace_data = {
    "name": "test_workspace",
    "description": "integration tests",
    "language": "en",
    "intents": [{
        "intent": "hello",
        "description": "string",
        "examples": [{
            "text": "good morning"
        }]
    }],
    "entities": [{
        "entity": "pizza_toppings",
        "description": "Tasty pizza toppings",
        "metadata": {
            "property": "value"
        }
    }],
    "counterexamples": [{
        "text": "string"
    }],
    "metadata": {},
}

response = assistant.create_workspace(
    name=create_workspace_data['name'],
    description=create_workspace_data['description'],
    language='en',
    intents=create_workspace_data['intents'],
    entities=create_workspace_data['entities'],
    counterexamples=create_workspace_data['counterexamples'],
    metadata=create_workspace_data['metadata'])
print(json.dumps(response, indent=2))

"""
Exception框架

try:
    # Invoke a Assistant method
except WatsonApiException as ex:
    print "Method failed with status code " + str(ex.code) + ": " + ex.message

"""