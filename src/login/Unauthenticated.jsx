import React from "react";

export function Unauthenticated(props){
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

    async function loginUser() {
        localStorage.setItem('username', username);
        props.onLogin(username);
    }

    async function registerUser() {
        localStorage.setItem('username', username);
        props.onLogin(username);
    }

    return (
        <>
            <div id="username">
                Username: 
                <input type="text" placeholder="Username" value={username} onChange={(input)=> setUsername(input.target.value)} required/>
            </div>
            <div id="password">
                Password: 
                <input type="password" placeholder="Password" value={password} onChange={(input)=> setPassword(input.target.value)}required/>
            </div>
            <form method="get" action="menu">
                <button className="login_button" type="create" onClick={()=>loginUser()} disabled={(!username || !password)}>
                    Login
                </button>
                <button className="login_button" type="create" onClick={()=>registerUser()} disabled={(!username || !password)}>
                    Register
                </button>
            </form>
        </>
    )
}