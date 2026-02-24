import React from 'react';

export function WebSocketText(props){
    return (
        <textarea readOnly rows="3" cols={40}>
            {props.messages}
        </textarea>
    )
}