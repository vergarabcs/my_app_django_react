from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/room/(?P<joinCode>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
