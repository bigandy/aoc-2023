import { input } from "./data/dummy.mjs";

import _ from "lodash";
const { groupBy } = _;

const rows = input
  .split("\n")
  .filter((s) => s !== "")
  .map((s) => s.split(" "));

// console.log({ rows });

const numbersArray = {
  J: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  T: "J",
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

const answer = rows.map((row) => {
  const hand = row[0];
  const handLetters = hand.split("");

  const cardGroupings = groupBy(handLetters);
  const cardGroupingsWithoutJacks = groupBy(
    handLetters.filter((l) => l !== "J")
  );

  const jackCount = handLetters.filter((l) => l === "J").length;

  if (jackCount > 0) {
    const lettersInObj = Object.keys(cardGroupingsWithoutJacks);
    const collectionsOfLetters = Object.values(cardGroupingsWithoutJacks)
      .flat()
      .join("");
    console.log({ lettersInObj, collectionsOfLetters, jackCount });

    const possibleSolutions = [];

    //   console.log(lettersInObj.length);

    //   [5,T]

    //     55 == [0][0]
    //     5T == [0][1]
    //     T5 == [1][0]
    //     TT == [1][1]

    for (let l = 0; l < lettersInObj.length; l++) {
      // console.log((l = lettersInObj[l]));
      //   console.log(i, l);
      let additionalLetters = "";
      //   additionalLetters = lettersInObj[l] + lettersInObj[i];

      const firstLetter = lettersInObj[l];

      possibleSolutions.push(collectionsOfLetters + firstLetter);
      for (let i = 0; i < jackCount; i++) {
        console.log(i + l);
      }
    }

    console.log({ possibleSolutions });
    // for jackCount > 0 need to test the other combinations with a jack,
    // to get the best score.
    // console.log({
    //   cardGroupingsWithoutJacks,
    //   hand,
    //   jackCount,
    // });

    const obj = cardGroupingsWithoutJacks;
    const numberOfJacks = jackCount;

    const possibleCombinations = [obj];
    // Object.values(obj).forEach((arr, index) => {
    //   const objCopy = { ...obj };
    //   const letter = arr[0];

    //   const addedNumbers = [...new Array(numberOfJacks).fill()].map(
    //     () => letter
    //   );
    //   objCopy[letter] = [...objCopy[letter], ...addedNumbers];
    //   possibleCombinations.push(objCopy);
    // });

    // console.log({ cardGroupingsWithoutJacks });
    //   const possibleCominationsOutput = possibleCombinations
    //     .map((cardGroupings) => {
    //       const sol = [];
    //       Object.entries(cardGroupings)
    //         .sort()
    //         .filter(([key, value]) => {
    //           return value.length > 1;
    //         })
    //         .forEach(([key, value]) => {
    //           console.log(`${key}: ${value.length}`);
    //           sol.push(value.length);
    //         });

    //       console.log({ sol });
    //       const solLength = sol.length;
    //       const solTotal = sol.reduce((a, b) => a + b, 0);
    //       return {
    //         score: getHandType({ solLength, solTotal }),
    //         hand,
    //         value: Number(row[1]),
    //       };
    //     })
    //     .sort((a, b) => b.score - a.score)[0];

    //   console.log({ possibleCominationsOutput });

    //   return possibleCominationsOutput;

    // so { '5': [ '5', '5', '5' ], T: [ 'T' ] } three of a kind
    // with one jack
    // can become { '5': [ '5', '5', '5', '5' ], T: [ 'T' ]} // four-of-a-kind
    // or { '5': [ '5', '5' ], T: [ 'T', 'T' ] } // two pairs
    // so the best is four-of-a-kind
    // we keep that score as a max.
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

    // //   console.log(getHandType({ solLength, solTotal }));

    return {
      score: getHandType({ solLength, solTotal }),
      hand,
      value: Number(row[1]),
    };
  }
});
//   .sort(sortByScore)
//   .reduce((prev, next, index) => {
//     // console.log({ prev, next, index });

//     return prev + next.value * (index + 1);
//   }, 0);

// console.log({ answer });

// so { '5': [ '5', '5', '5' ], T: [ 'T' ] } three of a kind
// with one jack
// can become { '5': [ '5', '5', '5', '5' ], T: [ 'T' ]} // four-of-a-kind
// or { '5': [ '5', '5' ], T: [ 'T', 'T' ] } // two pairs
// so the best is four-of-a-kind
// we keep that score as a max.

// console.log({ index, original, origArrLen: numberOfJacks });

// const sols = [obj];

// console.log({ outs });

// NOT 253945077
