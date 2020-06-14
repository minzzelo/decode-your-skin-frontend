import React from "react";
import "./styles.scss";
import axios from "axios";

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
            this.setState({ingredDetails: res.data.tableData})
            console.log(this.state.ingredients);
            console.log(this.state.ingredDetails.map(ingred => (ingred)));

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
        <div className="searchResult">
          <h1>{this.state.productName}</h1>
          <div className="ingredients">
            <h3>ingredients list</h3>
            <div id="ingredientsList">{this.state.ingredients}</div>
          </div>
          <div className="ingredients">
            <table id="#ingredientsDetails">
              <tr>
                <th>ingredient</th>
                <th>what-it-does</th>
                <th>irritancy && comedogenicity</th>
                <th>INCIDecoder-rating</th>
              </tr>
                
            </table>
          </div>
        </div>
      </div>


    )
  }
}
