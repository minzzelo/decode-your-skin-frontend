import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import { LoginPage } from "./components/login/";
import { Nav } from "./components/nav";
import { Products } from "./components/products";
import { Search } from "./components/search";
import { Diary } from "./components/diary";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: localStorage.getItem("TOKEN_KEY") != null,
      user: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  //decrypt token
  parseJwt() {
    let token = localStorage.getItem("TOKEN_KEY");
    if (!token) {
      return "";
    }
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    // console.log(`jsonpayload ${jsonPayload}`);
    return JSON.parse(jsonPayload);
  }

  handleLogin() {
    this.setState({
      loginStatus: true,
      user: this.parseJwt().name,
    });
  }

  handleLogout() {
    this.setState({
      loginStatus: false,
      user: "",
    });
    localStorage.removeItem("TOKEN_KEY");
  }

  componentDidMount() {
    this.setState({
      user: this.parseJwt().name,
    });
  }

  render() {
    return (
      <>
        <Router>
          <Nav
            loginStatus={this.state.loginStatus}
            handleLogout={this.handleLogout}
            user={this.state.user}
          />
          <Switch>
            {/* Directs you to the different pages */}
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  loginStatus={this.state.loginStatus}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <LoginPage
                  {...props}
                  handleLogin={this.handleLogin}
                  loginStatus={this.loginStatus}
                />
              )}
            />
            <Route
              path="/products"
        
              render={(props) => <Products user={this.state.user} {...props} />}
            />
            <Route
              path="/diary"
              render={(props) => <Diary {...props} user={this.state.user} />}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="container">
          {this.props.loginStatus && <h1>Welcome {this.props.user}</h1>} 
          {!this.props.loginStatus && <h1>Welcome guest</h1>}
        </div>

        <Search user={this.props.user}/>
      </>
    );
  }
}

export default App;
