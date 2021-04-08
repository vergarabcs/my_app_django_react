from chat.models import WsTicket
from game.models import Room

def startupScript():
    WsTicket.objects.all().delete()
    Room.objects.all().delete()
