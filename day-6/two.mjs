import { input } from "./data/real.mjs";

const rows = input.split("\n").filter((s) => s !== "");

const [timeRow, distanceRow] = rows;

const time = Number(
  timeRow.split(": ")[1].trim().split(" ").filter(Boolean).join("")
);

const distance = Number(
  distanceRow.split(": ")[1].trim().split(" ").filter(Boolean).join("")
);

const out = [];
for (let i = 0; i < time; i++) {
  const distanceTravelled = i * (time - i);
  if (distanceTravelled > distance) {
    out.push(distanceTravelled);
  }
}

console.log({ res: out.length });
