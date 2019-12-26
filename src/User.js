import React from 'react';


class User extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: props.user.id,
         username: props.user.username,
         usersurname: props.user.usersurname,
         email: props.user.email,
         date: props.user.date,
         gender: props.user.gender,
         inEdit: false
      }
   }

   handleChange = (e) => {
      const name = e.target.name;
      const type = e.target.type;
    

      if( type === 'text' || type === 'password' || type === 'email' || type === 'date') {
        const value = e.target.value;
        this.setState({
          [name]: value, 
        }) 
      } else if (type === 'checkbox') {
        const checked = e.target.checked;
        this.setState({
          [name]: checked, 
        }) 
      }
      else if (type === 'radio') {
        this.setState({[name]: e.target.value});
      }
    }

    onUpdate = () => {
      this.props.update(this.state);
      this.setState({inEdit: false});
    };

   render() {
    const{ username, usersurname, email,id, inEdit} = this.state;
    return (
        <tr>
         <td>
              {inEdit ? 
               <input type="text" name="username" value={username} onChange={this.handleChange} />
              : <span onClick={() => this.setState({inEdit:true})}>{username}</span>}
             
        </td>
        <td> 
           {inEdit ? 
           <input type="text" name="usersurname" value={usersurname} onChange={this.handleChange} /> :
           <span onClick={() =>this.setState({inEdit: true})}>{usersurname}</span>}
        </td>
        <td> 
           {inEdit ?
           <input type="email" name="email" value={email} onChange={this.handleChange} /> :
           <span onClick={() => this.setState({inEdit:true})}>{email}</span>}
        </td>
        <td></td>
        <td></td>
   
        <td>
         {this.state.inEdit ? 
         <button onClick={this.onUpdate} className="btn btn-outline-info">V</button> : null}
         <button onClick = {() => this.props.delete(id)} className="btn btn-outline-danger">X</button>
        </td>
        </tr>
    ); 
   }
}

export default User ;