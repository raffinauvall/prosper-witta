import assert from "node:assert/strict";
import { productPath, productSlug } from "./product-url.mjs";

assert.equal(productSlug("SURFANT HEL-40A (PEG 40 HCO)"), "surfant-hel-40a-peg-40-hco");
assert.equal(productSlug("Crème & Oil"), "creme-oil");
assert.equal(productPath({ id: 12, name: "Ucarcide 50" }), "/products/item/12/ucarcide-50");

console.log("product URL checks passed");
