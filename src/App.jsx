import React from "react";
import "./App.scss";
import { LoginPage } from "./components/login/";
import { Nav } from "./components/nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
      user: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loginStatus: true,
      user: data.username,
    });
  }

  handleLogout() {
    this.setState({
      loginStatus: false,
      user: "",
    });
  }

  render() {
    console.log(this.state.user);
    return (
      <>
        <Router>
          <Nav
            loginStatus={this.state.loginStatus}
            handleLogout={this.handleLogout}
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
        <h1>Home page</h1>
        {this.props.loginStatus && <h1>Welcome {this.props.user}</h1>}
        {!this.props.loginStatus && <h1>Welcome guest</h1>}
      </>
    );
  }
}

export default App;
