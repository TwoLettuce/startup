import React from "react";
import { useNavigate } from 'react-router-dom';

export function Authenticated(props){
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <>
            <button className="login_button" type="create" onClick={()=>navigate('/menu')}>
                Play
            </button>
            <button className="login_button" type="create" onClick={()=>logout()}>
                Logout
            </button>
        </>
    )
}