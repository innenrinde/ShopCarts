/**
 * Shop cart with products list, discount option and shipping method
 */
class ShopCart {

  /**
   * @type {ProductsList}
   */
  #products = null;

  /**
   * @type {Discount}
   */
  #discount = null;

  /**
   * @type {Shipping}
   */
  #shipping = null;

  /**
   * @param {Object} cart
   */
  constructor(cart) {
      this.#products = new ProductsList(cart.products);
      this.#discount = new Discount(cart.discount, this.#products);
      this.#shipping = new Shipping(cart.shipping);
  }

  /**
   * @returns {Number}
   */
  get total() {  
    return this.#products.value - this.#discount.value + this.#shipping.value;
  }
  
}

/**
 * Manage a product entity
 */
class Product {

  /**
   * @type {String}
   */
  #name = "";

  /**
   * @type {Number}
   */
  #price = 0;

  /**
   * @type {Number}
   */
  #promotion = 0;

  /**
   * @type {Number}
   */
  #quantity = 0;

  /**
   * @type {Number}
   */
  #tva = 0;

  /**
   * @param {Object} data
   */
  constructor(data) {
    this.#name = data.name;
    this.#price = data.price;
    this.#promotion = data.promotion;
    this.#quantity = data.quantity;
    this.#tva = data.tva;
  }

  get price() {
    return this.#promotion ?? this.#price;
  }

  get quantity() {
    return this.#quantity;
  }
}

/**
 * Manage list of products
 */
class ProductsList {

  /**
   * Total cost of products
   * @type {Number|null}
   */
  #total = null;

  /**
   * List of products
   * @type {[Product]}
   */
  #products = [];

  /**
   * @param {Array} products
   */
  constructor(products = []) {
    this.#products = products.map(product => new Product(product));
  }

  /**
   * Calculate total price of products
   * @returns {Number}
   */
  #totalProducts() {
    let total = 0;
    this.#products.forEach(product => {
      total += product.quantity * product.price;
    }); 

    return total;
  }

  /**
   * Public method to retrieve products price
   * @returns {Number|null}
   */
  get value() {
    if (this.#total === null) {
      this.#total = this.#totalProducts();  
    }
    
    return this.#total;
  }
}

/**
 * Discount options
 */
class Discount {

  /**
   * Discount value
   * @type {Number|null}
   */
  #value = null;

  /**
   * @type {ProductsList}
   */
  #products = null;

  /**
   * @type {Object}
   */
  #discount = {};

  /**
   * @param {Object} discount
   * @param {ProductsList} products
   */
  constructor(discount, products) {
    this.#discount = discount;
    this.#products = products;
  }

  /**
   * Calculate discount value
   * @returns {Number}
   */
  #getDiscountValue() {
    if (this.#discount.value) {
      if (this.#discount.percent) {
        return this.#discount.value * this.#products.value/100;
      } else {
        return this.#discount.value;
      }
    }
    
    return 0;
  }

  /**
   * Public method to retrieve value of discount
   * @returns {Number|null}
   */
  get value() {
    if (this.#value === null) {
       this.#value = this.#getDiscountValue();
    }
    
    return this.#value;
  }
}

/**
 * Shipping options
 */
class Shipping {

  /**
   * Shipping price
   * @type {Number}
   */
  #value = 0;

  /**
   * @param {Object} shipping
   */
  constructor(shipping) {
    this.#value = shipping.value ?? 0;
  }

  /**
   * Public method to retrieve shipping price
   * @returns {Number}
   */
  get value() {
    return this.#value;
  }
}

export { ShopCart };