import React, {Element, Component} from 'react'

class AddUser extends React.Component {
    state = {
            id: '',
            username:'',
            usersurname: '',
            email:'',
            date: '',
            gender: '',
            accept: false,
            message: '',
        
            errors: {
              username: false,
              usersurname: false,
              email: false,
              date: false,
              gender: false,
              accept: false,
            }
        }
        
          messages = {
            username_incorrect: 'nie może zawierać spacji',
            usersurname_inncorrect: 'nazwisko musi zostać podane',
            email_incorrect: 'brak @ w nazwie',
            date_incorrect: 'wybierz datę urodzenia',
            gedner_incorrect: 'wybierz płeć',
            accept_incorrect: 'brak zgody'            
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
              const radio = e.target.value;
              this.setState({
                [name]: radio});
            }
          }
        
          handleSubmit = (e) => {
            e.preventDefault()
        
            const validation = this.formValidation()
            if(validation.correct) {
              const {username, usersurname, email, date, gender, accept} = this.state;
              this.props.add(username, usersurname, email, date, gender, accept);
              this.setState({
                  username:'',
                  usersurname: '',
                  email:'',
                  date: '',
                  gender: false,
                  accept: false,
                  message: 'Pracownik dodany!',
              
                  errors: {
                    username: false,
                    usersurname: false,
                    email: false,
                    date: false,
                    gender:false,
                    accept: false,
                  }
              }); 
            } else {
              this.setState({
                errors: {
                  username: !validation.username,
                  usersurname: !validation.usersurname,
                  email: !validation.email,
                  gender:!validation.gender,
                  date: !validation.date,
                  accept: !validation.accept,
                }
              })
            }
          }
          formValidation = () => {
           let username = false;
           let usersurname = false;
           let email =  false;
           let date = false;
           let gender = false;
           let accept = false;
           let correct = false;
        
           if(this.state.username.indexOf(' ') === -1) {
             username = true;
           }
           if (this.state.usersurname.length > 0) {
             usersurname = true;
           }
           if(this.state.email.indexOf('@') !== - 1) {
             email = true;
           }
           if(this.state.gender){
             gender=true;
           }

           if( this.state.date !== ' '){
             date = true;
           }

           if (this.state.accept) {
             accept = true;
           }
        
           if(username && usersurname && email && date && gender && accept) {
             correct = true;
           }
           return({
             username,
             usersurname,
             email,
             date,
             gender,
             accept,
             correct
           })
            
          }
    
          onRadioChange = (e) => {
            this.setState({
              gender:e.target.value
            })
          }
        
          componentDidUpdate() {
            if(this.state.message !== '') {
              setTimeout(() => this.setState({
                message: '',
              }), 3000) 
            } 
          }

    render() { 
        return ( 
            <div className="app .my-5">
              <form noValidate> 
              <div className="form-group row">
                <label htmlFor="username"> 
                  Imię: 
                  <input className="form-control" type="text" id= "username" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
             {this.state.errors.username && <span className="alert alert-warning valid feedback" role="alert">{this.messages.username_incorrect}</span>}
            </label>
            </div>

            <div className="form-group row">
            <label htmlFor="usersurname"> Nazwisko: 
            <input type="text" className="form-control" id= "usersurname" name = "usersurname" value = {this.state.usersurname} onChange = {this.handleChange}/>
             {this.state.errors.usersurname && <span class="alert alert-warning" role="alert">{this.messages.usersurname_inncorrect}</span>}</label>
          </div>

          <div className="form-group row">
            <label htmlFor="email"> Email: 
            <input type="email" className="form-control" id= "email" name = "email" value = {this.state.email} onChange = {this.handleChange}/>
            {this.state.errors.email && <span className="alert alert-warning" role="alert">{this.messages.email_incorrect}</span>}</label>
            </div>

            <div className="form-group row">
             <label htmlFor="date"> Data urodzenia: 
            <input type="date" className="form-control" id= "date" name = "date" min = "1890-01-01" max="2000-12-31" value = {this.state.date} onChange = {this.handleChange}/></label>
        {this.state.errors.date && <span class="alert alert-warning" role="alert">{this.messages.date_incorrect}</span>}
        </div>

        <div className="form-group row"> Płeć:
        <div>
          <label>
            <input type = 'radio'value = 'kobieta' checked={this.state.gender ==='kobieta'} onChange={this.onRadioChange}/>
            Kobieta
          </label>
        </div>
        <div>
          <label>
            <input type = 'radio' value='mężczyzna' checked={this.state.gender === 'mężczyzna'} onChange={this.onRadioChange}/>
          Mężczyzna
          </label>
        </div>
           {this.state.errors.gender && <span className="alert alert-warning" role="alert">{this.messages.gedner_incorrect}</span>}
        </div>
            
            <div className="form-check">
             <label htmlFor="accept" className="form-check-label">
              <input className="form-check-input" type="checkbox" id= "accept" name="accept" checked = {this.state.accept} onChange={this.handleChange} /> Zapoznałam/łem się z regulaminem
            </label>
             {this.state.errors.accept && <span className="alert alert-danger" role="alert">{this.messages.accept_incorrect}</span>}
             </div>
            <br></br>
            <button className="btn btn-primary btn-lg" onClick = {this.handleSubmit}>Dodaj</button>
           </form>
          {this.state.message && <h3>{this.state.message}</h3>}
          <br></br>
          <br></br>
        </div>
         );
    }
}
 
export default AddUser;