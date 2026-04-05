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
      switch (data.type) {
        case 'connect':
          sendMsgAll(socketServer, data);
        case 'move':
          sendMsg(socketServer, data);
      }
    });

    socket.on('close', (socket) => {
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
        if ( client !== socket && client.readyState === WebSocket.OPEN) {
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
