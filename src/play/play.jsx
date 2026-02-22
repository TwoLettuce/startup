import React from 'react';
import "./play.css"
import { CharacterSelect } from './CharacterSelect';
import { Gameplay } from './Gameplay'

export function Play() {
    const [character, setCharacter] = React.useState('none');

    function resignConfirmation(){
        return (
            ()=>confirm('Are you sure you want to resign?')
        )
    }

    return (
        <main>
            {character === 'none' && 
                <CharacterSelect />
            }
            {character !== 'none' && 
                <Gameplay />
            }
            <div id="resign-button">
                <form onClick={resignConfirmation()} method="delete" action="menu">
                    <button id="resign">Resign game</button>
                </form>
            </div>
    </main>
    );
}