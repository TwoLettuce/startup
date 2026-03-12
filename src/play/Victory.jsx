import React from "react";
import { ReturnToMenu } from './ReturnToMenu'
export function Victory(props){

    return (
        <div>
            <h2 className='victory_text'>
                You Win!
            </h2>
            <ReturnToMenu victor={props.victor} matchID={props.matchID}/>
        </div>
    )
}