import { it, expect, describe } from "vitest";
import { cartContent, TOTAL_WITH_DISCOUNT_AND_SHIPPING } from "./data/cart";
import { CartObjectWithDiscountAndShipping as CartObject1 } from "../carts/level1-cart3";
import { CartObjectWithDiscountAndShipping as CartObject2 } from "../carts/level2-cart4";

describe("cart level2 total products", () => {
	it(`cart as object with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let cart = CartObject2;
		cart.products = cartContent.products;
		cart.discount = cartContent.discount;
		cart.shipping = cartContent.shipping;

		expect(cart.total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});

	it(`cart as object with discount and shipping - same total`, () => {
		let cart1 = CartObject1;
		let cart2 = CartObject2;
		cart1.products = cart2.products = cartContent.products;
		cart1.discount = cart2.discount = cartContent.discount;
		cart1.shipping = cart2.shipping = cartContent.shipping;

		expect(cart1.total).toBe(cart2.total);
	});
});