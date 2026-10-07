import { toSafeNumber } from './validation.js';

/**
 * Farm cost and profit formulas.
 * All money values are treated as rupees. Yield and price use the same unit
 * the farmer typed (for example quintals and ₹ per quintal).
 */
export function calculateFarmProfit(input) {
  const seed = toSafeNumber(input.seed);
  const fertilizer = toSafeNumber(input.fertilizer);
  const labour = toSafeNumber(input.labour);
  const irrigation = toSafeNumber(input.irrigation);
  const pesticide = toSafeNumber(input.pesticide);
  const other = toSafeNumber(input.other);
  const expectedYield = toSafeNumber(input.expectedYield);
  const sellingPrice = toSafeNumber(input.sellingPrice);

  // Total Cost = sum of all expenses
  const totalCost = seed + fertilizer + labour + irrigation + pesticide + other;

  // Expected Revenue = Expected Yield × Selling Price per Unit
  const expectedRevenue = expectedYield * sellingPrice;

  // Profit/Loss = Expected Revenue − Total Cost
  const profitLoss = expectedRevenue - totalCost;

  // Cost per Unit = Total Cost ÷ Expected Yield (only when yield > 0)
  const costPerUnit = expectedYield > 0 ? totalCost / expectedYield : null;

  // Profit Margin % = (Profit ÷ Revenue) × 100 (only when revenue > 0)
  const profitMargin = expectedRevenue > 0 ? (profitLoss / expectedRevenue) * 100 : null;

  return {
    totalCost,
    expectedRevenue,
    profitLoss,
    costPerUnit,
    profitMargin,
    isProfit: profitLoss >= 0,
  };
}

export function estimatedNetSellingValue(pricePerQuintal, transportCost) {
  const price = toSafeNumber(pricePerQuintal);
  const transport = toSafeNumber(transportCost);
  return price - transport;
}
