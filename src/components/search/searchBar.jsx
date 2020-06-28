import React from "react";
import "./styles.scss";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Route } from "react-router-dom";

import { SearchResult } from "./searchResult"


export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false, 
      searchValue:  "", 
      description: "", 
      ingredients: "", 
      ingredDetails: [], 
      image: "", 
      score: "", 
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
    this.setState({submitted: true});

    //getting the user who submitted the search - can be "" or username 
    console.log(this.props.user);

    console.log("Search Submitted");

    const product = {name: this.state.searchValue};

    axios.post("http://localhost:5000/search", product)
         .then((res) => { 
            this.setState({description: res.data.information.description});
            this.setState({ingredients: res.data.information.ingredList});
            this.setState({ingredDetails: res.data.table})
            this.setState({image: res.data.information.imageURL})
            this.setState({score: res.data.score})
            this.setState({found: true});
            console.log(this.state.score);
          })
         .catch((err) => {this.setState({ error: err.response.data });
                          this.setState({submitted: false})})

      this.setState({
      description: "", 
      ingredients: "",
      ingredDetails: [], 
      found: false, 
      image: "", 
      score: "", 
    });
  }
  
  
  render() {
    const { error } = this.state;
  

    return (
      <div>

        {!this.state.found &&
          <div>
            <div className="container">
              {this.props.loginStatus && <h1>hello {this.props.user}!👋🏻</h1>} 
              {!this.props.loginStatus && <h1>hello!👋🏻</h1>}
            </div>
            <form className="searchBar" onSubmit={this.handleSearch}>
              <input type="text"  
                      placeholder="Search for a brand + product E.g. Tatcha The Essence" 
                      value={this.state.searchValue} 
                      onChange={this.handleChange}
                      required/>
              <button type="submit">Search</button>
            </form>  
            {this.state.submitted && 
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
              </div>}
            {error && (
              <div style={{display: 'flex', width:'100%', justifyContent: 'center' }}>
                <Alert className="error" variant="outlined" severity="error">
                  {error}
                </Alert>
              </div>
            )}  
          </div> 
        }

        {this.state.found && 

        <SearchResult description={this.state.description}
              ingredients={this.state.ingredients}
              ingredDetails={this.state.ingredDetails}
              productName={this.state.searchValue}
              imageURL={this.state.image}
              score={this.state.score}
              user={this.props.user} />}
        
      </div>


    )
  }
}