import React from 'react';
import { MessageDialog } from '../login/MessageDialogue';

export function MatchSelect(props){
    const [matchID, setMatchID] = React.useState(0);
    const [gameName, setGameName] = React.useState('');
    const [matches, setMatches] = React.useState([]);
    const [queriedID, setQueriedID] = React.useState('');
    const [httpError, setHttpError] = React.useState(null);

    React.useEffect(()=>
    {
        fetch('/api/match')
            .then((response)=> response.json())
            .then((matches) => setMatches(matches));
    }, []
    );

    async function addNewMatch(matchName){
        const response = await fetch('/api/match', {
            method: 'post',
            body: JSON.stringify({matchName: matchName}),
            headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        if (response.status === 200){
            fetch('api/match')
            .then((response)=>response.json())
            .then((matches)=>setMatches(matches));
        } else {
            const body = await response.json();
            setHttpError(`⚠ Error: ${body.msg}`);
        }
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
            
            <MessageDialog message={httpError} onHide={() => setHttpError(null)} />
        </section>
    );
}