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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault(); //prevent page from loading
 
    console.log("Form submitted");

    const newUser = {
      username: this.state.username, 
      password: this.state.password
    }

    console.log(newUser);
    axios.post('http://localhost:5000/users/login', newUser)
    .then(res => console.log(res.data));

    this.setState({
      username : '', 
      password : ''
    });

   //window.location = '/'; //go back to homepage

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
                value={this.state.username}
                placeholder="Enter your username here"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Enter your password here"
                onChange={this.handleChange}
                required
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
