import React from 'react';

export function Leaderboard(){
    return (
        <section id="leaderboard">
            <h4>Leaderboard</h4>
            <div>
                <b>Search: </b>
                <input id='leaderboard_search' type="search" placeholder="username"/>
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
    )
    
}