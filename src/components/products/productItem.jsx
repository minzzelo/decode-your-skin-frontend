import React from "react";

export class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { product } = this.props;
        return (
          
            <div className="product">
              <div className="image">
                  <img src={product.imageURL} />
              </div>
              <div className="name">{product.productName.toUpperCase()}</div>
            </div>
   
          )
    }
}