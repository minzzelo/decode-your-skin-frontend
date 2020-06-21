import React from "react";
import "./styles.scss";
import axios from "axios";


export class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  redirect() {
    window.location.reload();
  }

  handleFavourite() {
    console.log(this.props);
    console.log(this.props.user);
    const data = { 
      user: this.props.user, 
      productName: this.props.productName, 
      ingredients: this.props.ingredients, 
      ingredDetails: this.props.ingredDetails,
    }

    axios.post("http://localhost:5000/saveProduct", data)
         .then((result) => console.log(result))
         .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="searchResult">
            <div>
              <button onClick={this.redirect}>Back</button>
              <button onClick={this.handleFavourite}>Favourite</button>
            </div>
    
            <h1>{this.props.productName}</h1>
          
          
            <div className="ingredients">
              <h3 className="heading">ingredients list</h3>
              <div id="ingredientsList">{this.props.ingredients}</div>
            </div>
            <div className="ingredients">
              <table id="#ingredientsDetails">
                <thead>
                  <tr>
                    <th>ingredient</th>
                    <th className="func">what-it-does</th>
                    <th>irritancy, comedogenicity</th>
                    <th>INCIDecoder-rating</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ingredDetails.map(row => (
                    <tr className="details" key={row}>
                      {row.map((detail, index) => (
                        <td key={index}>{detail}</td>
                      ))}
                    </tr>
                  ))} 
                </tbody>
              </table>
            </div>
        </div>
      </div>
    )
  }
}