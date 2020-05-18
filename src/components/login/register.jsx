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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email here"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password here"
                onChange={this.handleChange}
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
