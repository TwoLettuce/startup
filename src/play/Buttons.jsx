import React from "react";
import { Character } from "./Character";

export class Move {
        constructor(name, type, power=0, accuracy=0, mana=0){
            this.name=name;
            this.type=type;
            this.power=power;
            this.accuracy=accuracy;
            this.mana=mana;
        }
        log(){
            console.log(props.username + "has made the move " + this.type);
        }
    }

export function Buttons(props){
    

    function knightButtons(){
        return (
            <div className="container">
                <button className="play_button" onClick={()=>props.onPressed(new Move("Wide Sweep", "dmg", 10, 100, 0))}>
                    <h4>Wide Sweep</h4>
                    Accuracy: 100%  Power: 10  Mana: 0
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Corageous Charge", "dmg", 16, 85, 0))}>
                    <h4>Courageous Charge</h4>
                    Accuracy: 85%  Power: 16  Mana: 0
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Raise Shield", "block"))}>
                    <h4>Raise Shield</h4>
                    Block 80% of incoming physical damage
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Faithful Appeal", "heal", 10, 0, 5))}>
                    <h4>Faithful Appeal</h4>
                    Heal 10 HP. If you took no damage this turn, heal another 10
                </button>
            </div>
        )
    }

    function wizardButtons(){
        return (
            <div className="container">
                <button className="play_button" onClick={()=>props.onPressed(new Move("Fireball", "dmg", 15, 75, 8))}>
                    <h4>Fireball</h4>
                    Accuracy: 75%  Power: 15  Mana: 8
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Eldritch Blast", "dmg", 20, 50, 20))}>
                    <h4>Eldritch Blast</h4>
                    Accuracy: 50%  Power: 20  Mana: 20
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Mana Barrier", "block", 0, 0, 5))}>
                    <h4>Mana Barrier</h4>
                    Mana: 5&#13;
                    Block 85% of incoming physical damage
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Siphon Life", "hybrid", 5, 100, -5))}>
                    <h4>Siphon Life</h4>
                    Accuracy: 100%  &#13;
                    Deal 5 damage and recover 10 HP and 5 MP
                </button>
            </div>
        )
        
    }

    function dragonButtons(){
        return (
            <div className="container">
                <button className="play_button" onClick={()=>props.onPressed(new Move("Scratch", "dmg", 5, 100, 0))}>
                    <h4>Scratch</h4>
                    Accuracy: 100%  Power: 5  Mana: 0
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Breathe Fire", "burn", 0, 100, 0))}>
                    <h4>Breathe Fire</h4>
                    Accuracy: 100% Enemy will take 10 dmg per turn for 3 turns.
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Flying Strike", "dmg", 10, 80, 5))}>
                    <h4>Flying Strike</h4>
                    Accuracy: 80% Power: 10 Mana: 5
                    Take no damage this turn
                </button>
                <button className="play_button" onClick={()=>props.onPressed(new Move("Stomp", "dmg", 12, 70, 0))}>
                    <h4>Stomp</h4>
                    Accuracy: 70% Power: 12 Mana: 0
                </button>
            </div>
        )
    }

    

    return (
        <div>
            {props.character === Character.Knight && (knightButtons()) }
            {props.character === Character.Wizard && (wizardButtons()) }
            {props.character === Character.Dragon && (dragonButtons()) }
        </div>
    )
}