import React from 'react';
import "./login.css";
import { AuthState } from './authState'
import { Authenticated } from './Authenticated'
import { Unauthenticated } from './Unauthenticated'

export function Login(props) {
  const [deals, setDeals] = React.useState([]);

  React.useEffect(()=>{
    async function getGameDeals(){
      const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
      const data = await response.json();
      console.log("Retry in " + response.headers);
      console.log(data);
      return data;
    }

    fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15")
      .then(async (response) => {
        if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        console.log("Rate limited. Retry after:", retryAfter, "seconds");
        return;
        }
        return await response.json();
      })
      .then(data => setDeals(data))
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

