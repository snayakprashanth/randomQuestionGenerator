<template>
  <section class="result">
    <header class="score-card">
      <p class="name">{{ quiz.userName }}, you scored</p>
      <p class="score">{{ score }} <span>/ {{ total }}</span></p>
      <p class="percent">{{ percent }}% · {{ message }}</p>
      <div class="actions">
        <button class="qustn-generator" @click="tryAgain">Try again with new questions</button>
        <button class="qustn-generator secondary" @click="newUser">New user</button>
      </div>
    </header>

    <h2 class="review-title">Your answers</h2>
    <ol class="review">
      <li
        v-for="(q, i) in quiz.questions"
        :key="q.id"
        class="item"
        :class="isCorrect(q) ? 'correct' : 'wrong'"
      >
        <div class="item-head">
          <span class="category">{{ q.category }}</span>
          <span class="badge">{{ isCorrect(q) ? "✔ Correct" : "✘ Wrong" }}</span>
        </div>
        <p class="question">{{ i + 1 }}. {{ q.question }}</p>
        <p class="line">
          Your answer: <strong class="yours">{{ quiz.answers[q.id] || "Not answered" }}</strong>
        </p>
        <p v-if="!isCorrect(q)" class="line">
          Correct answer: <strong class="right">{{ q.answer }}</strong>
        </p>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { quiz, score, retake, resetQuiz } from "../store/quiz";

const router = useRouter();
const total = computed(() => quiz.questions.length);
const percent = computed(() => Math.round((score.value / total.value) * 100));
const message = computed(() => {
  if (percent.value === 100) return "Perfect score!";
  if (percent.value >= 80) return "Excellent work!";
  if (percent.value >= 50) return "Good job, keep practising!";
  return "Keep learning and try again!";
});

const isCorrect = (q) => quiz.answers[q.id] === q.answer;

function tryAgain() {
  retake();
  router.push({ name: "Quiz" });
}

function newUser() {
  resetQuiz();
  router.push({ name: "Home" });
}
</script>

<style lang="scss" scoped>
$primary: rgb(69, 23, 113);

.result {
  margin: 0 auto;
  max-width: 860px;
  padding: 30px 16px 60px;
}
.score-card {
  background: rgba(69, 23, 113, 0.95);
  border-radius: 8px;
  color: #fff;
  padding: 28px 20px;
  text-align: center;
  p {
    margin: 0;
  }
  .name {
    font-size: 20px;
    opacity: 0.9;
  }
  .score {
    font-size: 64px;
    font-weight: 700;
    line-height: 1.2;
    span {
      font-size: 32px;
      opacity: 0.8;
    }
  }
  .percent {
    font-size: 18px;
    margin-bottom: 22px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
}
.review-title {
  color: $primary;
  margin: 32px 0 12px;
}
.review {
  display: grid;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.item {
  background: #fff;
  border-left: 6px solid;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 14px 18px;
  &.correct {
    border-color: #1e8e3e;
    .badge,
    .yours {
      color: #1e8e3e;
    }
  }
  &.wrong {
    border-color: #d93025;
    .badge,
    .yours {
      color: #d93025;
    }
  }
  .right {
    color: #1e8e3e;
  }
}
.item-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
}
.category {
  color: $primary;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.question {
  font-size: 18px;
  font-weight: 600;
  margin: 8px 0;
}
.line {
  margin: 4px 0;
}
</style>
