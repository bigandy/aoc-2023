import _ from "lodash";
const { range } = _;
import { input } from "./data/real.mjs";

const rows = input.split("\n").filter((s) => s !== "");
const stringRows = rows.join("");
const rowLength = rows[0].length;
// console.log({ rowLength });

const numberRows = stringRows
  .split(/(\d+)/) // split string on numbers
  .filter(Boolean) // remove empty array items
  .filter((item) => item.match(/\d+/g)); // only keep the numbers

const total = numberRows.reduce((prev, next) => prev + Number(next), 0);

/**
 * get the starting index and end index of a string within another string.
 */
const getStartEnd = (searchString, fullString) => {
  const start = fullString.indexOf(searchString);
  const end = fullString.indexOf(searchString) + searchString.length - 1;

  return range(start, end + 1);
};

const getAdjacentSymbols = (index, rowLength, searchString) => {
  //   // if row length is 10, the previous row in the same place is that index - 10
  const prevRow = index - rowLength;
  const nextRow = index + rowLength;

  const prevRowCell = prevRow > 0 ? searchString.charAt(prevRow) : "";
  const nextRowCell = nextRow > 0 ? searchString.charAt(nextRow) : "";
  const nextCell = searchString.charAt(index + 1);
  const prevCell = searchString.charAt(index - 1);
  const diagonalDownRight = searchString.charAt(nextRow + 1);
  const diagonalDownLeft = searchString.charAt(nextRow - 1);
  const diagonalUpRight = searchString.charAt(prevRow + 1);
  const diagonalUpLeft = searchString.charAt(prevRow - 1);

  const adjacentLetters = [
    prevRowCell,
    nextRowCell,
    nextCell,
    prevCell,
    diagonalDownLeft,
    diagonalDownRight,
    diagonalUpLeft,
    diagonalUpRight,
  ];

  return adjacentLetters.join("");
};

const rowIteration = numberRows
  // .slice(0, 1)
  .map((number) => {
    const stringPositions = getStartEnd(number, stringRows);
    console.log({ stringPositions, number });
    // get all the string positions of the numbers

    const surroundingLetters = stringPositions
      .map((numberPosition) => {
        const letters = getAdjacentSymbols(
          numberPosition,
          rowLength,
          stringRows
        );

        return letters;
      })
      .filter((letters) => {
        const regex = new RegExp("[^a-zA-Z0-9.]", "gi");
        return letters.search(regex) === -1;
      })
      .filter(Boolean);

    return surroundingLetters.length === 0;

    console.log({ surroundingLetters });

    //   // console.log({ arrayOfNumberPositions });
    //   const letters = arrayOfNumberPositions
    //     .map((positionIndex) => {
    //       const check = getAdjacentSymbols(positionIndex, rowLength, stringRows);
    //       // console.log({ check });
    //       //   return check;
    //       //   // return check;
    //       //   // console.log({ check: check.join("") });
    //       //   // return check.join("");
    //       return check;
    //     })
    //     .flat()
    //     .join("");
    //   console.log({ letters });
    //   // console.log({ checks: checks.length === 0 });
    //   // return checks.length !== 0;
    //   // .join("")
    //   // .map((characters) => {
    //   //   const specialReg = new RegExp("/[^a-zA-Z0-9.]/ig");
    //   //   // console.log({ characters, test: specialReg.test(characters) });
    //   //   return specialReg.test(characters);
    //   // });
    //   // .map((letters) => {
    //   //   var regex = /^[!@#\$%\^\&*\)\(+=._-]+$/g;
    //   //   console.log(regex.test(letters));
    //   //   return regex.test(letters);
    //   // });
    //   // if (arrayOfNumberPositions.length !)
    //   // console.log({ checks });
    //   // return checks;
    //   const regex = new RegExp("[^a-zA-Z0-9.]", "gi");
    //   const match = letters.match(regex);
    //   console.log({ match });
    //   return match === null;
    // });
    // // .filter((characters) => {
    // //   const specialReg = new RegExp(
    // //     '^(?=.*[!@#$%^&*"\\[\\]\\{\\}<>/\\(\\)=\\\\\\-_´+`~\\:;,€\\|])'
    // //   );
    // //   // console.log({ characters, test: specialReg.test(characters) });
    // //   return specialReg.test(characters);
    // // });
    // // .reduce((prev, next) => prev + Number(next), 0);
    // console.log({ res });
    // const resReduce = res.reduce((prev, next) => prev + Number(next), 0);
    // const total = numbers.reduce((prev, next) => prev + Number(next), 0);
    // console.log({
    //   total,
    //   resReduce,
    //   diff: total - resReduce,
  });

console.log({ rowIteration });

// DID NOT COMPLETE THIS AS I THINK I APPROACHED IT IN THE WRONG WAY. TO BE CONTINUED!
