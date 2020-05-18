import React from "react";
import loginImg from "./login.svg";
import axios from 'axios';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username :'', 
      password: ''
    };

    //binding
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({username : event.target.value});
    console.log("username inputted");
  }
  
  handlePassword(event) {
    this.setState({password : event.target.value});
    console.log("password inputed");

  }

  handleSubmit(event) {
    event.preventDefault(); //prevent page from loading
    console.log("submitted");
  };


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          {/* <div className="image">
            <img src={loginImg} alt="" />
          </div> */}
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username here"
                onChange={this.handleUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password here"
                onChange={this.handlePassword}
              />
            </div>
            <div className="footer">
              <button type="submit" className="btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
