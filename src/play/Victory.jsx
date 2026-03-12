import React from "react";
import { ReturnToMenu } from './ReturnToMenu'
export function Victory(props){

    return (
        <div>
            <h2 className='victory_text'>
                You Win!
            </h2>
            <div className="health_indicator">
                <p>Your health: {props.finalPlayerHealth}</p>
                <p>Enemy health: {props.finalEnemyHealth}</p>
            </div>
            <ReturnToMenu victor={props.victor} matchID={props.matchID}/>
        </div>
    )
}