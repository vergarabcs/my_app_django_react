from collections import deque


class Vars:
    words_set = None
    f_table = None

def get_words_set():
    if(Vars.words_set): return Vars.words_set
    with open('words_alpha.txt') as word_file:
        words_set = set(word_file.read().split())
        duplicate = set(words_set)
        for word in words_set:
            if len(word) <= 3:
                duplicate.remove(word)
    return duplicate

def get_f_table():
    if Vars.f_table: return Vars.f_table
    word_set = get_words_set()
    from game.algo import ALPHABET
    f_table = {char: 0 for char in ALPHABET}
    for word in word_set:
        for char in list(word):
            f_table[char] += 1
    Vars.f_table = f_table
    return f_table

class Node():
    def __init__(self, value):
        self.value = value
        self.children = dict()
        self.isEnd = False

    def getNode(self, character):
        return self.children.get(character)

    def addChild(self, character):
        newNode = Node(character)
        self.children[character] = newNode
        return newNode

    def __str__(self):
        return str(self.value)

class Trie():
    VALID_NEXT = 'Valid'
    IS_WORD = 'Is_word'
    INVALID = 'invalid'

    singleton = None

    @staticmethod
    def get_trie():
        if Trie.singleton:
            return Trie.singleton
        Trie.singleton = Trie()
        return Trie.singleton

    def __init__(self):
        self.words_set = get_words_set()
        self.rootNode = Node('')
        self.d_list = deque()
        self.d_list.append(self.rootNode)
        for word in self.words_set:
            self.insert(word)

    def reset(self):
        self.currNode = self.rootNode
        self.d_list.clear()
        self.d_list.append(self.rootNode)

    def insert(self, word):
        self.reset()
        currNode = self.d_list[-1]
        for character in word:
            nextNode = currNode.getNode(character)
            if(not nextNode):
                nextNode = currNode.addChild(character)
            currNode = nextNode
        currNode.isEnd = True
        self.reset()

    def push(self, next_char):
        currNode = self.d_list[-1]
        next_node: Node = currNode.getNode(next_char)
        if(not next_node):
            return Trie.INVALID
        currNode = next_node
        self.d_list.append(currNode)
        if(next_node.isEnd):
            return Trie.IS_WORD
        return Trie.VALID_NEXT

    def pop(self):
        self.d_list.pop()

    def get_word(self):
        char_list = [node.value for node in self.d_list]
        return "".join(char_list)

def test():
    trie = Trie()
    test_words = ['apple', 'banana', 'rest', 'resting', 'restinlksd']

    for word in test_words:
        trie.reset()
        print()
        print(word)
        for char in word:
            print(trie.push(char))
            print(trie.get_word())

