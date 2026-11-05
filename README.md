# Random Question Generator

A Vue 3 + Vite quiz app. A user enters their name, answers **10 random
multiple-choice programming questions** (drawn from a bank of 20), and then sees their score along with their answer and the correct
answer for each question.

## Flow

1. **Home** (`/`): enter a name (at least 2 characters) and start.
2. **Quiz** (`/quiz`): one question at a time with four options; options are
   shuffled per user. Next is enabled once an option is selected; Previous lets
   you change earlier answers. Submit appears on question 10.
3. **Result** (`/result`): score, percentage, and a review of every question
   (correct ones in green, wrong ones in red with the correct answer).
   "Try again with new questions" keeps the name and draws a fresh set;
   "New user" goes back to the name screen.

Progress is kept in `sessionStorage`, so a page refresh doesn't lose answers.

## Project structure

```
src/
  data/questions.js   question bank + QUESTIONS_PER_QUIZ
  utils/quiz.js       shuffle, buildQuiz (random balanced pick), calculateScore
  store/quiz.js       reactive quiz state (name, questions, answers, submitted)
  router/index.js     routes + guards (no quiz without a name, no result before submit)
  views/              Home.vue, Quiz.vue, Result.vue
tests/quiz.test.js    unit tests (incl. 20 simulated users)
```

### Adding questions

Add a row to the `programming` array in `src/data/questions.js`:

```js
["Question text?", ["Option A", "Option B", "Option C", "Option D"], "Option A"],
```

The last value must exactly match one of the options. To add a new category,
add it to `CATEGORIES` and the bank; questions are split evenly across categories.

## Scripts

Requires Node.js 20.19+ (or 22.12+).

```
npm install
npm run dev       # start the dev server (npm run serve also works)
npm test          # run unit tests
npm run lint      # lint
npm run build     # production build into dist/
npm run preview   # serve the production build
```
