import { it, expect, describe } from "vitest";
import { cartContent, TOTAL, TOTAL_WITH_DISCOUNT_AND_SHIPPING } from "./data/cart";
import { CartNoDiscountAndShipping } from "../carts/level1-cart1";
import { CartWithDiscountAndShipping } from "../carts/level1-cart2";
import { CartObjectWithDiscountAndShipping } from "../carts/level1-cart3";


describe("cart level1 total products", () => {
	it(`cart - total products should be ${TOTAL}`, () => {
		let total = CartNoDiscountAndShipping(cartContent);
		expect(total).toBe(TOTAL);
	});

	it(`cart with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let total = CartWithDiscountAndShipping(cartContent);
		expect(total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});

	it(`cart as object with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let cart = CartObjectWithDiscountAndShipping;
		cart.products = cartContent.products;
		cart.discount = cartContent.discount;
		cart.shipping = cartContent.shipping;

		expect(cart.total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});

	it(`carts same total`, () => {
		let total = CartWithDiscountAndShipping(cartContent);

		let cart = CartObjectWithDiscountAndShipping;
		cart.products = cartContent.products;
		cart.discount = cartContent.discount;
		cart.shipping = cartContent.shipping;

		expect(cart.total).toBe(total);
	});
});