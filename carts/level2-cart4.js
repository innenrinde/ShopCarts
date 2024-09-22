/**
 * Cart as object with mutual logic for discount and shipping
 * @type {{ products: [], discount: {}, shipping: {} }}
 */
let cart = {};

Object.defineProperty(cart, 'total', {
  get: function() {
    
    let products = new ProductsList(this);
    let discount = new Discount(this);
    let shipping = new Shipping(this);
  
    return products.value - discount.value + shipping.value;
  }
});

/**
 * Manage list of products
 */
class ProductsList {

  /**
   * Total amount
   * @type {Number}
   */
  #total = null;

  /**
   * Products list with unit price and quantity
   * @type {Array}
   */
  #products = [];
  
  constructor({ products }) {
    this.#products = products;
  }
  
  #getProductsValue() {
    let total = 0;
    this.#products.forEach(product => {
      let price = product.promotion ?? product.price;
      total += product.quantity * price;
    });

    return total;
  }

  get value() {
    if (this.#total === null) {
      this.#total = this.#getProductsValue();  
    }
    
    return this.#total;
  }
}

/**
 * Manage discount value
 */
class Discount {

  /**
   * Discount value
   * @type {number|null}
   */
  #value = null;

  /**
   * List of products
   * @type {Array}
   */
  #products = [];

  /**
   * Init discount data
   * @type {Object}
   */
  #discount = {};      
  
  constructor({ products, discount }) {
    this.#products = products;
    this.#discount = discount;
  }
    
  #getProductsValue() {
    let total = 0;
    this.#products.forEach(product => {
      let price = product.promotion ?? product.price;
      total += product.quantity * price;
    });

    return total;
  }
  
  #getDiscountValue() {
    if (this.#discount.value) {
      if (this.#discount.percent) {
        return this.#discount.value * this.#getProductsValue()/100;
      } else {
        return this.#discount.value;
      }
    }
  }
  
  get value() {
    if (this.#value === null) {
       this.#value = this.#getDiscountValue();
    }
    
    return this.#value;
  }
}

/**
 * Manage shipping tax
 */
class Shipping {

  /**
   * @type {number}
   */
  #value = 0;
  
  constructor({ shipping }) {
    this.#value = shipping.value ?? 0;
  }
  
  get value() {
    return this.#value;
  }
}

export {
  cart as CartObjectWithDiscountAndShipping
}