from __future__ import unicode_literals

import datetime
from utils import generateCode

from django.db import models
from django.utils import timezone

# Create your models here.

class Room(models.Model):
    PENDING = 'P'
    IN_PROGRESS = 'IP'
    FINISHED = 'F'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (IN_PROGRESS, 'In Progress'),
        (FINISHED, 'Finished'),
    ]
    joinCode = models.CharField(default=Room.generateUniqueCode())
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=PENDING)
    maxSize = models.PositiveIntegerField(default=5)
    players = models.JSONField() #ordered field
    createAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

    @staticmethod
    def generateUniqueCode():
        code = str(generateCode())
        while(Room.objects.filter(joinCode=code).count() >= 1):
            code = str(generateCode())

