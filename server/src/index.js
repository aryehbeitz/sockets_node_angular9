require('dotenv').config({path:__dirname+'/./../.env' })

const _ = require('lodash');
const uuid = require('uuid');

const { Client } = require('pg');
console.log(process.env)
const connectUrl = process.env.POSTGRES_CONNECT_URL
if (!connectUrl) {
  console.log('please set POSTGRES_CONNECT_URL in .env');
  process.exit()
}

const client = new Client({
  connectionString: connectUrl,
  // ssl: true
});
client.connect();
client.query('SELECT * FROM Funz where id = $1', [3], (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(_.get(result, 'rows.0'));
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT });

wss.on('connection', (ws, req) => {
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
    console.log('pong ' + ws.id);
  });
  ws.id = uuid.v4();
  ws.data = req.url.split('=').pop();
  console.log('new connection ' + ws.id + ' ' + req.socket.remoteAddress + ' data: ' + JSON.stringify(JSON.parse(unescape(ws.data)), null, 2));
  ws.on('message', (data) => {
    parsedData = JSON.parse(data);
    console.log(`Received message ${_.get(parsedData, 'message')} from user ${ws.id}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log('sending', data);
        client.send(data);
      }
    });
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      console.log('terminating connection: ' + ws.id);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(() => {
      console.log('ping ' + ws.id);
    });
  });
}, 10000);

wss.on('close', function close(ws) {
  console.log('closing connection ' + ws.id)
  clearInterval(interval);
});

function baseDbSetup() {
  query = `
    CREATE TABLE IF NOT EXISTS chat_messages (
      id SERIAL PRIMARY KEY,
      username varchar(45) NOT NULL,
      password varchar(450) NOT NULL,
      enabled integer NOT NULL DEFAULT '1',
      PRIMARY KEY (user_id)
    )
  `;
  client.query()
}
