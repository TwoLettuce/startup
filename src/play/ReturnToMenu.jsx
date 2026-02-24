import React from 'react';
import { useNavigate } from 'react-router-dom';


export function ReturnToMenu(){
    const navigate = useNavigate();
    return (
        <div className="post_game_button" >
            <button onClick={()=>navigate('/menu')}>Return to Menu</button>
        </div>
    )
}