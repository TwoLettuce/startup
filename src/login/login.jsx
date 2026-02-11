import React from 'react';
import "./login.css";

export function Login() {
  return (
    <main>
      <section id="login-UI">
        <h2><u>Raise your Sword!</u></h2>
        <div id="username">
        Username: <input type="text" placeholder="Username" required/>
        </div>
        <div id="password">
        Password: <input type="password" placeholder="Password" required/>
        </div>
        <form method="get" action="menu.html">
          <button type="create">Login</button>
          <button type="create">Register</button>
        </form>
      </section>
      <section id="deals">
        <h3>Current deals:</h3>
        <div id="game-shark">
          <p>placeholder for current deals on videogames</p>
          <p>courtesy of CheapShark API</p>
        </div>
      </section>
    </main>
  );
}