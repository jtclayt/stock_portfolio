/**
 * Calculator for finding the effective tax rate given total taxable income.
 * Assumes married joint filing US taxes.
 * @param taxableIncome - Gross income.
 * @returns The effective tax rate.
 */
const taxRateCalculator = (taxableIncome: number) => {
  const rates = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
  const maxIncomes = [19900, 81050, 172750, 329850, 418850, 628300, Infinity];
  let taxOwed = 0;
  let lastMax = 0;
  let index = 0;

  while (taxableIncome > lastMax) {
    if (maxIncomes[index] > taxableIncome) {
      taxOwed += (taxableIncome - lastMax) * rates[index];
    } else {
      taxOwed += (maxIncomes[index] - lastMax) * rates[index];
    }
    lastMax = maxIncomes[index];
    index++;
  }

  return taxOwed / taxableIncome;
};

export default taxRateCalculator;
