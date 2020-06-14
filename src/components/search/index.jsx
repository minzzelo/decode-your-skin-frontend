import React from "react";
import "./styles.scss";

import { SearchBar } from "./searchBar"


export class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        <SearchBar />
      </>
    )
  }
}
