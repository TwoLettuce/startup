import React from "react";
import './characterSelect.css'

export function CharacterSelect(props){


    return (
        <section className='characterSelect'>
            <div className='characters'>
                <img src={null} />


            </div>
            <div className='selectors'>
                <button className="selector_button" type="create" onClick={()=>logout()}>
                    Knight
                </button>
                <button className="selector_button" type="create" onClick={()=>logout()}>
                    Wizard
                </button>
                <button className="selector_button" type="create" onClick={()=>logout()}>
                    Dragon
                </button>
            </div>
            <button className="character_confirmation_button" type="create">Confirm</button>
        </section>
    )
}