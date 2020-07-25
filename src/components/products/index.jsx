import React from "react";
import axios from "axios";

import "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

import { ProductList } from "./productList";

export class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const url =
      "http://decode-your-skin-backend.herokuapp.com" +
      `${this.props.location.pathname}`;
    console.log(url);

    axios
      .get(url)
      .then((res) => this.setState({ products: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { products } = this.state;

    return (
      <>
        {this.props.user ? (
          <Grid container direction="column">
            <div className="products">
              <div className="header">
                <h1>My Products💖</h1>
              </div>
            </div>
            <Grid item container>
              <Grid item xs={false} sm={2} />
              <Grid item xs={12} sm={8}>
                {this.state.products.length !== 0 ? (
                  <ProductList products={products} user={this.props.user} />
                ) : (
                  <CircularProgress />
                )}
              </Grid>
              <Grid item xs={false} sm={2} />
            </Grid>
          </Grid>
        ) : (
          <h1>Please Log In</h1>
        )}
      </>
    );
  }
}
