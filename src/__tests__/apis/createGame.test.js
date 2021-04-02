import api from "../../api";
import { URLS } from "../../constants/urls";

function connect(joinCode) {
  return new Promise(function(resolve, reject) {
      var server = new WebSocket(`ws://localhost:8000/ws/room/${joinCode}/`);
      server.onopen = function() {
          resolve(server);
      };
      server.onerror = function(err) {
          reject(err);
      };
  });
}

describe('Create room Api test', () => {
  let data;
  let ticketCode;
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

  test('Test join_room succeeds', async () => {
    const dummyFx = jest.fn();
    try{
      const resp = await api({
        method: 'POST',
        url: "http://127.0.0.1:8000/game/join_room/",
        data: {
          joinCode: data.joinCode
        }
      });
      console.log(resp.data)
      expect(resp?.data?.ticketCode).toBeDefined()
      ticketCode = resp.data.ticketCode
    }catch(error){
      dummyFx()
    }
    expect(dummyFx).not.toHaveBeenCalled()
  })

  test('Web socket connection succeeds', async () => {
    
  })

  // test('Should be able to join room if join code is correct', async () => {
  //   const wrongJoinCode = "834798"
  //   const dummyFx = jest.fn();
  //   try{
  //     const chatSocket = await connect(wrongJoinCode)
  //   }catch(error){
  //     console.log('bill', error)
  //     dummyFx();
  //   }
  //   expect(dummyFx).not.toHaveBeenCalled()
  // })
});
