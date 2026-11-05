<template>
  <div class="container">
    <form class="section" @submit.prevent="start">
      <h1 class="header">Random Question Generator</h1>
      <p class="intro">
        Answer {{ total }} random multiple-choice programming questions.
        Your score and the correct answers are shown at the end.
      </p>

      <label for="name" class="label">Enter your name to begin</label>
      <input
        id="name"
        v-model="name"
        class="name-input"
        type="text"
        maxlength="40"
        placeholder="Your name"
        autocomplete="name"
        autofocus
      />
      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <button type="submit" class="qustn-generator">Start quiz &#8680;</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { QUESTIONS_PER_QUIZ } from "../data/questions";
import { quiz, startQuiz } from "../store/quiz";

const router = useRouter();
const total = QUESTIONS_PER_QUIZ;
const name = ref(quiz.userName);
const error = ref("");

function start() {
  const trimmed = name.value.trim();
  if (trimmed.length < 2) {
    error.value = "Please enter your name (at least 2 characters).";
    return;
  }
  error.value = "";
  startQuiz(trimmed);
  router.push({ name: "Quiz" });
}
</script>

<style lang="scss" scoped>
.container {
  background: rgba(69, 23, 113, 0.95);
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.section {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 560px;
  text-align: center;
  width: 100%;
}
.header {
  font-size: clamp(34px, 6vw, 56px);
  font-weight: 600;
  margin: 0 0 16px;
}
.intro {
  font-size: 18px;
  line-height: 1.5;
  margin: 0 0 32px;
  opacity: 0.9;
}
.label {
  font-size: 16px;
  margin-bottom: 8px;
}
.name-input {
  border: none;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 8px;
  max-width: 360px;
  padding: 12px 14px;
  width: 100%;
  &:focus {
    outline: 3px solid #ffd27a;
  }
}
.error {
  color: #ffd27a;
  margin: 4px 0 0;
}
.qustn-generator {
  margin-top: 20px;
}
</style>
