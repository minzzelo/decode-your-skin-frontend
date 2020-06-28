import React from "react";
import {Grid} from "@material-ui/core";


import { ProductCard } from "./productCard";

export class ProductList extends React.Component {
    constructor(props) {
      super(props);
        
      this.getProductCard = this.getProductCard.bind(this);
    }

    getProductCard(product, index) {
      return (
        <Grid item xs={12} sm={4} key={index}>
          <ProductCard product={product} user={this.props.user} />
        </Grid>
      );
    }

    render() {
  
        return (
            <Grid container spacing={4}>
              {this.props.products.map((product, index) => this.getProductCard(product, index))}
            </Grid>
          
        )
    }
}