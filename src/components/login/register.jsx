import React from "react";
import axios from 'axios';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '', 
      email : '', 
      password : ''
    }

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  handleUsername(event) {
    this.setState({username : event.target.value});
    console.log("username inputted");
  }

  handleEmail(event) {
    this.setState({email : event.target.value});
    console.log("email inputted");
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
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">{/* for image */}</div>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email here"
                onChange={this.handleEmail}
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
              <button type="submit" className="btn">
                Register
             </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
