import React from 'react';

export function Defeat(props){
     return (
        <div>
            <h2 className='defeat_text'>
                You Lose!
            </h2>
            <ReturnToMenu victor={props.victor} matchID={props.matchID}/>
        </div>
    )
}