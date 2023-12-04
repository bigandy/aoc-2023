import { input } from "./data/real.mjs";

const guessesThatAreWinning = input
  .split("\n")
  .filter((s) => s !== "")
  // .slice(0, 2)
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

const answer = [...guessesThatAreWinning].map((_) => 1);

answer.forEach((item, answerIndex) => {
  const correctNumbers = guessesThatAreWinning[answerIndex];
  for (let i = 1; i < correctNumbers + 1; i++) {
    const solIndex = i + answerIndex;
    answer[solIndex] = answer[solIndex] + item;
  }
});

const solution = answer.reduce((prev, next) => prev + next, 0);
console.log({ solution });
