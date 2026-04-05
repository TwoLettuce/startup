const { WebSocketServer, WebSocket } = require('ws');

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}


function webSocketHandler(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });
  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
    console.log('websocket connected');
    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      const msg = JSON.parse(data);
      console.log('received a websocket message');
      console.log('type ' + msg.type);
      switch (msg.type) {
        case 'connect':
          sendMsgAll(socketServer, data);
          break;
        case 'move':
          sendMsg(socketServer, data);
          break;
        case 'select':
          sendMsg(socketServer, data);
          break;
        case 'characterSelect':
          sendMsg(socketServer, data);
          break;
        case 'system':
          sendMsgAll(socketServer, data);
          break;
        default:
          console.log('default');
          sendMsgAll(socketServer, data);
      }
    });

    socket.on('close', (socket) => {
      console.log('received close from socket');
      const msg = new EventMessage('System', 'system', 'Opponent disconnected');
      sendMsg(socketServer, msg);
    });

    function sendMsgAll(socketServer, msg) {
      socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }

    function sendMsg(socketServer, msg) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { webSocketHandler };
