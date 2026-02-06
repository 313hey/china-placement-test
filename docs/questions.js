// ==============================
// Placement Test Question Bank
// 题库对所有项目通用：不因 School/Project 不同而改变
// 你只需要在下面的 QUESTIONS 里不断加题即可
// 音频题：audio 指向 audio/ 目录下的 mp3，例如 "audio/L1_Q01.mp3"
// ==============================

// （可选）仅用于首页下拉，不影响题目
// 如果你不需要下拉，可以删掉这一段
const PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" },
];

// 题库：对所有项目通用
const QUESTIONS = [
  // ---------- Listening 听力 ----------
  {
    id: "L1_Q01",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L1_Q01.mp3",
    prompt: "听句子，选正确答案：她今天下午三点有课。",
    choices: ["上午三点", "下午三点", "晚上三点"],
    answer: 1
  },
  {
    id: "L1_Q02",
    type: "listening_tf",
    points: 2,
    audio: "audio/L1_Q02.mp3",
    prompt: "听对话，判断对/错：他们决定今天订票。",
    choices: ["对", "错"],
    answer: 0
  },

  // ---------- Grammar / Vocabulary 语法词汇 ----------
  {
    id: "G1_Q01",
    type: "mcq",
    points: 2,
    prompt: "我___中国菜。",
    choices: ["喜欢", "完成", "介绍"],
    answer: 0
  },
  {
    id: "G1_Q02",
    type: "mcq",
    points: 2,
    prompt: "如果下雨，我们就___博物馆。",
    choices: ["去", "看", "写"],
    answer: 0
  }
];

// （可选）给调试用：在控制台快速确认题库是否加载
console.log("questions loaded:", QUESTIONS?.length || 0);
