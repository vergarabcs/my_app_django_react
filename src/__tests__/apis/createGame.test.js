import api from "../../api";
import { URLS } from "../../constants/urls";

describe('Create room Api test', () => {
  test('Creates a room', async () => {
    const resp = await api({
      method: 'POST',
      data: {
        name: 'Bill',
        game: 'Word Factory'
      }
    });

    console.log('bill', resp)
  });
});
