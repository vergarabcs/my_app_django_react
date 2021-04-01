from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from game.models import Room
from game.serializer import SeriCreateRoom

class ApiCreateRoom(APIView):
    def post(self, request, format=None):
        serializer = SeriCreateRoom(data = request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            room = Room.createDefault(data['name'])
            return Response({
                'joinCode': room.joinCode
            }, status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
