import React from "react";
import "./styles.scss";

export class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="searchBar">
        <input type="text" placeholder="Search for a brand/product" />
        <button type="submit">Search</button>
      </form>
    );
  }
}
