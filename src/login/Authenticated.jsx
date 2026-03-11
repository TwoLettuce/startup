import React from "react";
import { useNavigate } from 'react-router-dom';
import { MessageDialog } from "./MessageDialogue";

export function Authenticated(props){
    const [httpError, setHttpError] = React.useState(null);

    const navigate = useNavigate();

    async function logout() {
        const response = await fetch('/api/session', {
            method: 'delete',
        });
        if (response?.status !== 204){
            const body = await response.json();
            setHttpError(`⚠ Error: ${body.msg}`);
            localStorage.removeItem('username');
            props.onLogout();
        } else {
            localStorage.removeItem('username');
            props.onLogout();
        }

    }

    return (
        <>
            <button className="login_button" type="create" onClick={()=>navigate('/menu')}>
                Play
            </button>
            <button className="login_button" type="create" onClick={()=>logout()}>
                Logout
            </button>
            
            <MessageDialog message={httpError} onHide={() => setHttpError(null)} />
        </>
    )
}