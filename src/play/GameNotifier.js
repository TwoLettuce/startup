const GameEvent = {
  System: 'system',
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

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
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
export { GameEvent, GameNotifier };
