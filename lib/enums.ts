export const ANIMALS = [
  "CHICKEN",
  "GOAT",
  "SWINE",
  "CATTLE",
  "TURKEY",
  "SHEEP",
] as const;

export const PRODUCTS = [
  "EGGS",
  "MEAT",
  "LIVE_ANIMAL",
  "BREEDING_STOCK",
  "MILK",
] as const;

export type Animal = (typeof ANIMALS)[number];
export type Product = (typeof PRODUCTS)[number];

// Narrows a plain string to one of the allowed values.
export function isOneOf<T extends readonly string[]>(
  list: T,
  value: string,
): value is T[number] {
  return (list as readonly string[]).includes(value);
}
