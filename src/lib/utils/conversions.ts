import type { Uom } from '$lib/types/prisma-model-types';

// General Weight Unit Conversions
// convert grams to pounds
export const gramsToPounds = (grams: number) => {
	return grams / 453.592;
};

// convert pounds to grams
export const poundsToGrams = (pounds: number) => {
	return pounds / 0.00220462;
};

// convert grams to ounces
export const gramsToOunces = (grams: number) => {
	return grams / 28.3495;
};

// convert ounces to grams
export const ouncesToGrams = (ounces: number) => {
	return ounces / 0.035274;
};

// convert pounds to ounces
export const poundsToOunces = (pounds: number) => {
	return pounds / 0.0625;
};

// convert ounces to pounds
export const ouncesToPounds = (ounces: number) => {
	return ounces / 16;
};

// convert grams to kilograms
export const gramsToKilograms = (grams: number) => {
	return grams * 1000;
};

// convert kilograms to grams
export const kilogramsToGrams = (kilograms: number) => {
	return kilograms / 1000;
};

// convert pounds to kilograms
export const poundsToKilograms = (pounds: number) => {
	return pounds / 2.20462;
};

// convert kilograms to pounds
export const kilogramsToPounds = (kilograms: number) => {
	return kilograms * 2.20462;
};

// convert ounces to kilograms
export const ouncesToKilograms = (ounces: number) => {
	return ounces / 35.274;
};

// convert kilograms to ounces
export const kilogramsToOunces = (kilograms: number) => {
	return kilograms * 35.274;
};

// Product specific conversions
// convert single to two-pack
export const singleToTwoPack = (single: number) => {
	return single / 2;
};

// convert two-pack to single
export const twoPackToSingle = (twoPack: number) => {
	return twoPack * 2;
};

export const packageUnitConverter = (
	parentUom: Uom,
	childUom: Uom,
	parentQuantity: number,
	childQuantity: number
) => {
	let convertedQuantity = 0;

	switch (parentUom.name.toLowerCase()) {
		case 'grams':
			switch (childUom.name.toLowerCase()) {
				case 'grams':
					convertedQuantity = childQuantity;
					break;
				case 'pounds':
					convertedQuantity = poundsToGrams(childQuantity);
					break;
				case 'ounces':
					convertedQuantity = ouncesToGrams(childQuantity);
					break;
				case 'kilograms':
					convertedQuantity = kilogramsToGrams(childQuantity);
					break;
				default:
					break;
			}
			break;
		case 'ounces':
			switch (childUom.name.toLowerCase()) {
				case 'ounces':
					convertedQuantity = childQuantity;
					break;
				case 'pounds':
					convertedQuantity = poundsToOunces(childQuantity);
					break;
				case 'grams':
					convertedQuantity = gramsToOunces(childQuantity);
					break;
				case 'kilograms':
					convertedQuantity = kilogramsToOunces(childQuantity);
					break;
				default:
					break;
			}
			break;
		case 'pounds':
			switch (childUom.name.toLowerCase()) {
				case 'pounds':
					convertedQuantity = childQuantity;
					break;
				case 'ounces':
					convertedQuantity = ouncesToPounds(childQuantity);
					break;
				case 'grams':
					convertedQuantity = gramsToPounds(childQuantity);
					break;
				case 'kilograms':
					convertedQuantity = kilogramsToPounds(childQuantity);
					break;
				default:
					break;
			}
			break;
		case 'kilograms':
			switch (childUom.name.toLowerCase()) {
				case 'kilograms':
					convertedQuantity = childQuantity;
					break;
				case 'ounces':
					convertedQuantity = ouncesToKilograms(childQuantity);
					break;
				case 'grams':
					convertedQuantity = gramsToKilograms(childQuantity);
					break;
				case 'pounds':
					convertedQuantity = poundsToKilograms(childQuantity);
					break;
				default:
					break;
			}
			break;
		case 'each':
			switch (childUom.name.toLowerCase()) {
				case 'each':
					convertedQuantity = childQuantity;
					break;
				default:
					break;
			}
			break;
		default:
			convertedQuantity = parentQuantity;
			break;
	}

	return convertedQuantity;
};
