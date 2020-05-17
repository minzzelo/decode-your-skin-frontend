import React from "react";
import "./App.scss";
import { LoginPage } from "./components/login/";
import { Nav } from "./components/nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Router>
          <Nav />
          <Switch>
            {/* Directs you to the different pages */}
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

const Home = () => <h1>Where our search bar goes</h1>;

export default App;
