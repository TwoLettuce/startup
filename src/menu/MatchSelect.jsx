import React from 'react';

export function MatchSelect(){
    return (
        <section id="matches">
            <label>Matches</label>
            <div>
            <label>Search: </label>
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
            
            <form method="get" action="play">
                <button type="join">Join Match</button>
            </form>
            
            <form method="get" action="play">
                <button type="join">Create Match</button>
            </form>
        </section>
    );
}