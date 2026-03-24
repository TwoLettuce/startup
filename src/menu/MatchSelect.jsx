import React from 'react';
import { MessageDialog } from '../login/MessageDialogue';
import { useNavigate } from 'react-router-dom';


export function MatchSelect(props){
    const navigate = useNavigate();
    const [gameName, setGameName] = React.useState('');
    const [matches, setMatches] = React.useState([]);
    const [queriedID, setQueriedID] = React.useState('');
    const [httpError, setHttpError] = React.useState(null);

    React.useEffect(()=>
    {
        async function reload(){
            await reloadMatches();
        }
        reload();
    }, []
    );


    React.useEffect(()=>
    {
        async function reload(){
            await reloadMatches();
        }
        reload();
    }, []
    );

    async function reloadMatches(){
        const response = await fetch('/api/match', {
            method: 'get',
            headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const body = await response.json();
        if (response.status === 200) {
            setMatches(body);
        } else {
            console.log(`⚠ Error: ${body.msg}`);
        }
    }

    async function addNewMatch(matchName){
        document.getElementById('create_button').value = '';
        setGameName('');
        const response = await fetch('/api/match', {
            method: 'post',
            body: JSON.stringify({matchName: matchName}),
            headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const body = await response.json();
        if (response.status === 200){
            await reloadMatches();
            setHttpError(`Game created with id: ${body.id}`);
        } else {
            setHttpError(`⚠ Error: ${body.msg}`);
        }
    }

    async function joinMatch(event, matchID, playerNo) {
        event.preventDefault();
        const response = await fetch('/api/match', {
            method: 'put',
            body: JSON.stringify({matchID: matchID, playerNo: playerNo}),
            headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (response.status === 200){
            console.log("going to play!");
            props.setMatchID(matchID);
            navigate('/play');
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