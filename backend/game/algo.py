from game.words_loader import Trie, get_words_set
import random

trie: Trie = Trie.get_trie()

ALPHABET = list('abcdefghijklmnopqrstuvwxyz')
class LetterGenerator():
    def __init__(self, frequency_table):
        if frequency_table:
            self.weights = [v for k, v in frequency_table.items()]
            self.letter_list = ALPHABET
        else:
            self.weights = [1 for i in range(len(ALPHABET))]
            self.letter_list = ALPHABET

    def next(self):
        return random.choices(self.letter_list, weights=self.weights)[0]

DIRECTIONS = (
    (0, 1), #right
    (1, 0), #down
    (0, -1), #left
    (-1, 0) #up
)

class Board():
    def __init__(self, frequency_table=None, size=0, board_state=None):
        letterGen = LetterGenerator(frequency_table)
        if board_state:
            self.board_state = board_state
            self.size = len(board_state)
        else:
            self.board_state = [[letterGen.next() for y in range(size)] for x in range(size)]
            self.size = size
        self.answers = set()

    def __str__(self):
        return str(self.board_state)

    def solve(self):
        for i in range(self.size):
            for j in range(self.size):
                trie.reset()
                is_visited = [[False for y in range(self.size)] for x in range(self.size)]
                self.dfs(i, j, is_visited)

    def get_score(self):
        sum = 0
        for answer in self.answers:
            sum += len(answer) - 3
        return sum

    def dfs(self, i, j, is_visited):
        for dir in DIRECTIONS:
            new_i = i + dir[0]
            new_j = j + dir[1]
            if new_i < 0 or new_j < 0 or new_i >= self.size or new_j >= self.size:
                continue
            if is_visited[i][j]:
                continue
            char = self.board_state[i][j]
            type = trie.push(char)
            if(type == Trie.INVALID):
                return
            if(type == Trie.VALID_NEXT or type == Trie.IS_WORD):
                if(type == Trie.IS_WORD):
                    self.answers.add(trie.get_word())
                is_visited[i][j] = True
                self.dfs(new_i, new_j, is_visited)
                trie.pop()
                is_visited[i][j] = False

def generate_random_f_table():
    table = dict()
    for char in ALPHABET:
        table[char] = random.randint(1, 10)
    return table

MAX_WEIGHT = 20
INITIAL_WEIGHT = 10
def deviate(best_table):
    new_table = dict(best_table)
    chosen_set = random.choices(ALPHABET, k=INITIAL_WEIGHT)
    for letter in chosen_set:
        new_table[letter] += random.randint(-2, 2)
        if new_table[letter] == 0: new_table[letter] = 1
        if new_table[letter] > MAX_WEIGHT: new_table[letter] = MAX_WEIGHT

def get_result(curr_table, best_score):
    score_list = []
    board = None
    for i in range(100):
        board = Board(frequency_table=curr_table, size=5)
        board.solve()
        score = board.get_score()
        score_list.append(score)
    score = sum(score_list)/len(score_list)
    if (score > best_score):
        print('Replacing')
        print(board.answers)
        print(curr_table)
        best_score = score
        best_table = curr_table
        return (best_table, best_score)
    return (curr_table, best_score)

def find_best_frequency():
    best_score = -1
    best_table = {}
    for letter in ALPHABET:
        best_table[letter] = 5
    for i in range(100):
        best_table, best_score = get_result(best_table, best_score)
        neighbor = deviate(best_table)
        best_table, best_score = get_result(neighbor, best_score)
        best_table, best_score = get_result(generate_random_f_table(), best_score)
    return best_table, best_score
