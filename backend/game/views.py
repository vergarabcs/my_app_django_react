from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from game.serializer import SeriCreateRoom


class ApiCreateRoom(APIView):
    def post(self, request, format=None):
        serializer = SeriCreateRoom(data = request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
