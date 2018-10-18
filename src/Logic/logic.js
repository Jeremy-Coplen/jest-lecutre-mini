// const axios = require('axios');

const logic = {
  toggle(bool) {
    return !bool
  },
  addToCart(product, cart) {
    let productCopy = { ...product }
    let cartCopy = [...cart]
    let index = cartCopy.findIndex(elem => productCopy.id === elem.id)
    if (index !== -1) {
      cartCopy[index].qty += 1
    }
    else {
      productCopy.qty = 1
      cartCopy.push(productCopy)
    }
    return cartCopy
  },
  calculateSubTotal(item) {
    let subTotal = 0
    if(!item.price || !item.qty) {
      throw new Error("Product must have both price and quantity property")
    }
    if (typeof (item.price) !== "number") {
      throw new Error("The price of the product must be a number")
    }
    if (typeof (item.qty) !== "number") {
      throw new Error("The qty of the product must be a number")
    }
    if (item.qty === 1) {
      subTotal = item.price
    }
    else {
      subTotal = item.price * item.qty
    }
    return subTotal.toFixed(2)
  },
  calculateTotal(cart, tax) {
    if(Array.isArray(cart) === false) {
      throw new Error("Cart must be an array")
    }
    if(typeof tax !== "number") {
      throw new Error("Tax must be a number")
    }
    if(!cart.length) {
      return "0.00"
    }
    let priceArr = []
    cart.forEach(product => {
      priceArr.push(product.price * product.qty)
    })
    return (priceArr.reduce((total, current) => total + current) + (1 * tax)).toFixed(2)
  },
  removeItem(cart, id) {
    const modifiedCart = [...cart]
    return modifiedCart.map(product => {
      const modifiedProduct = {...product}
      if (modifiedProduct.id === id) {
        modifiedProduct.qty -= 1
      }
      return modifiedProduct
    }).filter(product => !(product.id === id && product.qty <= 0))
  },
};

module.exports = logic;
