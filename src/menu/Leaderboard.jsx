import React from 'react';

export function Leaderboard(){
    const [users, setUsers] = React.useState([]);
    const [queriedUser, setQueriedUser] = React.useState('');

    

    function sortUsers(users){
        let sortedUsers = [...users];
        return sortedUsers.sort((a,b) => b.wins - a.wins);
    }

    React.useEffect(()=> 
    {
        fetch('/api/user')
            .then((response)=> response.json())
            .then((users) => setUsers(users));
    }, []);

    // React.useEffect(()=> {
    //     localStorage.setItem('users', JSON.stringify(users));
    // }, [users]);

    function concatenateUsers(users){
        return users.slice(0,10);
    }

    function getQueriedUsers(){
        let queriedUsers = [];
        for (const user of users) {
            if (user.username?.includes(queriedUser)){
                queriedUsers.push(user);
            }
        }
        return queriedUsers
    }

    return (
        <section id="leaderboard">
            <h4>Leaderboard</h4>
            <div id='leaderboard_search'>
                <b>Search: </b>
                <input type="search" placeholder="username" onChange={(input)=>setQueriedUser(input.target.value)}/>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Name</th>
                            <th>W/L</th>
                        </tr>
                    </thead>
                    <thead>
                        {concatenateUsers(sortUsers(getQueriedUsers())).map((user, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.username}</td>
                                <td>{user.wins}/{user.losses}</td>
                            </tr>
                            ))}
                    </thead>            
                </table>
                {/* <button type="join" onClick={()=>addUser()}>Create User</button> */}
                {/* <button type="delete" onClick={()=>deleteUsers()}>Delete Users</button> */}
            </div>
            </section>
    )
    
}