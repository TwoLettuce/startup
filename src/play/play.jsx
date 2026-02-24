import React from 'react';
import "./play.css"
import { CharacterSelect } from './CharacterSelect';
import { Gameplay } from './Gameplay'

export function Play(props) {
    const [character, setCharacter] = React.useState('none');
    const [enemyCharacter, setEnemyCharacter] = React.useState('none');
    const [confirmed, setConfirmed] = React.useState(false)

    function resignConfirmation(){
        return (
            ()=>confirm('Are you sure you want to resign?')
        )
    }

    return (
        <main>
            {!confirmed && 
                <CharacterSelect character={character} 
                setCharacter={setCharacter} 
                setEnemyCharacter={setEnemyCharacter} 
                setConfirmed={setConfirmed} />
            }
            {confirmed && 
                <Gameplay username={props.username} character={character} enemyCharacter={enemyCharacter} />
            }
            <div id="resign-button">
                <form onClick={resignConfirmation()} method="delete" action="menu">
                    <button id="resign">Resign game</button>
                </form>
            </div>
    </main>
    );
}