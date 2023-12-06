import { input } from "./data/dummy.mjs";

import _ from "lodash";
const { range } = _;

const lines = input
  .split("\n")
  .filter((s) => s !== "")
  .map((s) => s.split(""));
const rowLength = lines[0].length;
const rows = lines.join("");

// numbers.forEach((number) => {
//   const start = rows.indexOf(number);

//   const numbers = range(start, start + number.length);
//   positions.push({ numbers, number: Number(number) });
// });

const getAdjacentCells = (numbersInLine, lineIndex) => {
  // console.log({ numbersInLine, lineIndex });

  const line = lines[lineIndex].join("");
  const positions = numbersInLine
    .map((char) => {
      return range(line.indexOf(char), line.indexOf(char) + char.length);
      // return {
      //   start: line.indexOf(char),
      //   end: line.indexOf(char) + char.length - 1,
      // };
    })
    .flat();
  const mappedPositions = positions.map((position) => {
    const topLeft = lines[lineIndex - 1]?.[position - 1];
    const top = lines[lineIndex - 1]?.[position];
    const topRight = lines[lineIndex - 1]?.[position + 1];
    const left = lines[lineIndex]?.[position - 1];
    const right = lines[lineIndex]?.[position + 1];
    const bottom = lines[lineIndex + 1]?.[position];
    const bottomLeft = lines[lineIndex + 1]?.[position - 1];
    const bottomRight = lines[lineIndex + 1]?.[position + 1];

    return [
      topLeft,
      top,
      topRight,
      left,
      right,
      bottom,
      bottomLeft,
      bottomRight,
    ].filter(Boolean);
  });
  return mappedPositions;
  // console.log({ mappedPositions });
};

const res = lines
  // .slice(0, 3)
  .map((line, lineIndex) => {
    const numbers = line.join("").match(/\d+/g);

    if (!numbers) {
      return false;
    }

    const ac = getAdjacentCells(numbers, lineIndex).flat().join("");
    // console.log({ ac });

    // console.log({ numbers });
    // console.log({ start, length, number });
    //
    // const surroundingLetters = numbers.map((index) =>
    //   getAdjacentCells(index, rowLength)
    // );
    // .map((cell) => rows.charAt(cell))
    // .join("");

    // console.log({ surroundingLetters });
    // const values = cells.map((cell) => rows.charAt(cell));
    // console.log(surroundingLetters);

    // console.log({ matches });

    // return matches > 0 ? numbers : undefined;
    // console.log({ number, values });
    // return surroundingLetters.length > 0;

    console.log({ ac, numbers });
    const returnNumbers = numbers
      .map((num) => +num)
      .reduce((acc, num) => acc + num, 0);
    return {
      ac,
      numbers: returnNumbers,
    };
  })
  .filter(Boolean)
  .filter(({ ac, numbers }) => {
    const regex = new RegExp("[^a-zA-Z0-9.]", "gi");
    const matches = ac.search(regex);
    return matches > 0;
  })
  .flat()
  .filter(Boolean)
  .reduce((acc, num) => acc + +num.numbers, 0);

// const totalNumbers = numbers.reduce((acc, num) => acc + Number(num), 0);

console.log({
  res,
  // numbers: totalNumbers,
  // diff: totalNumbers - res,
});

// DEFINITELY NOT 512620
