import uuid

from django.contrib.postgres.fields import JSONField
from django.db import models

# Create your models here.

class WsTicket(models.Model):
    code = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            editable=False)
    data = JSONField()
    createAt = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create(cls, data):
        # data: {name: string, game: string, joinCode: string}
        return WsTicket.objects.create(
            data = data
        )
