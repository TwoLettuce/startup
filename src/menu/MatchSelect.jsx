import React from 'react';

export function MatchSelect(props){
    const [matchID, setMatchID] = React.useState(0);
    const [gameName, setGameName] = React.useState('');
    const [matches, setMatches] = React.useState([]);
    const [queriedID, setQueriedID] = React.useState('');

    React.useEffect(()=>
    {
        fetch('/api/match')
            .then((response)=> response.json())
            .then((matches) => setMatches(matches));
    }, []
    );

    function addNewMatch(matchName){
        let nextAvailableID = updateMatchID();
        let newMatches = matches;
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
        
        newMatches.push(newMatch)
        localStorage.setItem("matches", JSON.stringify(matches));
        setMatches(newMatches);
    }

    function updateMatchID() {
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
        setMatchID(nextAvailableID + 1);
        return nextAvailableID;
    }

    function concatenatedMatches(matchesList){
        return matchesList.slice(0,5);
    }

    function getQueriedMatches(){
        let queriedMatches = [];
        for (const match of matches) {
            if (String(match.matchID).includes(String(queriedID))){
                queriedMatches.push(match);
            }
        }

        return queriedMatches;
    }

    return (
        <section id="matches">
            <h4>Matches</h4>
            <div>
                <b>Search: </b>
                <input id="match_search" type="number" placeholder="Match ID" onChange={(input)=>setQueriedID(input.target.value)}/>
            </div>
            <form method="get" action="play">
                <button type="join" >Join Match</button>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Match Name</th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {concatenatedMatches(getQueriedMatches()).map((match, index) => (
                            <tr key={index}>
                                <td>{match.matchID}</td>
                                <td>{match.matchName}</td>
                                <td>{match.player1}</td>
                                <td>{match.player2}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <input id="create_button" className='create_input' type='text' placeholder='Game Name' onChange={(input)=>setGameName(input.target.value)} required/>
            
            <button type="join" disabled={!gameName} onClick={()=>addNewMatch(gameName)}>Create Match</button>
            <button type="join" onClick={()=>clearMatches()}>Clear Local Matches</button>
        </section>
    );
}