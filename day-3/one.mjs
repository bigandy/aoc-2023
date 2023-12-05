import { input } from "./data/dummy.mjs";
import _ from "lodash";

const { range } = _;

const rows = input.split("\n").filter((s) => s !== "");
const stringRows = rows.join("");
const rowLength = rows[2].length;
console.log({ rowLength });

const numberRows = stringRows
  .split(/(\d+)/) // split string on numbers
  // .filter(Boolean) // remove empty array items
  .filter((item) => item.match(/\d+/g)); // only keep the numbers

// get the sum of all the numbers
const total = numberRows.reduce((prev, next) => prev + Number(next), 0);

console.log(total);

const getAdjacentCells = (cellIndex, rowLength) => {
  const topLeft = cellIndex - rowLength - 1;
  const topCenter = topLeft + 1;
  const topRight = topCenter + 1;

  const left = cellIndex - 1;
  const right = cellIndex + 1;

  const bottomLeft = cellIndex + rowLength - 1;
  const bottomCenter = bottomLeft + 1;
  const bottomRight = bottomCenter + 1;

  return [
    topLeft,
    topCenter,
    topRight,
    left,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight,
  ].filter((num) => num >= 0);
};

/**
 * get the starting index and end index of a string within another string.
 */
const getStartEnd = (searchString, fullString) => {
  const start = fullString.indexOf(searchString);
  const end = fullString.indexOf(searchString) + searchString.length - 1;

  return range(start, end + 1);
};

const withoutTouchingSymbol = numberRows
  // .slice(0, 3)
  .filter((number) => {
    const stringPositions = getStartEnd(number, stringRows);

    // get all the string positions of the numbers
    const surroundingLetters = stringPositions
      .map((numberPosition) => {
        const positions = getAdjacentCells(numberPosition, rowLength);

        const letters = positions
          .map((position) => {
            return stringRows.charAt(position);
          })
          .join("");

        return letters;
      })
      .join("");
    console.log({ surroundingLetters, number });

    const regex = new RegExp("[^a-zA-Z0-9.]", "gi");
    const matches = surroundingLetters.search(regex) === -1;

    return matches;
  })
  .reduce((prev, next) => prev + Number(next), 0);

console.log({ withoutTouchingSymbol, diff: total - withoutTouchingSymbol });

// DID NOT COMPLETE THIS AS I THINK I APPROACHED IT IN THE WRONG WAY. TO BE CONTINUED!
// x...x
// x.0.x
// x...x

// console.log(getAdjacentCells(1, 5));
// locations (7) = 1,2,3,6,8,11,12,13
