from django.test import TestCase

# Create your tests here.

from django.test import TestCase

from game.algo import Board
from game.models import Room, WordFactory

SAMPLE_BOARD = [
    ['i', 'p', 'e', 't', 'n'],
    ['j', 'n', 't', 'd', 'i'],
    ['s', 'u', 'm', 'q', 'a'],
    ['h', 'm', 'm', 's', 'u'],
    ['r', 'o', 'o', 's', 'a']
]
class BoardTestCase(TestCase):
    def test_logic(self):
        board = Board(size=5, board_state=SAMPLE_BOARD)
        board.solve()
        assert('mushroom' in board.answers)
        assert('pet' not in board.answers) #minimum 4 letter words

        board.answers = {'this', 'game', 'funs', 'colds'}
        assert(board.get_score() == 5)

    def test_generic_relation(self):
        wordFactory = WordFactory.create()
        room = Room.createDefault('Bill')
        room.content_object = wordFactory
        room.save()

