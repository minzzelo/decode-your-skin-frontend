import React from "react";
import "./styles.scss";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

import { SearchResult } from "./searchResult"

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product:  "", 
      ingredients: "", 
      ingredDetails: [], 
      score: "", 
      image: "", 
      found: false, 
      error: "",
    }


    //binding
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({product: event.target.value});
    console.log(this.state.product);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    console.log("Search Submitted");
    
    const product = {name: this.state.product};

    axios.post("http://localhost:5000/search", product)
         .then((res) => { 
            
            this.setState({ingredients: res.data.ingredients});
            this.setState({ingredDetails: res.data.tableData})
            this.setState({found: true});
            this.setState({score: res.data.score})
            this.setState({image: res.data.image})
            console.log(res.data.image)

            console.log(this.state.product);

          })
         .catch((err) => this.setState({ error: err.response.data }))

      this.setState({
      productName: "",
      ingredients: "",
      ingredDetails: [], 
      found: false, 
      error: "", 
      score: "", 
      image: "", 
    });
  }
  
  
  render() {
    const { error } = this.state;

    return (
      <div>
        {!this.state.found ?
          <form className="searchBar" onSubmit={this.handleSubmit}>
            <input type="text"  
                    placeholder="Search for a product" 
                    value={this.state.product} 
                    onChange={this.handleChange}
                    required/>
            <button type="submit">Search</button>
          </form>     
        :
          <SearchResult 
            ingredients={this.state.ingredients} 
            productName={this.state.product}
            ingredDetails={this.state.ingredDetails}
            image={this.state.image}
            score={this.state.score}
          />
        }

        {error && (
          <Alert className="error" variant="outlined" severity="error">
            {error}
          </Alert>
        )}
      </div>


    )
  }
}