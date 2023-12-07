import { input } from "./data/dummy.mjs";

import _ from "lodash";
const { groupBy } = _;

const rows = input
  .split("\n")
  .filter((s) => s !== "")
  .map((s) => s.split(" "));

console.log({ rows });

rows.map((row) => {
  const hand = row[0];
  const cardGroupings = groupBy(hand.split(""));

  const sol = [];

  Object.entries(cardGroupings)
    .sort()
    .filter(([key, value]) => {
      return value.length > 1;
    })
    .forEach(([key, value]) => {
      // console.log(`${key}: ${value.length}`);
      sol.push(value.length);
    });
  const solLength = sol.length;
  const solTotal = sol.reduce((a, b) => a + b, 0);

  const getHandType = ({ solLength, solTotal }) => {
    console.log({ solLength, solTotal });
    if (solLength === 1) {
      if (solTotal === 2) {
        return "one-pair";
      } else if (solTotal === 5) {
        return "five-of-a-kind";
      } else if (solTotal === 4) {
        return "four-of-a-kind";
      } else if (solTotal === 3) {
        return "three-of-a-kind";
      }
    } else if (solLength === 2) {
      if (solTotal === 4) {
        return "two-pairs";
      } else {
        return "full-house";
      }
    }
    return "to-do";
  };

  console.log(getHandType({ solLength, solTotal }));
});
