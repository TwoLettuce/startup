const GameEvent = {
  System: 'system',
  Connect: 'connect',
  End: 'gameOver',
  Move: 'move',
  Select: 'characterSelect',
  Mana: 'Not enough Mana',
  Damaged: 'took damage',
  Healed: 'healed',
  Blocking: 'blocking'
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];
  handlers = [];

  constructor() {

    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = async (event) => {
      const msg = new EventMessage('System', GameEvent.System, 'connected')
      this.receiveEvent(msg);
    };

    this.socket.onclose = async (event) => {
      this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
    };
    
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  }

  sendError(mana, cost){
    this.receiveEvent();
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => {h !== handler});
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier, EventMessage };
