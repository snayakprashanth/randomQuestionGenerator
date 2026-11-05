import { reactive, computed, watch } from "vue";
import { questionBank, QUESTIONS_PER_QUIZ } from "../data/questions";
import { buildQuiz, calculateScore } from "../utils/quiz";

// The current attempt is kept in sessionStorage so a page refresh
// doesn't lose the user's progress.
const STORAGE_KEY = "rqg-session";

const emptyState = () => ({
  userName: "",
  questions: [],
  answers: {},
  current: 0,
  submitted: false,
});

function loadState() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

export const quiz = reactive({ ...emptyState(), ...loadState() });

watch(
  quiz,
  (state) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable: progress just won't survive a refresh */
    }
  },
  { deep: true }
);

export const score = computed(() => calculateScore(quiz.questions, quiz.answers));

export function startQuiz(name) {
  Object.assign(quiz, emptyState(), {
    userName: name.trim(),
    questions: buildQuiz(questionBank, QUESTIONS_PER_QUIZ),
  });
}

export function selectAnswer(questionId, option) {
  if (!quiz.submitted) quiz.answers[questionId] = option;
}

export function submitQuiz() {
  quiz.submitted = true;
}

/** Same user, a fresh random set of questions. */
export function retake() {
  startQuiz(quiz.userName);
}

/** Clears everything so a new user can start. */
export function resetQuiz() {
  Object.assign(quiz, emptyState());
}
