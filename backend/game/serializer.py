from django.utils.translation import override
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueForYearValidator, UniqueValidator

from chat.models import WsTicket
from game.models import Room, Game


# def validate_name(self, value):
#     #TODO: this query is done twice. Find a way so that it only has to query once per serializer.is_valid
#     pass
#     vError = ValidationError("Name is already taken")
#     joinCode = self.initial_data['joinCode']
#     name = self.initial_data['name']
#     wsQs = WsTicket.objects.filter(data__joinCode=joinCode, data__name=name)
#     if(wsQs > 1):
#         raise vError
#     players = Room.objects.filter(joinCode=joinCode).first().

def uniqueNameValidator(data):
    joinCode = data['joinCode']
    name = data['name']
    vError = ValidationError("Name is already taken")
    wsQs = WsTicket.objects.filter(data__joinCode=joinCode, data__name=name)
    if(len(wsQs) >= 1):
        raise vError
    players = Room.objects.filter(joinCode=joinCode).first().players
    if(name in players):
        raise vError

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
    game = serializers.ChoiceField(choices=Game.GAME_CHOICES)

class SeriJoinRoom(serializers.Serializer):
    joinCode = serializers.CharField(min_length=6, validators=[isExistingAndNotFull])
    name = serializers.CharField(min_length=2)

    class Meta:
        #these validators get called after field level validators
        validators = [uniqueNameValidator]


#TODO: validate game and name
