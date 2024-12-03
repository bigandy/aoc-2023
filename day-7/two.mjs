import { input } from "./data/dummy.mjs";

import _ from "lodash";
const { groupBy } = _;

const rows = input
  .split("\n")
  .filter((s) => s !== "")
  .map((s) => s.split(" "));

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

const getHandType = ({ solLength, solTotal }) => {
  if (solLength === 5) {
    return 7; // five-of-a-kind
  } else if (solLength === 1) {
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

const answer = rows
  .map((row) => {
    const hand = row[0];
    const handLetters = hand.split("");

    const cardGroupings = groupBy(handLetters);
    const cardGroupingsWithoutJacks = groupBy(
      handLetters.filter((l) => l !== "J")
    );

    const jackCount = handLetters.filter((l) => l.toUpperCase() === "J").length;
    console.log({ jackCount });
    if (jackCount === 5) {
      return {
        score: getHandType({ solLength: 5, solTotal: 5 }),
        hand,
        value: Number(row[1]),
      };
    } else if (jackCount > 0) {
      const lettersInObj = Object.keys(cardGroupingsWithoutJacks);
      const collectionsOfLetters = Object.values(cardGroupingsWithoutJacks)
        .flat()
        .join("");
      // console.log({ lettersInObj, collectionsOfLetters, jackCount });

      const getSolutionArray = (test, numberOfJacks, result, letters) => {
        let answer = [];
        const recurrsion = (test, numberOfJacks, result, letters) => {
          // console.log({ test, numberOfJacks, result, letters });

          if (numberOfJacks === 0) {
            // console.log("here", result);
            answer = result;
            return result;
          }

          if (result.length === 0) {
            for (let i = 0; i < letters.length; i++) {
              result.push(test + letters[i]);
            }
            numberOfJacks--;

            recurrsion(test, numberOfJacks, result, letters);
          } else {
            // console.log("Need to loop through result here", result);
            const newResult = [];
            for (let r = 0; r < result.length; r++) {
              for (let i = 0; i < letters.length; i++) {
                // result.push(test + letters[i]);
                // console.log(result[r] + letters[i]);
                newResult.push(result[r] + letters[i]);
              }
            }

            // console.log({ test, numberOfJacks, newResult, letters });
            numberOfJacks--;
            recurrsion(test, numberOfJacks, newResult, letters);
          }
        };
        recurrsion(test, numberOfJacks, result, letters);

        return answer;
      };

      // let lettersLength = 2;

      const possibleCombinations = getSolutionArray(
        collectionsOfLetters,
        jackCount,
        [],
        lettersInObj
      );

      console.log({ possibleCombinations });

      const possibleCominationsOutput = possibleCombinations
        .map((combinationLetters) => {
          const cardGroupings = groupBy(combinationLetters);
          const sol = [];
          Object.entries(cardGroupings)
            .sort()
            .filter(([key, value]) => {
              return value.length > 1;
            })
            .forEach(([key, value]) => {
              console.log(`${key}: ${value.length}`);
              sol.push(value.length);
            });

          //     console.log({ cardGroupings });
          const solLength = sol.length;
          const solTotal = sol.reduce((a, b) => a + b, 0);
          return {
            score: getHandType({ solLength, solTotal }),
            hand,
            value: Number(row[1]),
          };
        })
        .sort((a, b) => b.score - a.score)[0];

      console.log({ row });

      return possibleCominationsOutput;
    } else {
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

      // console.log(getHandType({ solLength, solTotal }));

      return {
        score: getHandType({ solLength, solTotal }),
        hand,
        value: Number(row[1]),
      };
    }
  })
  .sort(sortByScore);
// .reduce((prev, next, index) => {
//   return prev + next.value * (index + 1);
// }, 0);

console.log({ answer });
