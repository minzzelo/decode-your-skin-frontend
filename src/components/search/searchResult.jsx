import React from "react";
import "./styles.scss";


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