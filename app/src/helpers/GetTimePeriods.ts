const GetTimePeriods = (netAnnual: number) => {
  const MONTHS_IN_YEAR = 12;
  const PAYCHECKS_IN_MONTH = 2;

  const monthly = netAnnual / MONTHS_IN_YEAR;
  const semiMonthly = monthly / PAYCHECKS_IN_MONTH;
  return [semiMonthly, monthly, netAnnual];
}

export default GetTimePeriods;
