import React from 'react';

export function WebSocketText(props){
    return (
        <textarea readOnly rows="3" cols={40}>
            "Waiting for character select...
            &#13;You have selected your character!
            &#13;Opponent has selected their character!
            &#13;Waiting for move...
            &#13;Opponent has selected their move!"
        </textarea>
    )
}