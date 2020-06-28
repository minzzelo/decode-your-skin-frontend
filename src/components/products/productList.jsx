import React from "react";
import {Grid} from "@material-ui/core";


import { ProductCard } from "./productCard";

export class ProductList extends React.Component {
    constructor(props) {
      super(props);
        
      this.getProductCard = this.getProductCard.bind(this);
    }

    getProductCard(product) {
      return (
        <Grid item xs={12} sm={4}>
          <ProductCard product={product} />
        </Grid>
      );
    }

    render() {
  
        return (
            <Grid container spacing={4}>
              {this.props.products.map(product => this.getProductCard(product))}
            </Grid>
          
        )
    }
}