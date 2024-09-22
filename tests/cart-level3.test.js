import { it, expect, describe } from "vitest";
import { cartContent, TOTAL_WITH_DISCOUNT_AND_SHIPPING } from "./data/cart";
import { ShopCart as ShopCart2 } from "../carts/level2-cart5";
import { ShopCart as ShopCart31 } from "../carts/level3-cart6-1";
import { ShopCart as ShopCart32 } from "../carts/level3-cart6-2";

describe("cart level3 total products", () => {
	it(`cart class 31 with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let shop = new ShopCart31(cartContent);
		expect(shop.total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});

	it(`cart class 32 with discount and shipping - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let shop = new ShopCart32(cartContent);
		expect(shop.total).toBe(TOTAL_WITH_DISCOUNT_AND_SHIPPING);
	});

	it(`cart class - three carts with same total value - total products should be ${TOTAL_WITH_DISCOUNT_AND_SHIPPING}`, () => {
		let shop1 = new ShopCart2(cartContent);
		let shop2 = new ShopCart31(cartContent);
		let shop3 = new ShopCart32(cartContent);
		expect(shop1.total).toBe(shop2.total);
		expect(shop2.total).toBe(shop3.total);
	});
});