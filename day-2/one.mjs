import { input } from "./data/dummy.mjs";

const rows = input.split("\n").filter((s) => s !== "");
const result = {};

rows.map((row) => {
  const splitRow = row.split(":");

  const id = Number(splitRow[0].replace("Game", "").replace(" ", ""));
  const rest = splitRow[1].trim();
  const goes = rest.split(";").map((go) =>
    go
      .trim()
      .split(",")
      .map((colours) => {
        return colours.trim();
      })
      .filter((colour) => {
        const counts = {};
        if (colour.includes("red")) {
          let number = colour.match(/\d+/g);
          counts["red"] = Number(number);
          return number > 12;
        } else if (colour.includes("green")) {
          let number = colour.match(/\d+/g);
          counts["green"] = Number(number);
          return number > 13;
        } else if (colour.includes("blue")) {
          let number = colour.match(/\d+/g);
          counts["blue"] = Number(number);
          return number > 14;
        }
      })
  );
  result[id] = goes.flat().length > 0;
});

const res = Object.entries(result)
  .filter(([_, val]) => !val)
  .reduce((prev, next) => prev + Number(next[0]), 0);

console.log(res);
