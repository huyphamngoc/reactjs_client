import React, { Component } from 'react';
import '../css/Login-Register.css';
import axios from "axios";

class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoginOpen: true,
          isRegisterOpen: false
        };
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

    render(){
        return(
            <div id="test" className="re-root-container">
                <div className="box-controller">
                    <div
                        className={"controller " + (this.state.isLoginOpen
                        ? "selected-controller"
                        : "")}
                        onClick={this
                        .showLoginBox
                        .bind(this)}>
                        Login
                    </div>

                    <div
                        className={"controller " + (this.state.isRegisterOpen
                        ? "selected-controller"
                        : "")}
                        onClick={this
                        .showRegisterBox
                        .bind(this)}>
                        Register
                    </div>
                </div>

                <div className="box-container">
                  {this.state.isLoginOpen && <LoginBox hide = {this.props.hide}/>}
                  {this.state.isRegisterOpen && <RegisterBox/>}
                </div>
            </div>
            );
    }
}

//Login Box
class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        errors: [],
        email: '',
        password: '',
        redirectToReferrer: false,
    };
  }

  //Add New Error Object to the array {elm: msg}
  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }

  //Remove a specific element from the array
  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  //Update Email, password on change event
  onEmailChange(e) {
    this.setState({email: e.target.value});
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
    this.clearValidationErr("password");
  }

  submitLogin(e) {
    let err = false;
    if (this.state.email === "") {
      this.showValidationErr("email", "Email Cannot be empty!");
      err = true;
    }
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!emailRegex.test(this.state.email)) {
      this.showValidationErr("email", "invalid email address!");
      err = true;
    }

    if (this.state.password.length < 6) {
      this.showValidationErr("password", "Password must be longer than 5 chars!");
      err = true;
    }

    if(err === false){
      const user = {
          "email": this.state.email,
          "password": this.state.password,
      }

      axios.post(`https://nalvnsmartnews.herokuapp.com/api/login`, user )
            .then(res => {
              axios.get('https://nalvnsmartnews.herokuapp.com/api/auth',
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  "Authorization": "Bearer"+res.data.token,
                }
              }).then(
                res => {
                  let responseJson = res.data;
                  sessionStorage.setItem('userData',JSON.stringify(responseJson));
                  this.props.hide();
                }
              ).catch(err => {
                console.log(err)
              })
              this.setState({redirectToReferrer: true});
            }).catch(error => {
              let err = error.response.data
              console.log(error.response.data.msg)
              if(err.msg){
                  this.showValidationErr("login", err.msg);
              }
          })
    }

  }

  render() {

       let
         passwordErr = null,
         emailErr = null,
         loginErr = null;
       //Loop and find which ones has the error
       for (let err of this.state.errors) {
         //Assign the validation error message

         if (err.elm === "password") {
           passwordErr = err.msg;
         }
         if (err.elm === "email") {
           emailErr = err.msg;
         }
         if (err.elm === "login") {
           loginErr = err.msg;
         }

       }
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>

        <small className="danger-error">{loginErr
            ? loginErr
            : ""}
        </small>

        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this
                .onEmailChange
                .bind(this)}/>
            <small className="danger-error">{emailErr
                ? emailErr
                : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this
                .onPasswordChange
                .bind(this)}/>
            <small className="danger-error">{passwordErr
                ? passwordErr
                : ""}
            </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }

}

//Register Box 
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        errors: [],
        username: '',
        email: '',
        password: '',
        confirmed_password: ''
    };
  }

  //Add New Error Object to the array {elm: msg}
  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }
  //Remove a specific element from the array
  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  //Update Username, password, and email on change event
  onUsernameChange(e) {
    this.setState({username: e.target.value});
    //We want to clear the error when ever the user type something new
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
    this.clearValidationErr("password");
  }

  onConfirmedPasswordChange(e) {
    this.setState({confirmed_password: e.target.value});
    this.clearValidationErr("confirmed_password");
  }

  submitRegister(e) {
    let err = false;
    //Check for all input fields and show errors if empty (you can implement other cases!)
      if (this.state.username === "") {
        this.showValidationErr("username", "Username Cannot be empty!");
        err = true;
      }
      if (this.state.email === "") {
        this.showValidationErr("email", "Email Cannot be empty!");
        err = true;
      }

      const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      if (!emailRegex.test(this.state.email)) {
        this.showValidationErr("email", "invalid email address!");
        err = true;
      }

      if (this.state.password === "") {
        this.showValidationErr("password", "Password Cannot be empty!");
        err = true;
      }

      if (this.state.password.length < 6) {
        this.showValidationErr("password", "Password must be longer than 5 chars!");
        err = true;
      }

      if (this.state.confirmed_password === "") {
        this.showValidationErr("confirmed_password", "Confirmed Password Cannot be empty!");
        err = true;
      }

      if (this.state.password !== this.state.confirmed_password) {
        console.log(this.state.password, this.state.confirmed_password)
        console.log('ddd', this.state.confirmed_password)
        this.showValidationErr("confirmed_password", "Confirmed Password must be same as password");
        err = true;
      }

      if(err === false){
        const user = {
            "name": this.state.username,
            "email": this.state.email,
            "password": this.state.password,
            "passwordConfirm": this.state.confirmed_password,
        }
        axios.post(`https://nalvnsmartnews.herokuapp.com/api/register`, user )
              .then(res => {
                console.log('You have registered successfully');
                alert("You have registered successfully");
              }).catch(error => {
                // let err = error.response.data.errors
                console.log(error)

            })
      }
  }

  render() {

    //NULL by default (help us check when rendering)
       let usernameErr = null,
         passwordErr = null,
         emailErr = null,
         ConfirmedPassword = null;
       //Loop and find which ones has the error
       for (let err of this.state.errors) {
         //Assign the validation error message
         if (err.elm === "username") {
           usernameErr = err.msg;
         }
         if (err.elm === "password") {
           passwordErr = err.msg;
         }
         if (err.elm === "email") {
           emailErr = err.msg;
         }
         if (err.elm === "confirmed_password") {
           ConfirmedPassword = err.msg;
         }
         //No (else if or else) statements cause we need to check for all possible elements
       }

    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this
                .onUsernameChange
                .bind(this)}/>
            <small className="danger-error">{usernameErr
                ? usernameErr
                : ""}
            </small>

          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"
            onChange={this
              .onEmailChange
              .bind(this)}/>

            <small className="danger-error">{emailErr
                ? emailErr
                : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this
                .onPasswordChange
                .bind(this)}/>
            <small className="danger-error">{passwordErr
                ? passwordErr
                : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Confirm Password"
              onChange={this
                .onConfirmedPasswordChange
                .bind(this)}/>
            <small className="danger-error">{ConfirmedPassword
                ? ConfirmedPassword
                : ""}
            </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitRegister
            .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}

export default LoginRegister;