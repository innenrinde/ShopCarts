/**
 * Shop cart with discount and shipping
 */
class ShopCart {
  
  #total = 0;
  
  #totalProducts = null;
  
  #cart = {};
  
  constructor(cart) {
      this.#cart = cart;
  }

  get products() {
    return this.#cart.products;
  }

  get discount() {
    return this.#cart.discount;
  }

  get shipping() {
    return this.#cart.shipping;
  }

  get totalProducts() {
    if (this.#totalProducts === null) {
       this.#totalProducts = 0;
       this.products.forEach(product => {
        let price = product.promotion ?? product.price;
        this.#totalProducts += product.quantity * price;
      }); 
    }
    
    return this.#totalProducts;
  }

  get total() {
    let products = new ProductsList(this);
    let discount = new Discount(this);
    let shipping = new Shipping(this);
  
    return products.value - discount.value + shipping.value;
  }
  
}

/**
 * Manage products list
 */
class ProductsList {
  
  #total = null;
  
  #shopCart = {};
  
  constructor(shopCart) {
    this.#shopCart = shopCart;
  }
 
  get value() {
    if (this.#total === null) {
      this.#total = this.#shopCart.totalProducts;  
    }
    
    return this.#total;
  }
}

/**
 * Manage discount
 */
class Discount {
  
  #value = null;
        
  #shopCart = [];
        
  #discount = {};      
  
  constructor(shopCart) {
    this.#shopCart = shopCart;
    this.#discount = shopCart.discount;
  }
  
  #getDiscountValue() {
    if (this.#discount.value) {
      if (this.#discount.percent) {
        return this.#discount.value * this.#shopCart.totalProducts/100;
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
 * Manage shipping
 */
class Shipping {
  
  #value = 0;
  
  constructor(shopCart) {
    this.#value = shopCart.shipping.value ?? 0;
  }
  
  get value() {
    return this.#value;
  }
}

export { ShopCart };