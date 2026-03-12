import React from 'react';
import "./login.css";
import { AuthState } from './authState'
import { Authenticated } from './Authenticated'
import { Unauthenticated } from './Unauthenticated'

export function Login(props) {
  const [deals, setDeals] = React.useState([]);

  React.useEffect(()=>{

    fetch('/api/deals')
      .then(async (response) => {
        return await response.json();
      })
      .then(data => {
        console.log(data);
        setDeals(data)})
      .catch(err => {
        console.log(err);
        setDeals([]);
      });
  },[]);
  

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

  //to be replaced with external API call
  function GameDeals(){

    return (
      <section id="deals">
        <h3>Current deals on Steam:</h3>
        <div id="game-shark">
          {deals && deals.length > 0 ? (
            <ul>
              {deals.slice(0, 5).map(d => (
                <li key={d.dealID}>
                  {d.title} - ${d.salePrice}
                </li>
              ))}
            </ul>
          ) : (
            <p>No deals found. Try again later.</p>
          )}
          <p>courtesy of CheapShark API</p>
        </div>
      </section>
    );
  }
}

