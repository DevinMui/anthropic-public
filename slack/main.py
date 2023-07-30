import json
import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import sys
sys.path.insert(0, '/Users/catherine/Documents/github/anthropic-hacks/classify_package')
from api import classify
# Initializes your app with your bot token and socket mode handler
#main file
app = App(
    token="<slack bot token>",
    # ssl_check_enabled=False,url_verification_enabled=False,token_verification_enabled=False # not required for socket mode
)

@app.event("message")
def listen(body,say):
    event = body["event"]
    channel_id = event["channel"]
    message = event["text"]
    # get permalink api
    link = app.client.chat_getPermalink(
            channel=event["channel"],
            message_ts=event["ts"]
    )
    link = {
        'channel': link['channel'],
        'permalink': link['permalink']
    }
    classify("slack", message, json.dumps(link), None)

if __name__ == "__main__":
    SocketModeHandler(app, "<slack app token>").start()