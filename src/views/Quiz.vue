<template>
  <section class="quiz">
    <header class="questn-header">
      <span>Assessment</span>
      <span class="user">Hi, {{ quiz.userName }}</span>
    </header>

    <div class="progress" aria-hidden="true">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="about">
      <span class="category">{{ question.category }}</span>
      <h2 :id="`q-${question.id}`" class="question">
        {{ quiz.current + 1 }}. {{ question.question }}
      </h2>

      <div class="answers" role="radiogroup" :aria-labelledby="`q-${question.id}`">
        <button
          v-for="(option, i) in question.options"
          :key="option"
          type="button"
          role="radio"
          class="option"
          :class="{ selected: selected === option }"
          :aria-checked="selected === option"
          @click="selectAnswer(question.id, option)"
        >
          <span class="letter">{{ letters[i] }}</span>
          <span>{{ option }}</span>
        </button>
      </div>
    </div>

    <div class="footer">
      <div>Q{{ quiz.current + 1 }} / {{ quiz.questions.length }} · {{ answeredCount }} answered</div>
      <div class="actions">
        <button class="qustn-generator secondary" :disabled="quiz.current === 0" @click="quiz.current--">
          &#8678; Previous
        </button>
        <button v-if="!isLast" class="qustn-generator" :disabled="!selected" @click="quiz.current++">
          Next &#8680;
        </button>
        <button v-else class="qustn-generator" :disabled="!allAnswered" @click="submit">
          Submit
        </button>
      </div>
    </div>
    <p v-if="isLast && !allAnswered" class="hint">Answer every question to submit.</p>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { quiz, selectAnswer, submitQuiz } from "../store/quiz";

const router = useRouter();
const letters = ["A", "B", "C", "D", "E", "F"];

onMounted(() => {
  // An already-submitted attempt goes straight to its results.
  if (quiz.submitted) router.replace({ name: "Result" });
});

const question = computed(() => quiz.questions[quiz.current]);
const selected = computed(() => quiz.answers[question.value.id]);
const isLast = computed(() => quiz.current === quiz.questions.length - 1);
const answeredCount = computed(() => quiz.questions.filter((q) => quiz.answers[q.id]).length);
const allAnswered = computed(() => answeredCount.value === quiz.questions.length);
const progress = computed(() => (answeredCount.value / quiz.questions.length) * 100);

function submit() {
  if (!allAnswered.value) return;
  submitQuiz();
  router.push({ name: "Result" });
}
</script>

<style lang="scss" scoped>
$primary: rgba(69, 23, 113, 0.95);

.quiz {
  margin: 0 auto;
  max-width: 860px;
  padding: 30px 16px;
}
.questn-header {
  align-items: center;
  background-color: $primary;
  border-radius: 6px 6px 0 0;
  color: #fff;
  display: flex;
  font-size: 28px;
  justify-content: space-between;
  padding: 18px 20px;
  .user {
    font-size: 16px;
    opacity: 0.85;
  }
}
.progress {
  background: #ddd3e8;
  height: 6px;
  .progress-bar {
    background: linear-gradient(to right, red, orange);
    height: 100%;
    transition: width 0.25s;
  }
}
.about {
  background: #fff;
  border: 2px solid $primary;
  border-top: 0;
  color: rgb(69, 23, 113);
  padding: 24px 20px;
}
.category {
  background: rgba(69, 23, 113, 0.1);
  border-radius: 999px;
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 4px 10px;
  text-transform: uppercase;
}
.question {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  margin: 14px 0 20px;
}
.answers {
  display: grid;
  gap: 12px;
}
.option {
  align-items: center;
  background: #fff;
  border: 2px solid #d8cde4;
  border-radius: 6px;
  color: #222;
  cursor: pointer;
  display: flex;
  font-size: 17px;
  gap: 14px;
  padding: 12px 14px;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;
  &:hover {
    border-color: rgb(69, 23, 113);
  }
  &:focus-visible {
    outline: 3px solid orange;
    outline-offset: 2px;
  }
  &.selected {
    background: rgba(69, 23, 113, 0.08);
    border-color: rgb(69, 23, 113);
    .letter {
      background: rgb(69, 23, 113);
      color: #fff;
    }
  }
  .letter {
    align-items: center;
    border: 2px solid rgb(69, 23, 113);
    border-radius: 50%;
    color: rgb(69, 23, 113);
    display: inline-flex;
    flex-shrink: 0;
    font-weight: 600;
    height: 32px;
    justify-content: center;
    width: 32px;
  }
}
.footer {
  align-items: center;
  background-color: $primary;
  border-radius: 0 0 6px 6px;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 10px 14px;
  .actions {
    display: flex;
    gap: 10px;
  }
}
.hint {
  color: #666;
  font-size: 14px;
  text-align: right;
}
</style>
