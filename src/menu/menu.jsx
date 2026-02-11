import React from 'react';
import "./menu.css";

export function Menu() {
  return (
    <main>
    <section id="identifier">
      
    </section>
    <section id="leaderboard">
      <label for="leaderboard">Leaderboard</label>
      <div>
      <label for="leaderboard search">Search: </label>
      <input type="search" placeholder="username"/>
      </div>
      <div>
        <table>
          <thead>
            <th>Ranking</th>
            <th>Name</th>
            <th>W/L</th>
          </thead>
          <thead>
            <td>#1</td>
            <td>nerdslayer</td>
            <td>68W/1L</td>
          </thead>
          <thead>
            <td>#2</td>
            <td>tryhard</td>
            <td>60W/42L</td>
          </thead>
          <thead>
            <td>#3</td>
            <td>theLegend27</td>
            <td>27W/27L</td>
          </thead>
          <thead>
            <td>#4</td>
            <td>trevor</td>
            <td>2W/75L</td>
          </thead>
        </table>
      </div>
    </section>
    <section id="matches">
      <label for="matches">Matches</label>
      <div>
        <label for="match search">Search: </label>
        <input type="search" pattern="[0-9]*" placeholder="Match ID"/>
      </div>
      <div>
        <table>
          <thead>
            <th>Match ID</th>
            <th>Match Name</th>
            <th>Player 1</th>
            <th>Player 2</th>
          </thead>
          <thead>
            <td>43</td>
            <td>Treehouse</td>
            <td>nerdslayer</td>
            <td>Empty</td>
          </thead>
          <thead>
            <td>46</td>
            <td>freewins</td>
            <td>tryhard</td>
            <td>steve</td>
          </thead>
          <thead>
            <td>47</td>
            <td>wizonly</td>
            <td>nerdslayer</td>
            <td>Empty</td>
          </thead>
          <thead>
            <td>52</td>
            <td>match78</td>
            <td>trevor</td>
            <td>new guy</td>
          </thead>
        </table>
      </div>
    
    <form method="get" action="play.html">
        <button type="join">Join Match</button>
      </form>
    
    <div>
      <form method="get" action="play.html">
        <button type="join">Create Match</button>
      </form>
    </div>
    </section>
  </main>
  );
}