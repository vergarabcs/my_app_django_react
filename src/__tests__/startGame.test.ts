import api from "../api";
import { connect } from "../utils";

const joinRoom = async (joinCode: string, name: string) => {
  const resp = await api({
    method: 'POST',
    url: "http://127.0.0.1:8000/game/join_room/",
    data: {
      joinCode: joinCode,
      name: name,
    }
  });

  return resp;
}

describe('Start game tests', () => {
  let hostSocket;
  let p1Socket;
  let p2Socket;
  beforeAll(async () => {
    const resp1 = await api({
      method: 'POST',
      url: "http://127.0.0.1:8000/game/room/",
      data: {
        name: 'HostName',
        game: 'Word Factory'
      }
    });

    hostSocket = await connect(resp1.data.ticketCode);
    const ticket1 = (await joinRoom(resp1.data.joinCode, 'Player1')).data.ticketCode;
    const ticket2 = (await joinRoom(resp1.data.joinCode, 'Player2')).data.ticketCode;
    console.log('bill', {
      ticket1,
      ticket2
    })
    p1Socket = await connect(ticket1);
    p2Socket = await connect(ticket2);
  });

  test('starting a game succeeds if coming from host', async () => {

  })
  
  test('When starting a game, all connected players should receive the game info', () => {
    
  })
})

export {}