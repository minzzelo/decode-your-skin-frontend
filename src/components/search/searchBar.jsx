import React from "react";
import "./styles.scss";
import axios from "axios";

import { SearchResult } from "./searchResult"

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName:  "", 
      ingredients: "", 
      ingredDetails:[]
    }


    //binding
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({productName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.product);
    console.log("Search Submitted");
    
    const product = {productName: this.state.productName};
    axios.post("http://localhost:5000/search", product)
         .then((res) => { 
            
            this.setState({ingredients: res.data.ingredients});
            this.setState({ingredDetails: res.data.tableData.map(ingred => ingred)})
            
            console.log(this.state.ingredDetails[0]);

          })
         .catch((err) => console.log(err.response.data))
  }
  
  
  render() {
    return (
      <div>
        <form className="searchBar" onSubmit={this.handleSubmit}>
          <input type="text"  
                  placeholder="Search for a product" 
                  value={this.state.product} 
                  onChange={this.handleChange}
                  required/>
          <button type="submit">Search</button>
        </form>
        <SearchResult 
          ingredients={this.state.ingredients} 
          productName={this.state.productName}
          ingredDetails={this.state.ingredDetails}
        />
      </div>


    )
  }
}
