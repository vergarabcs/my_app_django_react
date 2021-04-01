from __future__ import unicode_literals

import datetime

from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone

# Create your models here.
from utils import generateCode


class Room(models.Model):
    PENDING = 'P'
    IN_PROGRESS = 'IP'
    FINISHED = 'F'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (IN_PROGRESS, 'In Progress'),
        (FINISHED, 'Finished'),
    ]
    joinCode = models.CharField(max_length=10)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=PENDING)
    maxSize = models.PositiveIntegerField(default=5)
    players = JSONField() #ordered field-
    createAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        now = timezone.now()
        x = Room.generateUniqueCode()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

    @staticmethod
    def generateUniqueCode():
        code = str(generateCode())
        q_set = Room.objects.filter(joinCode=code)
        count = q_set.count()
        while(count >= 1):
            code = str(generateCode())
            count = Room.objects.filter(joinCode=code).count()
        return code

    @staticmethod
    def createDefault(creator_name: str):
        joinCode = Room.generateUniqueCode()
        room = Room.objects.create(
            joinCode = joinCode,
            players = [
                creator_name
            ]
        )
        return room

