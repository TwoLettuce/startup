import React from "react";
import { MessageDialog } from "./MessageDialogue";

export function Unauthenticated(props){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [httpError, setHttpError] = React.useState('');

    function loginUser() {
        loginOrRegister('/api/session');
    }

    function registerUser() {
        loginOrRegister('/api/user');
    }

    async function loginOrRegister(path){
        const response = await fetch(path, {
            method: 'post',
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });
        if (response?.status !== 200){
            const body = await response.json();
            setHttpError(`⚠ Error: ${body.msg}`);
        } else {
            const body = await response.json();
            localStorage.setItem('username', body.username);
            props.onLogin(username);
        }

    }

    return (
        <section>
            <div id="username">
                Username: 
                <input type="text" placeholder="Username" value={username} onChange={(input)=> setUsername(input.target.value)} required/>
            </div>
            <div id="password">
                Password: 
                <input type="password" placeholder="Password" value={password} onChange={(input)=> setPassword(input.target.value)}required/>
            </div>
            <form method="get" action="menu">
                <button className="login_button" type="button" onClick={()=>loginUser()} disabled={(!username || !password)}>
                    Login
                </button>
                <button className="login_button" type="button" onClick={()=>registerUser()} disabled={(!username || !password)}>
                    Register
                </button>
            </form>

            <MessageDialog message={httpError} onHide={() => setHttpError(null)} />
        </section>
    )
}

