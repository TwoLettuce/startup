import React from 'react';
import { ReturnToMenu } from './ReturnToMenu';

export function Defeat(props){
     return (
        <div>
            <h2 className='defeat_text'>
                You Lose!
            </h2>
            <p>Your health: {props.finalPlayerHealth}</p>
            <p>Enemy health: {props.finalEnemyHealth}</p>s
            <ReturnToMenu victor={props.victor} matchID={props.matchID}/>
        </div>
    )
}