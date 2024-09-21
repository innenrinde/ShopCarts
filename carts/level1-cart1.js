/**
 * Simple cart with amount of products
 * @param {Object} cart
 * @return {number}
 */
function total(cart) {
  let products = cart.products ?? [];
  
  let total = 0;
    products.forEach(product => {
    let price = product.promotion ? product.promotion : product.price;
    total += product.quantity*price;
  });

  return total;  
}

export {
  total as CartNoDiscountAndShipping
}
