import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Unauthenticated(props){
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');
    const [httpError, setHttpError] = React.useState(null);

    async function loginUser() {
        loginOrRegister('/api/session');
        localStorage.setItem('username', username);
        props.onLogin(username);
    }

    async function registerUser() {
        loginOrRegister('/api/user');
        localStorage.setItem('username', username);
        props.onLogin(username);
    }

    function loginOrRegister(path){
        const res = fetch(path, {
            method: 'post',
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });
        if (res?.status !== 200){
            const body = response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        } else {
            localStorage.setItem('username', username);
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
                <button className="login_button" type="create" onClick={()=>loginUser()} disabled={(!username || !password)}>
                    Login
                </button>
                <button className="login_button" type="create" onClick={()=>registerUser()} disabled={(!username || !password)}>
                    Register
                </button>
            </form>

            <MessageDialog message={httpError} onHide={() => setHttpError(null)} />
        </section>
    )
}

function MessageDialog(props) {
    return (
    <Modal {...props} show={props.message} centered>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}