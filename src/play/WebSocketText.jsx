import React from 'react';
//{props.messages}
export function WebSocketText(props){
    function parseMessages(messages){
        let text = '';
        for (const message of messages){
            text = text + message + "\n";
        }

        return text;
    }
    return (
        <textarea name="websocket" readOnly rows="3" cols={40} value={parseMessages(props.messages)} />
    )
}