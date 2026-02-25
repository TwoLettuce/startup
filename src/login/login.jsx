import React from 'react';
import "./login.css";
import { AuthState } from './authState'
import { Authenticated } from './Authenticated'
import { Unauthenticated } from './Unauthenticated'

export function Login({username, authState, onAuthChange}) {
  
  return (
    <main className="login_main">
      <section id="login-UI">
        <h2><u>Raise your Sword!</u></h2>
        {authState === AuthState.Authenticated && 
          <Authenticated username = {username} onLogout = {() => 
            onAuthChange('', '', AuthState.Unauthenticated)}
          />
        }
        {authState === AuthState.Unauthenticated && 
          <Unauthenticated username = {username} onLogin={(loginUsername, loginPassword) => 
            {
              onAuthChange(loginUsername, loginPassword, AuthState.Authenticated)
            }}
          />
        }
        
      </section>
      <GameDeals />
    </main>
  );
}

//to be replaced with external API call
function GameDeals(){
  return (
    <section id="deals">
      <h3>Current deals:</h3>
      <div id="game-shark">
        <p>placeholder for current deals on videogames</p>
        <p>courtesy of CheapShark API</p>
      </div>
    </section>
  );
}