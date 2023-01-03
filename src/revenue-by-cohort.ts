import { invoiceData } from './invoice-data';

type customerIdAsKey = string;
type amount = number;
type yearMo = string;

/**
 * Temporary values to help calculate solution
 */
const amountByMonthANDCohort: Record<string, amount> = {};
const customerCohort: Record<customerIdAsKey, yearMo> = {};
let yearMin = 0;
let yearMax = 0;
let monthMin = 0;
let monthMax = 0;

/**
 * Solution value - sorted ascending by cohort and month
 */
const amountsByMonthByCohort: Record<string, Record<yearMo, amount>> = {};

// 1. Add each customer amount to correct cohort and month
for (const {
  customer: customer,
  amount: amount,
  timestamp: timestamp,
} of invoiceData) {
  // get year of timestamp
  const year = new Date(timestamp).getFullYear();
  // get month of timestamp
  const month = new Date(timestamp).getMonth() + 1;
  // build YYYY-MM string from timestamp
  const yearMo = year.toString() + '-' + month.toString().padStart(2, '0');

  // get or set customer cohort
  let cohort = customerCohort[customer] || yearMo;
  if (!customerCohort[customer]) {
    customerCohort[customer] = cohort;
  }

  // amount by month and cohort
  if (!amountByMonthANDCohort[cohort + yearMo]) {
    amountByMonthANDCohort[cohort + yearMo] = 0;
  }
  amountByMonthANDCohort[cohort + yearMo] += amount;

  // range of cohorts and months
  if (yearMin === 0 || year < yearMin) {
    yearMin = year;
  }
  if (year > yearMax) {
    yearMax = year;
  }
  if (monthMin === 0 || month < monthMin) {
    monthMin = month;
  }
  if (month > monthMax) {
    monthMax = month;
  }
}

// 2. Sort
// loop through each cohort
for (let year = yearMin; year <= yearMax; year++) {
  for (let month = monthMin; month <= monthMax; month++) {
    // cohort
    const cohort = year.toString() + '-' + month.toString().padStart(2, '0');
    amountsByMonthByCohort[cohort] = {};
    // in each cohort, loop through each month
    for (let year = yearMin; year <= yearMax; year++) {
      for (let month = monthMin; month <= monthMax; month++) {
        // month
        const yearMo =
          year.toString() + '-' + month.toString().padStart(2, '0');
        // amount
        amountsByMonthByCohort[cohort][yearMo] =
          amountByMonthANDCohort[cohort + yearMo] || 0;
      }
    }
  }
}

// 3. Print customers by cohort
console.table(amountsByMonthByCohort);

// Write a script to calculate the revenue from each cohort for each month.
// The output should be a grid with months across the x axis and cohorts along the y axis

/*
For example:

                  2020-01, 2020-02,  2020-03, ...
Cohort: 2020-01:   223143,    2142,     9870, ...
Cohort: 2020-02:        0,    1288,     1288, ...
Cohort: 2020-03:        0,       0,    29212, ...
    ...:      ...,     ...       ...  ...
*/
// console.table({
//   '2020-01': {
//     '2020-01': 223143,
//     '2020-02': 2142,
//     '2020-03': 9870,
//   },
//   '2020-02': {
//     '2020-01': 0,
//     '2020-02': 1288,
//     '2020-03': 1288,
//   },
//   '2020-03': {
//     '2020-01': 0,
//     '2020-02': 0,
//     '2020-03': 29212,
//   },
// });
