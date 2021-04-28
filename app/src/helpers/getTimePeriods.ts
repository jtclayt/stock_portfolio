/**
 * Break down an annual amount into semi monthly, monthly, and annual values.
 * @param netAnnual The annual sum of money.
 * @returns List with semi monthly, monthly, and annual values.
 */
const getTimePeriods = (netAnnual: number) => {
  const MONTHS_IN_YEAR = 12;
  const PAYCHECKS_IN_MONTH = 2;

  const monthly = netAnnual / MONTHS_IN_YEAR;
  const semiMonthly = monthly / PAYCHECKS_IN_MONTH;
  return [semiMonthly, monthly, netAnnual];
};

export default getTimePeriods;
