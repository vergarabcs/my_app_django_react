import api from "../../api";
import { getNewTicketCode, makeTicketExpired } from "../../utils";

function* temp() {
  let index = 0;
  while(true){
    yield `Bill_${index}`;
    index++;
  }
}

const nameGenerator = temp();

function connect(ticketCode) {
  return new Promise(function(resolve, reject) {
      var server = new WebSocket(`ws://localhost:8000/ws/room/${ticketCode}/`);
      server.onopen = function() {
          resolve(server);
      };
      server.onerror = function(err) {
          console.log('billOnError', err.isTrusted)
          reject(err);
      };
  });
}

describe('Create room Api test', () => {
  let data;
  let ticketCode;
  let chatSocket;

  const joinRoom = async () => {
    const dummyFx = jest.fn();
    let jData;
    try{
      jData = {
        joinCode: data.joinCode,
        name: nameGenerator.next().value
      }
      const resp = await api({
        method: 'POST',
        url: "http://127.0.0.1:8000/game/join_room/",
        data: jData
      });
      console.log(resp.data)
      expect(resp?.data?.ticketCode).toBeDefined()
      ticketCode = resp.data.ticketCode
    }catch(error){
      console.log('joinRoomError', error.response.data, jData)
      dummyFx()
    }
    expect(dummyFx).not.toHaveBeenCalled()
  }

  const uncaughtJoinRoom = async (name) => {
    name = name ?? nameGenerator.next().value
    const dummyFx = jest.fn();
    let jData;
    jData = {
      joinCode: data.joinCode,
      name: name
    }
    const resp = await api({
      method: 'POST',
      url: "http://127.0.0.1:8000/game/join_room/",
      data: jData
    });
  }

  test('Creates a room', async () => {
    const resp = await api({
      method: 'POST',
      url: "http://127.0.0.1:8000/game/room/",
      data: {
        name: 'Bill',
        game: 'Word Factory'
      }
    });
    expect(resp.data.joinCode > 0).toEqual(true)
    expect(resp.data.ticketCode).toBeDefined()
    data = resp.data
  });

  test('Test join_room fails if not existing', async () => {
    const dummyFx = jest.fn();
    try{
      const resp = await api({
        method: 'POST',
        url: "http://127.0.0.1:8000/game/join_room/",
        data: {
          joinCode: '3'
        }
      });
      dummyFx()
    }catch(error){
      expect(error?.response?.data?.joinCode).toContain('Room does not exist')
    }
    expect(dummyFx).not.toHaveBeenCalled()
  })

  test('Test join_room succeeds', async () => await joinRoom())

  test('Join Room should fail when name is repeated', async () => {
    const dummyFx = jest.fn();
    try{
      await uncaughtJoinRoom('Bill_0')
    }catch(error){
      console.log('Error name is not unique', error.response.data)
      dummyFx()
    }
    expect(dummyFx).toHaveBeenCalled();
  })

  test('Join Room should fail when room is full', async () => {
    // join 3 times then next join should fail
    const dummyFx = jest.fn();
    for( let i=0 ; i<3 ; i++){
      await joinRoom()
    }
    try{
      await uncaughtJoinRoom()
    }catch(error){
      console.log('Room Full Error', error.response.data)
      dummyFx()
    }
    expect(dummyFx).toHaveBeenCalled()
  })

  test('Ws connection should fail when wrong ticketcode', async () => {
    const wrongJoinCode = "834798"
    const dummyFx = jest.fn();
    try{
      const chatSocket2 = await connect(wrongJoinCode)
    }catch(error){
      console.log('bill2', error)
      dummyFx();
    }
    expect(dummyFx).toHaveBeenCalled()
  })

  test('Web socket connection succeeds on a ticketCode one time only', async () => {
    console.log('Ticket code should succeed', ticketCode)
    const dummyFx = jest.fn();
    try{
      chatSocket = await connect(ticketCode)
    }catch(error){
      dummyFx();
    }
    try{
      await connect(ticketCode)
    }catch(error){
      dummyFx();
    }
    expect(dummyFx).toHaveBeenCalledTimes(1)
  })

  test('Ws connection should fail when ticket is expired', async () => {
    const dummyFx = jest.fn();
    const newTicketCode = await getNewTicketCode();

    await makeTicketExpired(newTicketCode);
    try{
      chatSocket = await connect(newTicketCode)
    }catch(error){
      dummyFx();
    }
    expect(dummyFx).toHaveBeenCalled()
  })
});
