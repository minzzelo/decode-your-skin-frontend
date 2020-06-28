import React from "react";
import "./styles.scss";
import axios from "axios";

import {Grid, Paper} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';


export class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  componentDidMount() {
    console.log(this.props.user);
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
         .then((result) => alert("Item has been added into your products"))
         .catch(err => console.log(err));
  }

  render() {
    const {productName, imageURL, description, ingredients, ingredDetails} = this.props;

    return (
      <div className="searchResult">
        <div className="navButtons">
          <button onClick={this.redirect}>Back To Search</button>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper>
              <img style={{maxheight: 300, maxWidth:300, minHeight: 250, minWidth: 250}}src={imageURL} alt={productName}/> 
            </Paper>
          </Grid>
          <Grid item xs={6}>    
            <h2 style={{display:'inline-block'}}>{productName.toUpperCase()}</h2> 
            <button style={{float:"right"}}onClick={this.handleFavourite}>🤍</button>
            <p>{description}</p>
            <div style={{border: '2px solid lightpink', padding: '20px 20px 20px 20px'}} id="ingredientsList">{ingredients}</div>
          </Grid>
        </Grid>
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
              {ingredDetails.map(row => (
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
    )
  }
}