# Topline integration interview project

Thanks for taking the time to interview! We really appreciate it, and we hope to see the best of your work.

## Rules

Please do this interview project on your own, without the help of anyone else.
With that being said, you are more than welcome to use the internet.
Google and Stack Overflow are invaluable tools in our daily lives, and we wouldn't expect you to do your best work without them.

We'd really like to see every part of your development process, so please _record your screen while you work_.

In addition to writing the code required by the instructions, write down your answers to the questions in the instructions directly in this README file.
Most of the questions are open ended, and you don't need to make your code handle the questions below each prompt, but please make sure your code works before moving on to the next question.
Clear writing and expressing your ideas is just as valuable as writing great code.

## Getting started

Make a fork of this repo on your own GitHub account and then clone it down to your personal computer.

- Read through the files in the `/src` directory.
- Install dependencies for the project with `yarn install`.
- Run `yarn part-0` to run the `/src/min-max-mean-invoice.ts` script.
  Read over the script to get a sense of how we're importing the data from a file.
  We're cutting some corners to make things easier for this interview.
  Use this script as a rough guide when writing your own scripts.

## Instructions

1. Implement the `top-ten-customers.ts` script. Use `yarn part-1` to run the script, and paste your output and the answers to the questions below.

- How does your solution scale with the number of invoices? How about the number of customers?

2. Implement the `customers-by-cohort.ts` script. Use `yarn part-2` to run the script, and paste your output and the answers to the questions below.

- How does your solution scale with the number of invoices? How about the number of customers?
- Does your solution depend on whether the invoice data is sorted?

3. Implement the `revenue-by-cohort.ts` script. Use `yarn part-3` to run the script, and paste your output and the answers to the questions below.

- How does your solution scale with the number of invoices? How about the number of customers?
- Does your solution depend on whether the invoice data is sorted?

## Tips

- All of the questions have a desired output format that can require a lot of string mangling.
  If you're stuck on the formatting part, move on to the next question and get back to formatting later.
- Git is your friend. Commit often and use descriptive commit messages. Push your work to GitHub so you don't lose it.
- Get it working and then make it look good. Don't get lost in the perfect solution before you have a working solution.
- Write down your responses to all the questions in the prompt before moving on to the next prompt.
- Include more comments than you would in normal code. This will help us understand your thought process.
- Take breaks when you need them.
- You don't have to finish all of the prompts. We prefer thorough, well thought out responses over a complete solution without written responses.

## Responses

Please write your responses to the questions in the instructions here. Please indicate any tradeoffs you made.

<br />

### 1. Top ten customers:

```
  [ '65', 30846 ],
  [ '21', 29686 ],
  [ '100', 28979 ],
  [ '64', 26915 ],
  [ '41', 26807 ],
  [ '99', 26778 ],
  [ '47', 26326 ],
  [ '72', 24977 ],
  [ '98', 24595 ],
  [ '73', 24422 ]
```

I'm first using an object (dictionary) to add each amount to the customer's total with minimal complexity.

Then sorting the aggregated data. JavaScript [].sort is O(n log n) complexity which is better than doing a binary search every time we add a new amount to the customer's total. This is looping over the data just once to sort everything at the very end.

The only part to worry about scale is that [].sort() operation, but that is said to be pretty efficient.

<br />

### 2. Customers by cohort

```
  '2020-01': [
    10, 11, 13, 14, 15, 17, 20, 21, 23,
    27, 28, 30, 34, 39, 40, 42, 44, 51,
    65, 70, 72, 73, 78, 80, 83, 84, 89,
    92, 96, 98, 99
  ],
  '2020-02': [
     3,  8, 24, 32, 33, 37,
    41, 45, 50, 56, 59, 61,
    67, 81, 82, 86
  ],
  '2020-03': [
     4,  5, 12, 19, 25,
    47, 48, 55, 77, 90,
    93, 94
  ],
```

O(n) + loop once for each year and month. So it scales very well!

There is a one line commented out [].sort() because the current invoice data already seems to be sorted by customer id. So that would add extra complexity. I don't really know how to avoid that. Would have to think about it more.

<br />

### 3. Revenue by cohort

```
│ (index) │ 2020-01 │ 2020-02 │ 2020-03 │ 2020-04
| 2020-01 │  50100  │  14299  │  16225  │  24260
│ 2020-02 │    0    │  27840  │  10013  │  4522
│ 2020-03 │    0    │    0    │  24190  │    0
│ 2020-04 │    0    │    0    │    0    │  17133
```

This took me too long. BUT I think it is efficient. I'm only looping over the invoice data once (O(n)), so that's pretty awesome! I am looping over each year/month and then for each of those each year/month AGAIN. It looks ugly. That's what took me so long. I was trying to avoid this, fell into that trap. But no reason to avoid that I realized because there are not that many years/months, so it doesn't take long at all to loop over them.

This scales as (O(n)) plus a fixed number of loops for the number of years and months. So it scales very well.

This does not depend on whether the invoice data is sorted.

I honestly need practice with this sort of thing. But with practice should be able to complete these types of things much faster in the future.

<br />

## Submitting

> Videos uploaded here: https://techytools.notion.site/TopLine-6ef32fbc894c44c899eeaf0959f62388

To submit your code, send us a link to your repo.
Once we confirm that we've downloaded your work, please delete the repo you created so future candidates don't accidentally find your solution.

To submit your screen recording, upload the video to YouTube as "Private" in the "Visibility" section and use the "Share Privately" button to share it with elliot@growtopline.com.
If you'd prefer not to upload the video to YouTube, email elliot@growtopline.com and we can figure out an alternative.
