import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Item extends Component {
  render() {
    const { image, product, price } = this.props.product;
    return (
      <div className="item">
        <figure>
          <img src={image} alt="" />
        </figure>
        <h4>{product}</h4>
        <div className="price">
          <h5>${price}</h5>
          <FontAwesome name="cart-plus" onClick={() => this.props.addToCart(this.props.product)} />
        </div>
      </div>
    );
  }
}

export default Item;
