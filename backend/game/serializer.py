from django.utils.translation import override
from rest_framework import serializers

class SeriCreateRoom(serializers.Serializer):
    name = serializers.CharField(min_length=1)
    game = serializers.CharField()
