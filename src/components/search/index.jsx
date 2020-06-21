import React from "react";
import "./styles.scss";

import { SearchBar } from "./searchBar"

import { Route } from "react-router-dom";


export class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        <Route
          path="/"
          exact
          render={(props) => <SearchBar {...props} user={this.props.user} />}
        />
      </>
    )
  }
}
