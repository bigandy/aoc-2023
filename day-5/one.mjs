import { input } from "./data/dummy.mjs";

import _ from "lodash";
const { range } = _;

const rows = input.split("\n\n").map((row) => row.split("\n").filter(Boolean));

const [seeds, ...rest] = rows;

const seedNumbers = seeds[0]
  .split(": ")[1]
  .split(" ")
  .map((n) => +n);

console.log({
  seedNumbers,
});

// Handle The Conversions
// console.log({ rest });
const conversions = {};
rest.slice(0, 1).forEach((row) => {
  const [text, ...rest] = row;
  const conversion = text.split(" map:")[0];
  //   console.log({ rest });
  // console.log(rest);
  const out = [];
  // speed this up!
  rest.forEach((row) => {
    const [dest_start, source_start, rangeCount] = row
      .split(" ")
      .map((n) => +n);
    console.log({ dest_start, source_start, rangeCount });

    const dest_nums = range(dest_start, dest_start + rangeCount);
    const source_nums = range(source_start, source_start + rangeCount);

    source_nums.forEach((num, index) => {
      out[num] = dest_nums[index];
    });
  });
  //   console.log({ out });

  conversions[conversion] = out;
});
console.log(conversions);

// const finalLocations = Object.entries(conversions).reduce(
//   (prev, [conversion, mappings]) => {
//     const next = prev.map((seedNumber) => {
//       return mappings[seedNumber] ?? seedNumber;
//     });

//     return next;
//     //   console.log(seedNumbers.map((seedNumber) => mappings[0][seedNumber]));
//   },
//   seedNumbers
// );

// console.log({ solution: Math.min(...finalLocations) });

/* Notes
dest_range_start = 50;
source_range_start = 98;
range = 2;

// dest_numbers =50,51 (i.e. range(50,2))
// source_numbers=98,99 (i.e. range(98,2))
// so the mapping would be 50->98, 51->99

// next row is 52 50 48
dest_range_start = 52;
source_range_start = 50;
range = 48;

// dest_numbers = 52...99 (i.e. range(52,48))
// source_numbers = 50...97 (i.e. range(50,48))
*/
