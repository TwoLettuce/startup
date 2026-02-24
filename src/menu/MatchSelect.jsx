import React from 'react';

export function MatchSelect(){
    const [matchID, setMatchID] = React.useState(0);
    const [gameName, setGameName] = React.useState('');
    
    function addNewMatch(matchName){
        
        let matches = [];
        const matchesText = localStorage.getItem('matches');
        if (matchesText) {
            matches = JSON.parse(matchesText);
        }
        let nextAvailableID = updateMatchID(matches);
        class match {
            constructor(matchID, matchName, player1=null, player2=null){
                this.matchID = matchID
                this.matchName = matchName
                this.player1 = player1;
                this.player2 = player2;
            }

            setPlayer1(player1){
                this.player1 = player1;
            }

            setPlayer2(player2){
                this.player2 = player2;
            }
        }


        const newMatch = new match(nextAvailableID, matchName); 
        
        matches.push(newMatch)
        localStorage.setItem("matches", JSON.stringify(matches));
        return matches;
    }

    function clearMatches() {
        localStorage.removeItem("matches");
    }

    function updateMatchID(matches) {
        let idUnique = false;
        let nextAvailableID = matchID;
        while (!idUnique){
            let loopBroken = false;
            for (const match of matches){
                if (match.matchID == nextAvailableID){
                    nextAvailableID++;
                    loopBroken=true;
                    break;
                }
            }
            if (!loopBroken){
                idUnique = true;
            }
        }
        setMatchID(nextAvailableID);
        return nextAvailableID;
    }

    return (
        <section id="matches">
            <h4>Matches</h4>
            <div>
                <b>Search: </b>
                <input id="match_search" type="search" pattern="[0-9]*" placeholder="Match ID"/>
            </div>
            <div>
                <table>
                    <thead>
                        <th>Match ID</th>
                        <th>Match Name</th>
                        <th>Player 1</th>
                        <th>Player 2</th>
                    </thead>
                    <tbody>
                        <td>43</td>
                        <td>Treehouse</td>
                        <td>nerdslayer</td>
                        <td>Empty</td>
                    </tbody>
                    <tbody>
                        <td>46</td>
                        <td>freewins</td>
                        <td>tryhard</td>
                        <td>steve</td>
                    </tbody>
                    <tbody>
                        <td>47</td>
                        <td>wizonly</td>
                        <td>nerdslayer</td>
                        <td>Empty</td>
                    </tbody>
                    <tbody>
                        <td>52</td>
                        <td>match78</td>
                        <td>trevor</td>
                        <td>new guy</td>
                    </tbody>
                </table>
            </div>
            
            <form method="get" action="play">
                <button type="join" >Join Match</button>
            </form>

            <input id="create_button" className='create_input' type='text' placeholder='Game Name' onChange={(input)=>setGameName(input.target.value)} required/>
            
            <button type="join" disabled={!gameName} onClick={()=>addNewMatch(gameName)}>Create Match</button>
            <button type="join" onClick={()=>clearMatches()}>Clear Local Matches</button>
        </section>
    );
}