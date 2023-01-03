import { invoiceData } from './invoice-data';

type customeridAsKey = string;
type amount = number;
type customerTotalAmounts = Record<customeridAsKey, amount>;
type sortedCustomers = [customeridAsKey, amount][];

// 1. Aggregate data
const customerTotalAmounts: customerTotalAmounts = {};
for (const { customer: customer, amount: amount } of invoiceData) {
  // initiate new customer
  if (customerTotalAmounts[customer] === undefined) {
    customerTotalAmounts[customer] = 0;
  }
  // add new amount to customer's total
  customerTotalAmounts[customer] += amount;
}

// 2. Sort customers by amount
const sortedCustomers = Object.entries(customerTotalAmounts).sort(
  ([, amountA], [, amountB]) => amountB - amountA
);

// 3. Print top 10 customers
console.log(sortedCustomers.slice(0, 10));

// Write a script to find the ten customers who have spent the most overall
// The output should be sorted by the amount spent and include the customer ID.
// For example:
// 77: 123433
// 32: 22421
// 17: 2234
// 98: 18421
// ...
