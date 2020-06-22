import React from "react";
import axios from "axios";

import "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ProductItem } from "./productItem";

export class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }


   getProducts() {

      
      const url = "http://localhost:5000" + `${this.props.location.pathname}`;

      axios.get(url)
           .then((res) => this.setState({products: res.data}))
           .catch((err) => console.log(err));
  }
  
  render() {

    const { products } = this.state;

    return (
      <>
        <div className="products">
          <div className="header">
            <h1>Products</h1>
          </div>
          <div className="row">
    
              {this.state.products.length !== 0 ? (
        
                products.map((product, index) => 
                  <ProductItem product={product} key={index}/>
                )
              
              ) : (
                <CircularProgress />
              )}
        </div>
      
        </div>
      </>
    );
  }
}

