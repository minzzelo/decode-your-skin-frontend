import React from "react";
import "./styles.scss";

import { SearchBar } from "./searchBar"
import { SearchResult } from "./searchResult"

import { Route } from "react-router-dom";


export class Search extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <SearchBar user={this.props.user} loginStatus={this.props.loginStatus} />    
      </>
    )
  }
}
