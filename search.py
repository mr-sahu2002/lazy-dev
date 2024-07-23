from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

API_Key=os.getenv('TAVILY_API')
tavily_client = TavilyClient(api_key=API_Key)

def youtube_link(title):
    response = tavily_client.search(title , max_results=4, include_domains=['https://www.youtube.com/'])
    links=[result['url'] for result in response['results']]
    # print(response)
    return links

def book_link(title):
    response = tavily_client.search(title , max_results=2, include_domains=['https://archive.org/'])
    links=[result['url'] for result in response['results']]
    # print(response)
    return links

# youtube_res=youtube_link('what is machine learning')
# print(youtube_res)

# book_res=book_link('deep work')
# print(book_res)