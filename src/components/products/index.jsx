import React from "react";
import axios from "axios";

import "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

export class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentWillMount() {
    this.getProducts();
  }

  async getProducts() {
    const url = {
      url:
        "https://www.ewg.org/skindeep/products/879905-Maybelline_Lash_Sensational_Mascara_254_Very_Black/",
    };

    await axios
      .post("http://localhost:5000/products/products", url)
      .then((res) => {
        this.setState({ name: res.data.name, url: res.data.src});
      })
      .catch((err) => console.log(err.response.data));
  }
  
  render() {
    return (
      <>
        <div className="products">
          <div className="header">
            <h1>Products</h1>
          </div>

          {this.state.url ? (
            <div className="product">
              <div className="image">
                <img src={this.state.url} />
              </div>
              <div className="name">{this.state.name}</div>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </>
    );
  }
}
