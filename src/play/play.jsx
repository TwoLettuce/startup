import React from 'react';
import "./play.css"
import { CharacterSelect } from './CharacterSelect';
import { Gameplay } from './Gameplay';
import { Defeat } from './Defeat';
import { Victory } from './Victory';

export function Play(props) {
    const [character, setCharacter] = React.useState('none');
    const [enemyUsername, setEnemyUsername] = React.useState('Dr. Jensen');
    const [enemyCharacter, setEnemyCharacter] = React.useState('none');
    const [confirmed, setConfirmed] = React.useState(false);
    const [gameWon, setGameWon] = React.useState(false);
    const [gameLost, setGameLost] = React.useState(false);

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
            {confirmed && !gameLost && !gameWon &&
                <div>
                    <Gameplay username={props.username} 
                    character={character} 
                    enemyCharacter={enemyCharacter} 
                    enemyUsername={enemyUsername}
                    setGameWon={setGameWon}
                    setGameLost={setGameLost} />
                    <div id="resign-button">
                        <form onClick={resignConfirmation()} method="delete" action="menu">
                            <button id="resign">Resign game</button>
                        </form>
                    </div>
                </div>
            }
            {gameWon && <Victory />}
            {gameLost && <Defeat />}
            
        </main>
    );
}