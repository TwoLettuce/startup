import React from 'react';
import "./login.css";
import { AuthState } from './authState'
import { Authenticated } from './Authenticated'
import { Unauthenticated } from './Unauthenticated'

export function Login(props) {


  return (
    <main className="login_main">
      <section id="login-UI">
        <h2><u>Raise your Sword!</u></h2>
        {props.authState === AuthState.Authenticated && 
          <Authenticated username = {props.username} 
          onLogout={()=>props.onAuthChange('', AuthState.Unauthenticated)}
          />
        }
        {(props.authState === AuthState.Unauthenticated || !props.authState) && 
          <Unauthenticated 
          username = {props.username} 
          onLogin={(loginUsername)=>props.onAuthChange(loginUsername, AuthState.Authenticated)}
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