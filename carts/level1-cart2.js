function total(cart) {
  let products = cart.products ?? [];
  let discount = cart.discount ?? {};
  let shipping = cart.shipping ?? {};
  
  let total = 0;
  products.forEach(product => {
    let price = product.promotion ?? product.price;
    total += product.quantity * price;
  });
  
  
  if (discount.value) {
    if (discount.percent) {
      total -= discount.value*total/100;
    } else {
      total -= discount.value;
    }
  }
  
  if (shipping.value) {
    total += shipping.value;
  }

  return total;  
}

export {
  total as CartWithDiscountAndShipping
}