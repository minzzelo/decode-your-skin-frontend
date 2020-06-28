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
      productName: this.props.productName, 
      description: this.props.description, 
      ingredients: this.props.ingredients, 
      ingredDetails: this.props.ingredDetails,
      imageURL: this.props.imageURL, 
    }

    const url = "http://localhost:5000/products/saveProduct/" + this.props.user;
   
    axios.post(url, data)
         .then((result) => alert("Item has been added"))
         .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="searchResult">
            <div className="navButtons">
              <button onClick={this.redirect}>Back To Search</button>
              <button onClick={this.handleFavourite}>Add to {this.props.user}'s Products</button>
            </div>

            <h2>{this.props.productName}</h2>
            <img src={this.props.imageURL} alt={this.props.productName}/> 
           

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