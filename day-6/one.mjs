import { input } from "./data/real.mjs";

const rows = input.split("\n").filter((s) => s !== "");

const [timeRow, distanceRow] = rows;

const times = timeRow
  .split(": ")[1]
  .trim()
  .split(" ")
  .filter(Boolean)
  .map((n) => +n);
const distances = distanceRow
  .split(": ")[1]
  .trim()
  .split(" ")
  .filter(Boolean)
  .map((n) => +n);

const output = times
  .map((time, index) => {
    const distance = distances[index];

    const out = [];
    for (let i = 0; i < time; i++) {
      const distanceTravelled = i * (time - i);
      if (distanceTravelled > distance) {
        out.push(distanceTravelled);
      }
    }
    return out.length;
  })
  .reduce((prev, next) => prev * next);

console.log({ output });
