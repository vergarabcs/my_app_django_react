from __future__ import unicode_literals

import datetime
import uuid

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone

# Create your models here.
from game.algo import Board
from game.words_loader import get_f_table
from utils import generateCode

class Game:
    WORD_FACTORY = 'W'
    GAME_CHOICES = [
        (WORD_FACTORY, 'Word Factory')
    ]

class Room(models.Model):
    PENDING = 'P'
    IN_PROGRESS = 'IP'
    FINISHED = 'F'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (IN_PROGRESS, 'In Progress'),
        (FINISHED, 'Finished'),
    ]
    joinCode = models.CharField(max_length=10, unique=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=PENDING)
    maxSize = models.PositiveIntegerField(default=5)
    players = JSONField(default=list)
    createAt = models.DateTimeField(auto_now_add=True)
    token = models.UUIDField(default=uuid.uuid4)

    #Fields for generic relation
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    object_id = models.PositiveIntegerField(
        blank=True,
        null=True
    )
    content_object = GenericForeignKey()

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
            players = []
        )
        return room

class BaseGame(models.Model):
    pass

class WordFactory(BaseGame):
    board_state = JSONField(default=list)
    answers = JSONField(default=list)
    room = GenericRelation(Room)

    @staticmethod
    def create(min_score = 20, size=5):
        score = 0
        itr = 0
        board = None
        while(score<min_score):
            board = Board(size=size, frequency_table=get_f_table())
            board.solve()
            score = board.get_score()
            itr+=1
            print(itr)

        boardObj = WordFactory.objects.create(
            board_state=board.board_state,
            answers = list(board.answers)
        )
        return boardObj


