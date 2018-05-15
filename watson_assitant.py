'''
设置
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

#Exception框架
#try:
#    # Invoke a Assistant method
#except WatsonApiException as ex:
#    print "Method failed with status code " + str(ex.code) + ": " + ex.message