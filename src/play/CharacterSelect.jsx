import React from "react";
import './characterSelect.css'
import {Character} from './Character'

export function CharacterSelect(props){
    const [selected, setSelected] = React.useState('false');
    function characterSelected(character){
        props.setCharacter(character);
        props.setEnemyCharacter(Character.Wizard);
        setSelected(true);
    } 

    return (
        <section className='characterSelect'>
            <div className='characters'>
                <img src={null} />
            </div>
            <div className='selectors'>
                <button className="selector_button" type="create" onClick={()=>characterSelected(Character.Knight)}>
                    Knight
                </button>
                <button className="selector_button" type="create" onClick={()=>characterSelected(Character.Wizard)}>
                    Wizard
                </button>
                <button className="selector_button" type="create" onClick={()=>characterSelected(Character.Dragon)}>
                    Dragon
                </button>
            </div>
            {selected === true && (
                <div className="confirmation">
                    <h5>You've selected: {props.character.toString()}</h5>
                    <button className="confirmation_button" type="create" onClick={props.setConfirmed}>
                        Confirm
                    </button>
                </div>
            )}
            
        </section>
    )
}