from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.models import WsTicket
from game.models import Room
from game.serializer import SeriCreateRoom, SeriJoinRoom


class ApiCreateRoom(APIView):
    def post(self, request, format=None):
        serializer = SeriCreateRoom(data = request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            room = Room.createDefault(data['name'])
            # insert joinCode
            data['joinCode'] = room.joinCode
            ticket = WsTicket.create(data)
            return Response({
                'joinCode': room.joinCode,
                'ticketCode': ticket.code
            }, status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApiJoinRoom(APIView):
    def post(self, request, format=None):
        serializer = SeriJoinRoom(data = request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            ticket = WsTicket.create(data)
            return Response({
                'ticketCode': ticket.code
            }, status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
