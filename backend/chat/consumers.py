import json
from datetime import timedelta, datetime

from channels.generic.websocket import AsyncWebsocketConsumer

from chat.models import WsTicket

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        ticketCode = self.scope['url_route']['kwargs']['ticketCode']
        try:
            ticket = WsTicket.objects.filter(
                code=ticketCode
            ).first()
            time_threshold = datetime.now(ticket.createAt.tzinfo) - timedelta(minutes=2)
            if(ticket.createAt < time_threshold):
                ticket.delete()
                self.close()
                return
        except Exception as e:
            self.close()
            return
        if(not ticket):
            await self.close()
            return
        room_name = ticket.data['joinCode']

        #Update room:
        self.room_name = room_name
        self.room_group_name = 'room_%s' % self.room_name
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        ticket.delete()
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        if(not hasattr(self, 'room_group_name')):
            return
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
