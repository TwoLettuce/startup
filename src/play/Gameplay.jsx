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
    let gameMessages = [];
    

    function onPressed(move) {
        if (allowMoveSelect && move.mana <= playerMana){
            //setAllowMoveSelect(false);
            //GameNotifier.BroadcastEvent(username)
            setPlayerMana(playerMana-move.mana);
            if (move.type === 'dmg'){
                let hit = Math.floor(Math.random() * 100);
                if (hit < move.accuracy){
                    console.log("move hits!");
                    setEnemyHealth(enemyHealth-move.power);
                } else {
                    console.log("oof! miss!");
                }
            } else if (move.type === 'heal'){
                setPlayerHealth(playerHealth+move.power);
            } else if (move.type === 'block') {
                ;
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
                setEnemyHealth(enemyHealth-10);
                setEnemyBurning(enemyBurning-1);
                console.log("Enemy burned. Burning for " + enemyBurning + " more turns.");
            }
        }
        if (playerHealth <= 0) {
            setPlayerHealth(0);
            props.setGameLost(true);
        } else if (enemyHealth <= 0){
            setEnemyHealth(0);
            props.setGameWon(true);
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
                <WebSocketText />
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