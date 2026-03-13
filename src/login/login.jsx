import React from 'react';
import "./login.css";
import { AuthState } from './authState'
import { Authenticated } from './Authenticated'
import { Unauthenticated } from './Unauthenticated'

export function Login(props) {
  const [quack, setQuack] = React.useState([]);

  React.useEffect(()=>{
    fetch('/api/duck')
      .then(async (response) => {
        return await response.json();
      })
      .then(data => {
        console.log(data);
        setQuack({
          msg:data.message,
          url:data.url});
      })
      .catch(err => {
        console.log(err);
        setQuack('https://random-d.uk/api/411.JPG');
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
        <h3>Website Mascott:</h3>
        <div id="quack">
          <img className="duck" src={quack.url}/>
          <p>{quack.msg}</p>
        </div>
      </section>
    );
  }
}

