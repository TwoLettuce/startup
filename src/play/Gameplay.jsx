import React from "react";
import { Buttons } from "./Buttons";
import { WebSocketText } from './WebSocketText';
import { GameEvent, GameNotifier } from './GameNotifier';
import { Character } from "./Character";
import { Move } from "./Buttons";


export function Gameplay(props) {
    const [playerHealth, setPlayerHealth] = React.useState(props.character.startingHealth());
    const [enemyHealth, setEnemyHealth] = React.useState(props.enemyCharacter.startingHealth());
    const [playerMana, setPlayerMana] = React.useState(props.character.startingMana());
    const [enemyMana, setEnemyMana] = React.useState(props.enemyCharacter.startingMana());
    const [allowMoveSelect, setAllowMoveSelect] = React.useState(true);
    const [enemyBurning, setEnemyBurning] = React.useState(0);
    const [playerBurning, setPlayerBurning] = React.useState(0);
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
            props.setFinalEnemyHealth(enemyHealth);
            props.setGameLost(true);
        } else if (enemyHealth <= 0){
            setEnemyHealth(0);
            props.setFinalPlayerHealth(playerHealth);
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
        let playerHealthChange = 0;
        let enemyHealthChange = 0;
        let enemyMove = generateMove();
        while (!(enemyMove.mana < enemyMana))
            enemyMove = generateMove();
        //player turn
        if (allowMoveSelect && move.mana <= playerMana){
            //setAllowMoveSelect(false);
            GameNotifier.broadcastEvent(props.username, GameEvent.Move, move.name);
            setPlayerMana(playerMana-move.mana);
            if (move.type === 'dmg'){
                if (enemyBurning){
                    enemyHealthChange-=10;
                }
                let hit = Math.floor(Math.random() * 100);
                if (hit < move.accuracy){
                    console.log("move hits!");
                    if (enemyMove.type === "block"){
                        enemyHealthChange-=Math.floor(move.power*.2);
                    } else {
                        enemyHealthChange-=move.power;
                    }
                } else {
                    console.log("oof! miss!");
                }
            } else if (move.type === 'heal'){
                playerHealthChange+=move.power;
            } else if (move.type === 'block') {
                GameNotifier.broadcastEvent(props.username, GameEvent.Blocking, {});
            } else if (move.type === 'hybrid') {
                let hit = Math.floor(Math.random() * 100);
                if (hit < move.accuracy){
                    console.log("move hits!");
                    if (enemyMove.type === "block"){
                        enemyHealthChange-=Math.floor(move.power*.2);
                    } else {
                        enemyHealthChange-=move.power;
                    }
                } else {
                    console.log("oof! miss!");
                }
                playerHealthChange+=move.power*2;
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

        //enemy turn
        
        GameNotifier.broadcastEvent(props.enemyUsername, GameEvent.Move, enemyMove.name);
        setEnemyMana(enemyMana-enemyMove.mana);
        if (enemyMove.type === 'dmg'){
            
            if (playerBurning){
                playerHealthChange-=10;
            }
            let hit = Math.floor(Math.random() * 100);
            if (hit < enemyMove.accuracy){
                console.log("enemy hits!");
                if (move.type === "block"){
                    playerHealthChange-=Math.floor(enemyMove.power*.2);
                } else {
                    playerHealthChange-=enemyMove.power;
                }
            } else {
                console.log("enemy miss!");
            }
        } else if (enemyMove.type === 'heal'){
            enemyHealthChange+=enemyMove.power;
        } else if (enemyMove.type === 'block') {
            GameNotifier.broadcastEvent(props.enemyUsername, GameEvent.Blocking, {});
        } else if (enemyMove.type === 'hybrid') {
            let hit = Math.floor(Math.random() * 100);
            if (hit < enemyMove.accuracy){
                console.log("enemy hits!");
                if (move.type === "block"){
                    playerHealthChange-=Math.floor(enemyMove.power*.2);
                } else {
                    playerHealthChange-=enemyMove.power;
                }
            } else {
                console.log("enemy miss!");
            }
            enemyHealthChange+=enemyMove.power*2;
        } else if (enemyMove.type === 'burn'){
            setPlayerBurning(3);
            console.log("Enemy now burning");
        }
        if (playerBurning) {
            setPlayerBurning(playerBurning-1);
            console.log("Player burned. Burning for " + playerBurning + " more turns.");
        }

        setPlayerHealth(playerHealth + playerHealthChange);
        setEnemyHealth(enemyHealth + enemyHealthChange);
    }

    function generateMove(){
        const moveNo = Math.floor(Math.random() * 4) + 1;
        let move;
        switch (moveNo){
            case 1: 
                if (props.enemyCharacter === Character.Knight)
                    move = new Move("Wide Sweep", "dmg", 10, 100, 0);
                else if (props.enemyCharacter === Character.Wizard)
                    move = new Move("Fireball", "dmg", 15, 75, 8);
                else if (props.enemyCharacter === Character.Dragon)
                    move = new Move("Scratch", "dmg", 5, 100, 0);
                break;
            case 2:
                if (props.enemyCharacter === Character.Knight)
                    move = new Move("Corageous Charge", "dmg", 16, 85, 0);
                else if (props.enemyCharacter === Character.Wizard)
                    move = new Move("Eldritch Blast", "dmg", 20, 50, 20);
                else if (props.enemyCharacter === Character.Dragon)
                    move = new Move("Breathe Fire", "burn", 0, 100, 0);
                break;
            case 3:
                if (props.enemyCharacter === Character.Knight)
                    move = new Move("Raise Shield", "block");
                else if (props.enemyCharacter === Character.Wizard)
                    move = new Move("Mana Barrier", "block", 0, 0, 5);
                else if (props.enemyCharacter === Character.Dragon)
                    move = new Move("Flying Strike", "dmg", 10, 80, 5);
                break;
            case 4:
                if (props.enemyCharacter === Character.Knight)
                    move = new Move("Faithful Appeal", "heal", 10, 0, 5);
                else if (props.enemyCharacter === Character.Wizard)
                    move = new Move("Siphon Life", "hybrid", 5, 100, -5);
                else if (props.enemyCharacter === Character.Dragon)
                    move = new Move("Stomp", "dmg", 12, 70, 0);
                break;
        }
        return move;
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