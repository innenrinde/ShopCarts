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
  
    return products.value() - discount.value() + shipping.value();
  }
});

/**
 * Process products list to get amount value
 * @param {Array} products
 */
function ProductsList({ products }) {
  let total = 0;
  products.forEach(product => {
    let price = product.promotion ?? product.price;
    total += product.quantity * price;
  });
  
  this.value = () => total;
}

/**
 * Manage discount
 * @param {Array} products
 * @param {Object} discount
 */
function Discount({ products, discount }) {
  let value = 0;
  
  if (discount.value) {
    if (discount.percent) {

      let total = 0;
      products.forEach(product => {
        let price = product.promotion ?? product.price;
        total += product.quantity * price;
      });
      
      value = discount.value*total/100;
    } else {
      value = discount.value;
    }
  }
  
  this.value = () => value;
}

/**
 * Manage shipping tax
 * @param {Object} shipping
 */
function Shipping({ shipping }) {
    let value = shipping.value ?? 0;
  
    this.value = () => value;
}

export {
  cart as CartObjectWithDiscountAndShipping
}