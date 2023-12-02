import { input } from "./data/dummy.mjs";

const rows = input.split("\n").filter((s) => s !== "");

const sol1 = rows.reduce((prev, next) => {
  const letters = [...next];

  const numbers = letters.filter((letter) => {
    return isFinite(letter);
  });

  console.log(numbers);

  if (numbers.length > 1) {
    return prev + Number(numbers.at(0) + numbers.at(-1));
  } else {
    return prev + Number(String(numbers[0]) + String(numbers[0]));
  }
}, 0);

console.log({ sol1 });
