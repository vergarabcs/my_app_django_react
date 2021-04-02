from django.utils.translation import override
from rest_framework import serializers
from rest_framework.validators import UniqueForYearValidator, UniqueValidator

from chat.models import WsTicket
from game.models import Room

def isExistingAndNotFull(joinCode):
    qS = Room.objects.filter(joinCode=joinCode)
    if(len(qS) < 1):
        raise serializers.ValidationError('Room does not exist')
    room = qS[0] #qS is guaranteed length 0 or 1 because of the way we create Room
    if(room.status != Room.PENDING):
        raise serializers.ValidationError('Room is in progress')
    playerCount = len(room.players)
    wsQs = WsTicket.objects.filter(data__joinCode=room.joinCode)
    playerCount += len(wsQs)
    if(playerCount >= room.maxSize):
        raise serializers.ValidationError('Room is full')

class SeriCreateRoom(serializers.Serializer):
    name = serializers.CharField(min_length=1)
    game = serializers.CharField()

class SeriJoinRoom(serializers.Serializer):
    joinCode = serializers.CharField(min_length=6, validators=[isExistingAndNotFull])

#TODO: validate game and name
