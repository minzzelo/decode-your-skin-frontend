import React from "react";
import "./styles.scss";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

import { SearchResult } from "./searchResult"


export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue:  "", 
      ingredients: "", 
      ingredDetails: [], 
      score: "", 
      image: "", 
      found: false, 
      error: "",
    }


    //binding
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();


    //getting the user who submitted the search - can be "" or username 
    console.log(this.props.user);

    console.log("Search Submitted");

    
    const product = {name: this.state.searchValue};

    axios.post("http://localhost:5000/search", product)
         .then((res) => { 
            
            this.setState({ingredients: res.data.ingredients});
            this.setState({ingredDetails: res.data.tableData})
            this.setState({found: true});

          })
         .catch((err) => this.setState({ error: err.response.data }))

      this.setState({
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

        {!this.state.found &&
          <form className="searchBar" onSubmit={this.handleSearch}>
            <input type="text"  
                    placeholder="Search for a brand + product E.g. Tatcha The Essence" 
                    value={this.state.searchValue} 
                    onChange={this.handleChange}
                    required/>
            <button type="submit">Search</button>
          </form>     
        }

        {this.state.found && 
        
        <SearchResult ingredients={this.state.ingredients}
                      ingredDetails={this.state.ingredDetails}
                      productName={this.state.searchValue}
                      user={this.props.user} />

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