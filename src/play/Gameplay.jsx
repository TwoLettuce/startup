import React from "react";
import { Buttons } from "./Buttons"

export function Gameplay(props) {
    const [playerReady, setPlayerReady] = React.useState(false);
    const [enemyReady, setEnemyReady] = React.useState(false);
    const [playerHealth, setPlayeHealth] = React.useState(props.character.startingHealth());
    const [enemyHealth, setEnemyHealth] = React.useState(props.enemyCharacter.startingHealth());
    const [playerMana, setPlayerMana] = React.useState(props.character.startingMana());
    const [enemyMana, setEnemyMana] = React.useState(props.enemyCharacter.startingMana());
    const [allowMoveSelect, setAllowMoveSelect] = React.useState(false);

    class move {
        constructor(name, type, power=0, accuracy=0, mana=0){
            this.name=name;
            this.type=type;
            this.power=power;
            this.accuracy=accuracy;
            this.mana=mana;
        }
        log(){
            console.log(props.username + "has made the move " + this.type);
        }
    }

    function onPressed(move) {
        if (allowMoveSelect && mana <= playerMana){
            setAllowMoveSelect(false);
            GameNotifier.BroadcastEvent(username)
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
                <textarea readOnly rows="3" cols={40} placeholder="Waiting for character select...&#13;You have selected your character!&#13;Opponent has selected their character!&#13;Waiting for move...&#13;Opponent has selected their move!"></textarea>
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
            <Buttons character={props.character}/>
        </section>
    </samp>
    );
}