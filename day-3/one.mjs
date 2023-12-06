import { input } from "./data/dummy.mjs";

import _ from "lodash";
const { range } = _;

const lines = input.split("\n").filter((s) => s !== "");
const rowLength = lines[0].length;
const rows = lines.join("");

const numbers = rows.match(/\d+/g);

console.log({ rows });

const positions = [];

numbers.forEach((number) => {
  const start = rows.indexOf(number);

  const numbers = range(start, start + number.length);
  positions.push({ numbers, number: Number(number) });
});

const getAdjacentCells = (cellIndex, rowLength) => {
  // TODO!
};

const res = positions
  // .slice(0, 1)
  .filter(({ numbers, number }) => {
    console.log({ numbers });
    // console.log({ start, length, number });
    //
    const surroundingLetters = numbers
      .map((index) => getAdjacentCells(index, rowLength))
      .flat()
      // .map((cell) => rows.charAt(cell))
      .join("");
    // const values = cells.map((cell) => rows.charAt(cell));
    console.log(surroundingLetters);

    // const regex = new RegExp("[^a-zA-Z0-9.]", "gi");
    // const matches = surroundingLetters.search(regex) === -1;
    // // console.log({ matches });

    // return matches;
    // console.log({ number, values });
  });
// .reduce((acc, { number }) => acc + number, 0);

// const totalNumbers = numbers.reduce((acc, num) => acc + Number(num), 0);

// console.log({
//   res,
//   numbers: totalNumbers,
//   diff: totalNumbers - res,
// });
