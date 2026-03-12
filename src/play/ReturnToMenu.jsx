import React from 'react';
import { useNavigate } from 'react-router-dom';


export function ReturnToMenu(props){
    const navigate = useNavigate();

    async function updateWinsAndLosses(){
        await fetch('/api/result', {
            method: 'put',
            body: JSON.stringify({victor: props.victor, matchID: props.matchID}),
            headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        navigate('/menu');
    }
    
    return (
        <div className="post_game_button" >
            <button onClick={()=>updateWinsAndLosses()}>Return to Menu</button>
        </div>
    )
}