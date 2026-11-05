// Pure quiz helpers (no Vue), so they are easy to unit test.

/** Returns a new array in random order (Fisher–Yates). */
export function shuffle(items, random = Math.random) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Picks `count` unique questions at random, spread as evenly as possible
 * across categories, then shuffles question order and each question's options.
 */
export function buildQuiz(bank, count, random = Math.random) {
  const byCategory = new Map();
  for (const q of bank) {
    if (!byCategory.has(q.category)) byCategory.set(q.category, []);
    byCategory.get(q.category).push(q);
  }

  const pools = [...byCategory.values()].map((qs) => shuffle(qs, random));
  const picked = [];
  // Round-robin over categories so each one gets a fair share.
  while (picked.length < count && pools.some((p) => p.length)) {
    for (const pool of pools) {
      if (picked.length >= count) break;
      if (pool.length) picked.push(pool.pop());
    }
  }

  return shuffle(picked, random).map((q) => ({
    ...q,
    options: shuffle(q.options, random),
  }));
}

/** answers: { [questionId]: selectedOption } */
export function calculateScore(questions, answers) {
  return questions.reduce((total, q) => total + (answers[q.id] === q.answer ? 1 : 0), 0);
}
