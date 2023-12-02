import { input } from "./data/real.mjs";

const rows = input.split("\n").filter((s) => s !== "");

const result = rows
  .map((row) => {
    const splitRow = row.split(":");

    //   const id = Number(splitRow[0].replace("Game", "").replace(" ", ""));

    const output = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const rest = splitRow[1].trim();
    const goes = rest
      .split(";")
      .map((go) =>
        go
          .trim()
          .split(",")
          .map((colours) => {
            return colours.trim();
          })
          .map((go) => {
            const counts = {};
            if (go.includes("red")) {
              let number = go.match(/\d+/g);
              counts["red"] = Number(number);
            }
            if (go.includes("green")) {
              let number = go.match(/\d+/g);
              counts["green"] = Number(number);
            }
            if (go.includes("blue")) {
              let number = go.match(/\d+/g);
              counts["blue"] = Number(number);
            }
            return counts;
          })
      )
      .flat();

    goes.forEach(({ blue, red, green }) => {
      if (blue && blue > output.blue) {
        // console.log("blue", blue);
        output.blue = blue;
      }

      if (red && red > output.red) {
        // console.log("red", red);
        output.red = red;
      }

      if (green && green > output.green) {
        // console.log("green", green);
        output.green = green;
      }
    });

    const sum = output.green * output.red * output.blue;

    // console.log({ sum });

    return sum;
    // return counts;

    //   result[id] = goes.flat().length > 0;
  })
  .reduce((prev, next) => {
    return prev + next;
  }, 0);

console.log({ result });
// const res = Object.entries(result)
//   .filter(([_, val]) => !val)
//   .reduce((prev, next) => prev + Number(next[0]), 0);

// console.log(res);
