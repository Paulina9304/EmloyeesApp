import React from 'react';
import User from './User'

const UsersList = (props) => {

    const users = props.users.map(user => <User key={user.id} user = {user} delete={props.delete} update={props.update}/>)

    return ( 
        <>
        <div className= "userslist">
        <h2 >Lista Pracowników :</h2>
        <div className="container">
        <table className="table table-responsive table-striped w-auto text-justify">
            <thead>
                <tr>
                <td>IMIE</td>
                <td>NAZWISKO</td>
                <td>EMAIL</td>
                <td>WIEK</td>
                <td>PŁEĆ</td>
                <td></td>
                </tr>
                {users}
            </thead>
        </table>
        </div>
        </div>
        </>
     );
}
 
export default UsersList;