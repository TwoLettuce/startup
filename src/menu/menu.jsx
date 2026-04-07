import React from 'react';
import "./menu.css";
import { Leaderboard } from './Leaderboard';
import { MatchSelect } from './MatchSelect';
import { WebSocketText } from '../play/WebSocketText';
import { EventMessage, GameEvent, GameNotifier } from '../play/GameNotifier'

export function Menu(props) {
  const [events, setEvent] = React.useState([]);


  React.useEffect(()=> {
          GameNotifier.addHandler(handleGameEvent);
          GameNotifier.broadcastEvent(props.username, GameEvent.Connect, {});
          GameNotifier.receiveEvent(new EventMessage('system', GameEvent.System, "You are connected!"));


          const lossFunction = () => {
            console.log("bruh!!!");
            return () => GameNotifier.broadcastEvent(
              props.username, GameEvent.End, "'s courage faltered!"
            );
          };

          const winFunction = () => {
            console.log("bruh!!!");
            return () => GameNotifier.broadcastEvent(
              props.username, GameEvent.End, " reigned victorious!"
            );
          };

          props.setLossFunction(lossFunction);

          props.setWinFunction(winFunction);

          return ()=>{GameNotifier.removeHandler(handleGameEvent)};
      },
      []
  );

  function handleGameEvent(event) {
      if (event.type !== GameEvent.System && event.type !== GameEvent.Connect && event.type !== GameEvent.End){
        return;
      }
      setEvent((prevEvents) => {
        
        let newEvents = [event, ...prevEvents];
        if (newEvents.length > 15) {
            newEvents = newEvents.slice(0, 15);
        }
        return newEvents;
      });
  }

  function loadMessages() {
    const messageArray = [];
    for (const [, event] of events.entries()) {
      let message;
      switch (event.type){
        case GameEvent.End:
          if (event.from == props.username){
            message = `${'You'}${event.value}`
          }
          message = `${event.from}${event.value}`;
          break;
        case GameEvent.System:
          message = event.value;
          break;
        case GameEvent.Connect:
          message = `${event.from} is looking for a challenger!`
          break;
        default:
          continue;          
      } 
      messageArray.push(message);
    }
    return messageArray;
}

  


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