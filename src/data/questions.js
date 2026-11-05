// Predefined question bank.
// Each user gets QUESTIONS_PER_QUIZ questions picked at random (no repeats).
// If more categories are added, questions are split evenly across them.
// `answer` must exactly match one of the `options`.

export const QUESTIONS_PER_QUIZ = 10;

export const CATEGORIES = {
  PROGRAMMING: "Programming",
};

const programming = [
  ["What does HTML stand for?", ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], "HyperText Markup Language"],
  ["Which of these is NOT a primitive type in JavaScript?", ["Object", "String", "Boolean", "Symbol"], "Object"],
  ["What does `typeof null` return in JavaScript?", ["\"object\"", "\"null\"", "\"undefined\"", "\"number\""], "\"object\""],
  ["What is the time complexity of binary search on a sorted array?", ["O(log n)", "O(n)", "O(n log n)", "O(1)"], "O(log n)"],
  ["Which data structure follows Last In, First Out (LIFO)?", ["Stack", "Queue", "Linked list", "Tree"], "Stack"],
  ["What does CSS stand for?", ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], "Cascading Style Sheets"],
  ["Which JavaScript keyword declares a block-scoped variable that cannot be reassigned?", ["const", "var", "let", "static"], "const"],
  ["Which Git command creates a new branch and switches to it?", ["git checkout -b <name>", "git branch -d <name>", "git merge <name>", "git init <name>"], "git checkout -b <name>"],
  ["Which HTTP status code means \"Not Found\"?", ["404", "500", "200", "301"], "404"],
  ["In Python, what does `len(\"hello\")` return?", ["5", "4", "6", "An error"], "5"],
  ["What does SQL stand for?", ["Structured Query Language", "Simple Query Language", "Sequential Question Language", "Standard Queue Logic"], "Structured Query Language"],
  ["How many bits are there in one byte?", ["8", "4", "16", "32"], "8"],
  ["Which JavaScript framework was created by Evan You?", ["Vue.js", "Angular", "React", "Svelte"], "Vue.js"],
  ["What does the `===` operator check in JavaScript?", ["Equality of value and type", "Equality of value only", "Assignment", "Greater than or equal"], "Equality of value and type"],
  ["Which HTTP method is typically used to create a new resource?", ["POST", "GET", "DELETE", "HEAD"], "POST"],
  ["In JavaScript, what is the result of `0.1 + 0.2 === 0.3`?", ["false", "true", "undefined", "TypeError"], "false"],
  ["What does API stand for?", ["Application Programming Interface", "Advanced Program Integration", "Application Process Instruction", "Automated Programming Input"], "Application Programming Interface"],
  ["Which sorting algorithm splits the list in halves and merges the sorted halves?", ["Merge sort", "Bubble sort", "Insertion sort", "Selection sort"], "Merge sort"],
  ["Which keyword is used to define a function in Python?", ["def", "function", "func", "define"], "def"],
  ["What does JSON stand for?", ["JavaScript Object Notation", "Java Serialized Object Network", "JavaScript Online Notation", "Java Standard Object Naming"], "JavaScript Object Notation"],
];

const toQuestions = (rows, category, prefix) =>
  rows.map(([question, options, answer], i) => ({
    id: `${prefix}-${i + 1}`,
    category,
    question,
    options,
    answer,
  }));

export const questionBank = [
  ...toQuestions(programming, CATEGORIES.PROGRAMMING, "prog"),
];
