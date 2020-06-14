import React from "react";
import "./styles.scss";
import axios from "axios";

export class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="searchResult">
          <h1>{this.props.productName}</h1>
          <div className="ingredients">
            <h3 className="heading">ingredients list</h3>
            <div id="ingredientsList">{this.props.ingredients}</div>
          </div>
          <div className="ingredients">
            <table id="#ingredientsDetails">
              <tr>
                <th>ingredient</th>
                <th className="func">what-it-does</th>
                <th>irritancy, comedogenicity</th>
                <th>INCIDecoder-rating</th>
              </tr>
              {this.props.ingredDetails.map(row => (
                <tr className="details">
                  {row.map(detail => (
                    <td>{detail}</td>
                  ))}
                </tr>
              ))} 
            </table>
          </div>
        </div>
      </div>


    )
  }
}