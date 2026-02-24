import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Menu } from './menu/menu';
import { Play } from './play/play';
import { AuthState } from './login/authState'

const NAVBAR_ROUTES = ['/login', '/play', '/menu'];

export default function App() {
    const [username, setUsername] = React.useState(localStorage.getItem('username'));
    const [authState, setAuthState] = React.useState(username ? AuthState.Authenticated : AuthState.Unauthenticated);

    return (
      <BrowserRouter>
        <div className="body bg-dark text-light">
            <header>
            <img className="logo" src="darkageduels.svg" alt="Dark Age Duels"/>
            <nav>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li className="home"><NavLink to="login" className="nav-link px-2 link-dark">Home</NavLink></li>
                {authState === AuthState.Authenticated && 
                    (<li className="menu">
                        <NavLink to="menu" className="nav-link px-2 link-dark">
                            Menu
                        </NavLink>
                    </li>)}
                {authState === AuthState.Authenticated && (
                    <li className="play">
                        <NavLink to="play" className="nav-link px-2 link-dark">
                            Play
                        </NavLink>
                    </li>)}
                </ul>
            </nav>
            {authState == AuthState.Authenticated && (
                <div>
                    <h3><b>Logged in as: {username}</b></h3>
                </div>
            )}
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/login' element={
                    <Login 
                        username = {username}
                        authState = {authState}
                        onAuthChange={(username, authState) => {
                            setAuthState(authState)
                            setUsername(username);
                        }}
                    />} exact />
                <Route path='/menu' element={<Menu />} exact />
                <Route path='/play' element={<Play username={username} />} exact />
                <Route path='*' element={<NotFound />} exact />
            </Routes>

            <footer>
                <a href="https://github.com/TwoLettuce/startup">Author's (Grant Harris's) github</a>
            </footer>
        </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}