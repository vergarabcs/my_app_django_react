class Room:
    default = Room.generateDefault()

    @staticmethod
    def generateDefault():
        return "Hello World"
    
print(Room.default)