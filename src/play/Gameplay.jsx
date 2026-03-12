import React from "react";
import { Buttons } from "./Buttons";
import { WebSocketText } from './WebSocketText';
import { GameEvent, GameNotifier } from './GameNotifier';


export function Gameplay(props) {
    const [playerHealth, setPlayerHealth] = React.useState(props.character.startingHealth());
    const [enemyHealth, setEnemyHealth] = React.useState(props.enemyCharacter.startingHealth());
    const [playerMana, setPlayerMana] = React.useState(props.character.startingMana());
    const [enemyMana, setEnemyMana] = React.useState(props.enemyCharacter.startingMana());
    const [allowMoveSelect, setAllowMoveSelect] = React.useState(true);
    const [enemyBurning, setEnemyBurning] = React.useState(0);
    const [events, setEvent] = React.useState([]);

    const playerHPRef = React.useRef(playerHealth);
    const enemyHPRef = React.useRef(enemyHealth);

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
                default:
                    message = 'unknown';
                    break;
            } 

            messageArray.push(
                message
            );
        }
        return messageArray;
    }
    
    React.useEffect(()=> {
        if (playerHealth <= 0) {
            setPlayerHealth(0);
            props.setGameLost(true);
        } else if (enemyHealth <= 0){
            setEnemyHealth(0);
            props.setGameWon(true);
        }

        const playerHealthDif = playerHPRef.current-playerHealth;
        const enemyHealthDif = enemyHPRef.current-enemyHealth;

        if (playerHealthDif > 0){
            GameNotifier.broadcastEvent(props.username, GameEvent.Damaged, {dmg: playerHealthDif})
        } else if (playerHealthDif < 0) {
            GameNotifier.broadcastEvent(props.username, GameEvent.Healed, {heal: -1*playerHealthDif})
        }

        if (enemyHealthDif > 0){
            GameNotifier.broadcastEvent(props.enemyUsername, GameEvent.Damaged, {dmg: enemyHealthDif})
        } else if (enemyHealthDif < 0) {
            GameNotifier.broadcastEvent(props.enemyUsername, GameEvent.Healed, {heal: -1*enemyHealthDif})
        }
        playerHPRef.current = playerHealth;
        enemyHPRef.current = enemyHealth;
    },
    [playerHealth, enemyHealth]
    );
    
    React.useEffect(()=> {
            GameNotifier.addHandler(handleGameEvent);
            GameNotifier.broadcastEvent(props.username, GameEvent.Select, {});
            GameNotifier.broadcastEvent(props.enemyUsername, GameEvent.Select, {});
            return ()=>{GameNotifier.removeHandler(handleGameEvent)};
        },
        []
    );

    function onPressed(move) {
        if (allowMoveSelect && move.mana <= playerMana){
            //setAllowMoveSelect(false);
            GameNotifier.broadcastEvent(props.username, GameEvent.Move, move.name);
            setPlayerMana(playerMana-move.mana);
            if (move.type === 'dmg'){
                let damage = move.power;
                if (enemyBurning){
                    damage += 10;
                }
                let hit = Math.floor(Math.random() * 100);
                if (hit < move.accuracy){
                    console.log("move hits!");
                    setEnemyHealth(enemyHealth-damage);
                } else {
                    console.log("oof! miss!");
                }
            } else if (move.type === 'heal'){
                setPlayerHealth(playerHealth+move.power);
            } else if (move.type === 'block') {
                GameNotifier.broadcastEvent(props.username, GameEvent.Blocking, {});
            } else if (move.type === 'hybrid') {
                let hit = Math.floor(Math.random() * 100);
                if (hit < move.accuracy){
                    console.log("move hits!");
                    setEnemyHealth(enemyHealth-move.power);
                } else {
                    console.log("oof! miss!");
                }
                setPlayerHealth(playerHealth+move.power*2);
            } else if (move.type === 'burn'){
                setEnemyBurning(3);
                console.log("Enemy now burning");
            }
            if (enemyBurning) {
                setEnemyBurning(enemyBurning-1);
                console.log("Enemy burned. Burning for " + enemyBurning + " more turns.");
            }
        } else if (playerMana < move.mana) {
            GameNotifier.broadcastEvent(props.username, GameEvent.Mana);
        }

        doEnemyTurn();
    }

    function doEnemyTurn(){
        const moveNo = Math.floor(Math.random() * 4) + 1;
        switch (moveNo){
            default: console.log("enemy turn taken");
        }
    }

    return (
        <samp>
            <section id="character-info">
                <section id="player1">
                    <div>
                    <h5><b>{props.username}: {props.character.toString()}</b></h5>
                    </div>
                    <div>
                    <img className="player_graphic" alt="Knight with sword" width={250} height={250} src={props.character.getImage()}/>
                    </div>
                    <div>HP: {playerHealth}/{props.character.startingHealth()}</div>
                    <div>MP: {playerMana}/{props.character.startingMana()}</div>
                </section>
                <div id="websocket-textbox">
                    <WebSocketText messages={loadMessages()} />
                </div>
                <section id="player2">
                    <div>
                    <h5><b>{props.enemyUsername}: {props.enemyCharacter.toString()}</b></h5>
                    </div>
                    <div>
                        <img className="player_graphic" alt="Vector art of a dragon" width={250} height={250} src={props.enemyCharacter.getImage()}></img>
                    </div>
                    <div>HP: {enemyHealth}/{props.enemyCharacter.startingHealth()}</div>
                    <div>MP: {enemyMana}/{props.enemyCharacter.startingMana()}</div>
                </section>
            </section>
            <section id="gameplay-buttons">
                <Buttons character={props.character} onPressed={onPressed}/>
            </section>
        </samp>
    );
}