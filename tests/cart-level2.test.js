import { it, expect, describe } from "vitest";
import { cartContent, TOTAL_WITH_DISCOUNT_AND_SHIPPING } from "./data/cart";
import { CartObjectWithDiscountAndShipping as CartObject1 } from "../carts/level1-cart3";
import { CartObjectWithDiscountAndShipping as CartObject2 } from "../carts/level2-cart4";
import { ShopCart } from "../carts/level2-cart5";

let cart1 = null;
let cart2 = null;
beforeEach(() => {
	cart1 = CartObject1;
	cart2 = CartObject2;
	cart1.products = cart2.products = cartContent.products;
	cart1.discount = cart2.discount = cartContent.discount;
	cart1.shipping = cart2.shipping = cartContent.shipping;
});

describe("cart level2 total products", () => {
	it(`cart as object with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		expect(cart1.total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});

	it(`two cart as object with discount and shipping - same total`, () => {
		expect(cart1.total).toBe(cart2.total);
	});

	it(`cart class with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let shop = new ShopCart(cartContent);
		expect(shop.total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});
});