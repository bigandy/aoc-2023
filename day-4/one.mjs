import { input } from "./data/real.mjs";

const getScoreFromCorrectGuesses = (correctGuesses) => {
  if (correctGuesses === 0) return 0;
  let result = 1;
  for (let i = 1; i < correctGuesses; i++) {
    result *= 2;
  }
  return result;
};

const guessesThatAreWinning = input
  .split("\n")
  .filter((s) => s !== "")
  //   .slice(0, 1)
  .map((row) => {
    const [_, nums] = row.split(":");
    const [winningNumbers, guesses] = nums.split("|");
    const winningArray = winningNumbers.trim().split(" ").filter(Boolean);
    const guessesArray = guesses.trim().split(" ").filter(Boolean);
    console.log({ winningArray, guessesArray });

    const guessesThatAreWinning = guessesArray.filter((guess) =>
      winningArray.includes(guess)
    );
    console.log(guessesThatAreWinning);
    return guessesThatAreWinning.length;
  })
  .reduce((acc, curr) => acc + getScoreFromCorrectGuesses(Number(curr)), 0);
console.log({
  guessesThatAreWinning,
});
