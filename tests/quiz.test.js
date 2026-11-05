import { describe, it, expect } from "vitest";
import { questionBank, QUESTIONS_PER_QUIZ, CATEGORIES } from "../src/data/questions";
import { buildQuiz, calculateScore, shuffle } from "../src/utils/quiz";

describe("question bank", () => {
  it("has unique ids and 4 unique options with a valid answer", () => {
    const ids = new Set(questionBank.map((q) => q.id));
    expect(ids.size).toBe(questionBank.length);
    for (const q of questionBank) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options).toContain(q.answer);
    }
  });

  it("contains only programming questions", () => {
    expect(questionBank.length).toBeGreaterThanOrEqual(QUESTIONS_PER_QUIZ);
    for (const q of questionBank) expect(q.category).toBe(CATEGORIES.PROGRAMMING);
  });
});

describe("buildQuiz", () => {
  it("gives 20 users 10 unique questions each", () => {
    const sets = [];
    for (let user = 0; user < 20; user++) {
      const quiz = buildQuiz(questionBank, QUESTIONS_PER_QUIZ);
      expect(quiz).toHaveLength(10);
      expect(new Set(quiz.map((q) => q.id)).size).toBe(10);
      for (const q of quiz) expect(q.options).toContain(q.answer);
      sets.push(quiz.map((q) => q.id).sort().join());
    }
    // Random sets: 20 users should practically never all get the same quiz.
    expect(new Set(sets).size).toBeGreaterThan(1);
  });

  it("does not mutate the bank", () => {
    const before = JSON.stringify(questionBank);
    buildQuiz(questionBank, 10);
    expect(JSON.stringify(questionBank)).toBe(before);
  });
});

describe("calculateScore", () => {
  it("counts only correct answers", () => {
    const qs = questionBank.slice(0, 3);
    const answers = { [qs[0].id]: qs[0].answer, [qs[1].id]: "nope" };
    expect(calculateScore(qs, answers)).toBe(1);
  });
});

describe("shuffle", () => {
  it("keeps all items", () => {
    expect(shuffle([1, 2, 3, 4]).sort()).toEqual([1, 2, 3, 4]);
  });
});
