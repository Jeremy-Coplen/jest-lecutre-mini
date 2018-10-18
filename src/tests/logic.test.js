const { toggle, getProducts, addToCart, calculateSubTotal, calculateTotal, removeItem } = require('../Logic/logic');

const product = {
  id: 1,
  product: 'Fillets',
  price: 69.41,
  image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
};

describe('Tests Toggle Show button', () => {
  test("if given true return false", () => {
    expect(toggle(true)).toBe(false)
  })
  test("if given false return true", () => {
    expect(toggle(false)).toBe(true)
  })
  test("if given a string with text return false", () => {
    expect(toggle("hey there")).toBe(false)
  })
  test("if given a falsy value should return true", () => {
    expect(toggle("")).toBe(true)
  })
});

describe('Can add item to cart', () => {
  let cart = []
  beforeEach(() => {
    cart = []
  })

  test("can add item to cart", () => {
    expect(addToCart(product, cart)).toHaveLength(1)
  })
  test("returns an array", () => {
    let newCart = addToCart(product, cart)
    expect(Array.isArray(newCart)).toBeTruthy()
  })
  test("update quantity when adding repeat item", () => {
    let newCart = addToCart(product, cart)
    expect(addToCart(product, newCart)).toHaveLength(1)
  })
  test("added items have quantity property", () => {
    expect(addToCart(product, cart)[0]).toHaveProperty("qty")
  })

  test("should not modify the product", () => {
    addToCart(product, cart)
    expect(product).not.toHaveProperty("qty")
  })
  test("should not modify the cart", () => {
    expect(addToCart(product, cart)).not.toBe(cart)
  })
  test("if adding item that is not already in the cart the length should increase by 1", () => {
    let newCart = addToCart(product, cart)
    expect(addToCart({id: 5, name: "Bloons"}, newCart)).toHaveLength(newCart.length + 1)
  })
});

describe('can calculate sub total', () => {
  test("should be able to return sub total for item with quantity of 1", () => {
    let product = {
      id: 1,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: 1
    }
    expect(calculateSubTotal(product)).toBe("69.41")
  })
  test("should be able to give the sub total for items with quantity greater than 1", () => {
    let product = {
      id: 1,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: 3
    }
    expect(calculateSubTotal(product)).toBe("208.23")
  })
  test("if price is anything but a number throw an error", () => {
    let product = {
      id: 1,
      product: 'Fillets',
      price: "69.41",
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: 3
    }
    expect(() => calculateSubTotal(product)).toThrowError("The price of the product must be a number")
  })
  test("if qty is not a number throw an error", () => {
    let product = {
      id: 1,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: "3"
    }
    expect(() => calculateSubTotal(product)).toThrowError("The qty of the product must be a number")
  })
  test("see if product has qty property if not throw an error", () => {
    expect(() => calculateSubTotal({
      id: 1,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg'
    })).toThrowError("Product must have both price and quantity property")
  })
  test("see if product has price property if not throw an error", () => {
    expect(() => calculateSubTotal({
      id: 1,
      product: 'Fillets',
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: 5
    })).toThrowError("Product must have both price and quantity property")
  })
});

describe('can calculate Total', () => {
  let cart = []
  let product = {
    id: 1,
    product: 'Fillets',
    price: 69.41,
    image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
    qty: 1
  }
  beforeEach(() => {
    cart = []
  })

  test("can use .reduce to get the total", () => {
    cart.push(product)
    cart.push(product)
    cart.push(product)
    expect(calculateTotal(cart, 6.85)).toBe("215.08")
  })
  test("cart should be an array if not throw an error", () => {
    expect(() => calculateTotal("Dafafd", 6.85)).toThrowError("Cart must be an array")
  })
  test("if cart is empty return 0.00", () => {
    expect(calculateTotal([], 6.85)).toBe("0.00")
  })
  test("if tax is not a number throw an error", () => {
    cart.push(product)
    cart.push(product)
    cart.push(product)
    expect(() => calculateTotal(cart, "fadkj")).toThrowError("Tax must be a number")
  })
});

describe('can remove item', () => {
  let cart = [
    {
      id: 1,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: 1
    },
    {
      id: 2,
      product: 'Fillets',
      price: 69.41,
      image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
      qty: 5
    }
  ]
  test("can minus 1 from products quantity", () => {
    expect(removeItem(cart, 2)).toHaveLength(2)
  })
  test("can remove item if qty is less then 1", () => {
    expect(removeItem(cart, 1)).toHaveLength(1)
  })
  test("cart is not being modified", () => {
    expect(removeItem(cart, 1)).not.toBe(cart)
  })
});
