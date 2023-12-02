import { input2 as input } from "./data/dummy.mjs";

const rows = input.split("\n").filter((s) => s !== "");

const allowedNumbers = [
  { number: 1, string: "one" },
  { number: 2, string: "two" },
  { number: 3, string: "three" },
  { number: 4, string: "four" },
  { number: 5, string: "five" },
  { number: 6, string: "six" },
  { number: 7, string: "seven" },
  { number: 8, string: "eight" },
  { number: 9, string: "nine" },
];

const sol2 = rows.reduce((prev, next) => {
  const nums = [];

  allowedNumbers.forEach((allowedNumber) => {
    let letterRegexp = new RegExp(allowedNumber.string, "gi");
    let numberRegexp = new RegExp(allowedNumber.number, "gi");

    const letterMatches = [...next.matchAll(letterRegexp)];
    const numberMatches = [...next.matchAll(numberRegexp)];

    letterMatches.forEach((match) => {
      nums[match.index] = String(allowedNumber.number);
    });

    numberMatches.forEach((match) => {
      nums[match.index] = String(allowedNumber.number);
    });
  });

  const numbers = nums.filter(Boolean);

  let sol;
  if (numbers.length > 1) {
    sol = Number(numbers.at(0) + numbers.at(-1));
  } else {
    sol = Number(numbers.at(0) + numbers.at(0));
  }

  return prev + sol;
}, 0);

console.log({
  sol2,
});
