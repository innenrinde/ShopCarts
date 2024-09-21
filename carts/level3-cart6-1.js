let cart = {
  products: [
    {
      name: "Prod 1",
      price: 100,
	  promotion: 95,
      quantity: 1,
      tva: 9
    },
    {
      name: "Prod 2",
      price: 10,
      quantity: 2,
      tva: 9
    },
    {
      name: "Prod 3",
      price: 20,
	  promotion: 17,
      quantity: 3,
      tva: 19
    }
  ],
  discount: {
    name: "Promo code ABCD",
    value: 10,
    percent: true
  },
  shipping: {
    name: "Big Faster",
    value: 15
  }
};


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

class Shipping {
  
  #value = 0;
  
  constructor(shopCart) {
    this.#value = shopCart.shipping.value ?? 0;
  }
  
  get value() {
    return this.#value;
  }
}

let shopCart = new ShopCart(cart);

console.log("Total cart price: " + shopCart.total + " EUR");