import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import Home from "../views/Home.vue";
import { quiz } from "../store/quiz";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/quiz",
    name: "Quiz",
    component: () => import("../views/Quiz.vue"),
    // A user must enter a name before starting.
    beforeEnter: () => (quiz.userName && quiz.questions.length ? true : { name: "Home" }),
  },
  {
    path: "/result",
    name: "Result",
    component: () => import("../views/Result.vue"),
    // Results are only available after the quiz has been submitted.
    beforeEnter: () => (quiz.submitted ? true : { name: "Home" }),
  },
  // Keep the old link working.
  { path: "/questions", redirect: { name: "Home" } },
  { path: "/:pathMatch(.*)*", redirect: { name: "Home" } },
];

// VITE_ROUTER_MODE=memory builds a version that works where URL paths can't be
// used (e.g. a hosted preview); the default uses normal browser URLs.
const history =
  import.meta.env.VITE_ROUTER_MODE === "memory"
    ? createMemoryHistory()
    : createWebHistory(import.meta.env.BASE_URL);

export default createRouter({
  history,
  routes,
});
