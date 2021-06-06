import moment from "moment";
import { Client } from 'pg'
import api from "./api";

export const makeTicketExpired = async (ticketCode) => {
  let pgClient = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    port: 5432,
    password: 'Cilantro6!'
  });
  pgClient.connect();
  const dateString = moment(new Date()).subtract(3, 'minute').format('YYYY-MM-DD HH:MM:SS')
  console.log('BillyBoy', dateString)
  const queryString = `UPDATE chat_wsticket SET "createAt" = '${dateString}' WHERE code = '${ticketCode}';`
  console.log('bill3', queryString);
  try{
    const resp = await pgClient.query({
      name: 'someName',
      text: queryString
    });
    console.log('bill resp', resp)
  } catch (error){
    console.log("bill error", error)
  }
  await pgClient.end();
}

export const getNewTicketCode = async () => {
  const resp = await api({
    method: 'POST',
    url: "http://127.0.0.1:8000/game/room/",
    data: {
      name: 'Bill',
      game: 'Word Factory'
    }
  });

  console.log('billNow', resp);
  return resp.data.ticketCode
}

export function connect(ticketCode) {
  return new Promise(function(resolve, reject) {
      var server = new WebSocket(`ws://localhost:8000/ws/room/${ticketCode}/`);
      server.onopen = function() {
          resolve(server);
      };
      server.onerror = function(err) {
          reject(err);
      };
  });
}