import { invoiceData } from './invoice-data';

type customerFromDB = number;
type customerIdAsKey = string;
type yearMo = string;
type customerIds = customerFromDB[];

const cohortsFinal: Record<yearMo, customerIds> = {};
const cohortCustomers: Record<yearMo, Record<customerIdAsKey, true>> = {};
const customerCohort: Record<customerIdAsKey, yearMo> = {};
let yearMin = 0;
let yearMax = 0;
let monthMin = 0;
let monthMax = 0;

// 1. Aggregate data
for (const { customer: customer, timestamp: timestamp } of invoiceData) {
  // get year of timestamp
  const year = new Date(timestamp).getFullYear();
  // get month of timestamp
  const month = new Date(timestamp).getMonth() + 1;
  // build YYYY-MM string from timestamp
  const yearMo = year.toString() + '-' + month.toString().padStart(2, '0');

  // get or set customer cohort
  if (customerCohort[customer]) {
    continue;
  }
  customerCohort[customer] = yearMo;

  // save customer to cohort
  if (!cohortCustomers[yearMo]) {
    cohortCustomers[yearMo] = {};
  }
  cohortCustomers[yearMo][customer] = true;

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
    const yearMo = year.toString() + '-' + month.toString().padStart(2, '0');
    const customers = cohortCustomers[yearMo]
      ? Object.keys(cohortCustomers[yearMo]).map((c) => parseInt(c))
      : [];
    //.sort(); // optional - sort if invoice data is not already sorted
    cohortsFinal[yearMo] = customers;
  }
}

// 3. Print customers by cohort
console.log(cohortsFinal);

// Write a script to group each customer into their "cohort"
// A customer's cohort is the month they paid their first non-zero invoice.

// The output should look like [cohort]: [customer ids]
// It should be sorted vertically by date (ascending) left to right by customer ID (ascending)
// For example:
// 2020-01: [1, 18, 29]
// 2020-02: [5, 22, 89]
// ...
