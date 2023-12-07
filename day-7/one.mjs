import { input } from "./data/real.mjs";

import _ from "lodash";
const { groupBy } = _;

const rows = input
  .split("\n")
  .filter((s) => s !== "")
  .map((s) => s.split(" "));

// console.log({ rows });

const numbersArray = {
  2: "A",
  3: "B",
  4: "C",
  5: "D",
  6: "E",
  7: "F",
  8: "G",
  9: "H",
  T: "I",
  J: "J",
  Q: "K",
  K: "L",
  A: "M",
};

const handToLetters = (hand) => {
  const letters = hand
    .split("")
    .map((c) => {
      //   console.log({ a: numbersArray[c] });
      return numbersArray[c];
    })
    .join("");

  return letters;
};

const sortByScore = (a, b) => {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }

  if (a.score === b.score) {
    const aHand = handToLetters(a.hand);
    const bHand = handToLetters(b.hand);

    if (aHand < bHand) {
      return -1;
    }
    if (aHand > bHand) {
      return 1;
    }
    return 0;
  }
  return 0;
};

const answer = rows
  .map((row) => {
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
      // console.log({ solLength, solTotal });
      if (solLength === 1) {
        if (solTotal === 2) {
          return 2; // "one-pair";
        } else if (solTotal === 5) {
          return 7; //"five-of-a-kind";
        } else if (solTotal === 4) {
          return 6; // "four-of-a-kind";
        } else if (solTotal === 3) {
          return 4; // "three-of-a-kind";
        }
      } else if (solLength === 2) {
        if (solTotal === 4) {
          return 3; // "two-pairs";
        } else {
          return 5; // "full-house";
        }
      }
      return 1; // "high-card";
    };

    //   console.log(getHandType({ solLength, solTotal }));

    return {
      score: getHandType({ solLength, solTotal }),
      hand,
      value: Number(row[1]),
    };
  })
  .sort(sortByScore)
  .reduce((prev, next, index) => {
    console.log({ prev, next, index });

    return prev + next.value * (index + 1);
  }, 0);

console.log({ answer });
