import React from 'react';
import "./play.css"
import { CharacterSelect } from './CharacterSelect';
import { Gameplay } from './Gameplay';
import { Defeat } from './Defeat';
import { Victory } from './Victory';
import { useNavigate } from 'react-router-dom';

export function Play(props) {
    const navigate = useNavigate();

    const [character, setCharacter] = React.useState('none');
    const [enemyUsername, setEnemyUsername] = React.useState('Dr. Jensen');
    const [enemyCharacter, setEnemyCharacter] = React.useState('none');
    const [confirmed, setConfirmed] = React.useState(false);
    const [gameWon, setGameWon] = React.useState(false);
    const [gameLost, setGameLost] = React.useState(false);
    const [finalPlayerHealth, setFinalPlayerHealth] = React.useState(0);
    const [finalEnemyHealth, setFinalEnemyHealth] = React.useState(0);
    

    async function resignConfirmation(){
        if (confirm('Are you sure you want to resign?')){
            const response = await fetch('/api/result', {
                method: 'put',
                body: JSON.stringify({victor: false, matchID: props.matchID}),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            navigate('/menu');
        }
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
                    setGameLost={setGameLost}
                    setFinalPlayerHealth={setFinalPlayerHealth}
                    setFinalEnemyHealth={setFinalEnemyHealth}
                    />
                    <div id="resign-button">
                        <button onClick={resignConfirmation} id="resign">Resign game</button>
                    </div>
                </div>
            }
            {gameWon && <Victory victor={true} matchID={props.matchID} finalPlayerHealth={finalPlayerHealth} finalEnemyHealth={finalEnemyHealth} />}
            {gameLost && <Defeat victor={false} matchID={props.matchID} finalPlayerHealth={finalPlayerHealth} finalEnemyHealth={finalEnemyHealth} />}
            
        </main>
    );
}