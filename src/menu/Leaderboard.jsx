import React from 'react';

export function Leaderboard(){
    const [users, setUsers] = React.useState([]);
    const [queriedUser, setQueriedUser] = React.useState('');

    

    function sortUsers(users){
        let sortedUsers = [...users];
        return sortedUsers.sort((a,b) => b.wins - a.wins);
    }

    // function deleteUsers(){
    //     setUsers([]);
    // }

    // React.useEffect(()=>
    //     {
            
    //         let users = localStorage.getItem('users');
    //         if (users) {
    //             users = JSON.parse(users);
    //         } else {
    //             users = [];
    //         }
    //         let usernameFound = false;
    //         for (const user of users){
    //             if (user.username === username) {
    //                 usernameFound = true;
    //             }
    //         }
    //         if (!usernameFound){
    //             users.push(new User(username, password, 0, 0));
    //             localStorage.setItem('users', JSON.stringify(users));
    //         }
    //         setUsers(users);

    //     }, []);

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

    // function addUser(){
    //     const wins = Math.floor(Math.random()*100);
    //     const losses = 100-wins;
    //     let username = 'user';
    //     while (username.length < 9) {
    //         username += Math.random().toString(16).substring(2);
    //     }
    //     username = username.slice(0, 9);
    //     const password = "badPassword";
    //     const thisUser = new User(username, password, wins, losses);
    //     let tempUsers = [...users];
    //     tempUsers.push(thisUser);
    //     setUsers(tempUsers);
    // }

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