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
  // let joinCode;
  // test('Creates a room', async () => {
  //   const resp = await api({
  //     method: 'POST',
  //     url: "http://127.0.0.1:8000/game/room/",
  //     data: {
  //       name: 'Bill',
  //       game: 'Word Factory'
  //     }
  //   });
  //   expect(resp.data.joinCode > 0).toEqual(true)
  //   joinCode = resp.data.joinCode
  // });

  test('Should not be able to join room if join code is wrong', async () => {
    const wrongJoinCode = "834798sdfsdf"
    const dummyFx = jest.fn();
    try{
      const chatSocket = await connect(wrongJoinCode)
    }catch(error){
      console.log('bill', error)
      dummyFx();
    }
    expect(dummyFx).toHaveBeenCalled()
  })

  test('Should be able to join room if join code is correct', async () => {
    const wrongJoinCode = "834798"
    const dummyFx = jest.fn();
    try{
      const chatSocket = await connect(wrongJoinCode)
    }catch(error){
      console.log('bill', error)
      dummyFx();
    }
    expect(dummyFx).not.toHaveBeenCalled()
  })
});
