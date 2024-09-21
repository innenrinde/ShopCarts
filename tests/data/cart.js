export const cartContent = {
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

export const TOTAL = 166;

export const TOTAL_WITH_DISCOUNT_AND_SHIPPING = 164.4;