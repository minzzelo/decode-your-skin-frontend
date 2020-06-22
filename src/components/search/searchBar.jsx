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
            
            this.setState({ingredients: res.data.information.ingredList});
            this.setState({ingredDetails: res.data.table})
            this.setState({image: res.data.information.imageURL})

            this.setState({found: true});

          })
         .catch((err) => this.setState({ error: err.response.data }))

      this.setState({
      ingredients: "",
      ingredDetails: [], 
      found: false, 
      image: "", 
    });
  }
  
  
  render() {
    const { error } = this.state;
  

    return (
      <div>

        {!this.state.found &&
          <div>
            <form className="searchBar" onSubmit={this.handleSearch}>
              <input type="text"  
                      placeholder="Search for a brand + product E.g. Tatcha The Essence" 
                      value={this.state.searchValue} 
                      onChange={this.handleChange}
                      required/>
              <button type="submit">Search</button>
            </form>  
            {error && (
              <Alert className="error" variant="outlined" severity="error">
                {error}
              </Alert>
            )}  
          </div> 
        }

        {this.state.found && 
        
        <SearchResult ingredients={this.state.ingredients}
                      ingredDetails={this.state.ingredDetails}
                      productName={this.state.searchValue}
                      imageURL={this.state.image}
                      user={this.props.user} />

        }
      </div>


    )
  }
}