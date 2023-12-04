import { input } from "./data/dummy.mjs";

const guessesThatAreWinning = input
  .split("\n")
  .filter((s) => s !== "")
  .slice(0, 1)
  .map((row) => {
    const [_, nums] = row.split(":");
    const [winningNumbers, guesses] = nums.split("|");
    const winningArray = winningNumbers.trim().split(" ").filter(Boolean);
    const guessesArray = guesses.trim().split(" ").filter(Boolean);

    const guessesThatAreWinning = guessesArray.filter((guess) =>
      winningArray.includes(guess)
    );
    return guessesThatAreWinning.length;
  });
//   .reduce((acc, curr) => acc + getScoreFromCorrectGuesses(Number(curr)), 0);
console.log({
  guessesThatAreWinning,
});
