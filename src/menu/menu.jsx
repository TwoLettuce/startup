import React from 'react';
import "./menu.css";
import { Leaderboard } from './Leaderboard';
import { MatchSelect } from './MatchSelect';
import { WebSocketText } from '../play/WebSocketText';
import { GameEvent, GameNotifier } from '../play/GameNotifier'

export function Menu(props) {
  const [events, setEvent] = React.useState([]);


  React.useEffect(()=> {
          GameNotifier.addHandler(handleGameEvent);
          GameNotifier.broadcastEvent(props.username, GameEvent.Connect, {});
          return ()=>{GameNotifier.removeHandler(handleGameEvent)};
      },
      []
  );

  function handleGameEvent(event) {
      setEvent((prevEvents) => {
      let newEvents = [event, ...prevEvents];
      if (newEvents.length > 10) {
          newEvents = newEvents.slice(0, 10);
      }
      return newEvents;
      });
  }

  function loadMessages() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message;
      switch (event.type){
        case GameEvent.End:
          message = `Game Over!`;
          break;
        case GameEvent.Select:
          message = `${event.from} has selected their character!`;
          break;
        case GameEvent.System:
          message = event.value.msg;
          break;
        case GameEvent.Move:
          message = `${event.from} has selected their move!`;
          break;
        case GameEvent.Mana:
          message = "Not enough Mana, peasant!";
          break;
        case GameEvent.Damaged:
          message = `${event.from} took ${event.value.dmg} damage`
          break;
        case GameEvent.Healed:
          message = `${event.from} healed ${event.value.heal} HP`
          break;
        case GameEvent.Blocking:
          message = `${event.from} is blocking.`
          break;
        case GameEvent.Connect:
          message = `${event.from} is looking for a challenger!`
          break;
        default:
          message = event;
          break;
      } 
      messageArray.push(message);
    }
    return messageArray;
}

props.setLossFunction(()=>  GameNotifier.broadcastEvent(
    props.username, GameEvent.End, "'s courage faltered!"
  )
);

props.setWinFunction(()=>
  GameNotifier.broadcastEvent(
    props.username, GameEvent.End, " reigned victorious!"
  )
);


  return (
    <main className="menu_main">
      <Leaderboard username={props.username} />
      <div id="websocket-textbox">
        <WebSocketText messages={loadMessages()} />
      </div>
      <MatchSelect username={props.username} setMatchID={props.setMatchID}/>
    </main>
  );
}