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
        reloadMatches();
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
            reloadMatches();
        } else {
            const body = await response.json();
            setHttpError(`⚠ Error: ${body.msg}`);
        }
    }

    async function joinMatch(event, matchID, playerNo) {
        event.preventDefault();
        console.log("MatchID: " + matchID + "\nPlayer No. " + playerNo);
        const response = await fetch('/api/match', {
            method: 'put',
            body: JSON.stringify({matchID: matchID, playerNo, playerNo}),
            headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response.status === 200){
            reloadMatches();
            window.location.href = '/play';
        } else if (response.status === 403) {
            //already taken
        } else if (response.status === 400) {
            //bad request
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

    function reloadMatches(){
        fetch('api/match')
            .then((response)=>response.json())
            .then((matches)=>setMatches(matches));
    }

    return (
        <section id="matches">
            <h4>Matches</h4>
            <div>
                <b>Search: </b>
                <input id="match_search" type="number" placeholder="Match ID" onChange={(input)=>setQueriedID(input.target.value)}/>
            </div>
            <div className="join_buttons">
                <form onSubmit={()=>joinMatch(event, queriedID, 1)}>
                    <button type="submit" disabled={!queriedID}>Join as Player 1</button>
                </form>
                <form onSubmit={()=>joinMatch(event, queriedID, 2)}>
                    <button type="submit" disabled={!queriedID}>Join as Player 2</button>
                </form>
            </div>
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