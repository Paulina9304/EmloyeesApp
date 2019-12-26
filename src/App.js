import React, { Component } from 'react';
import './App.css';
import AddUser from './AddUser';
import UsersList from './UsersList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';

class App extends Component {

  state = {
    counter: 0,
    users: []
  }

  deleteUser = (id) => {
    const users = [...this.state.users];
    const index = users.findIndex(user => user.id === id);
    users.splice(index,1);

    this.setState ({
      users
    });
  }

    addUser = (username, usersurname, email, date) => {
      const user = {
        id: this.state.counter,
        username,
        usersurname,
        email,
        date,
        gender: false,
        accept: false,
        message: '',
      }
      this.setState(prevState => ({
        users: [...prevState.users, user],
        counter: this.state.counter + 1
      }));
      return true;
    }

    update = (user) => {
      const users = [...this.state.users];
      const index = users.findIndex(us => us.id === user.id);
      users.splice(index,1);

      users.push({
        id: user.id,
        username: user.username,
        usersurname: user.usersurname,
        email: user.email,
        date: user.date,
        gender: user.gender,
      });
    this.setState ({
      users
    });  
    }

  
  render() {
    return(
    
  <>
  <div className="container">
    <div className="row">
      <AddUser className="col-md-2"  add = {this.addUser}/>
      <UsersList className="col-md-10"  users={this.state.users} delete = {this.deleteUser} update={this.update}/>   
    </div>
  </div>
  </>   
    )
  }
}
export default App;