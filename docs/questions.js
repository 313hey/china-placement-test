// （只用于首页下拉，不影响题库）
window.PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" },
];

// 固定卷题库：所有项目通用
// 关键：每题都要有 section: "listening" | "reading" | "writing"
window.QUESTIONS = [
  // ---------- 听力 ----------
  {
    id: "L1_Q01",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L1_Q01.mp3",
    prompt: "听句子，选正确答案：她今天下午三点有课。",
    choices: ["上午三点", "下午三点", "晚上三点"],
    answer: 1
  },
  {
    id: "L1_Q02",
    section: "listening",
    type: "listening_tf",
    points: 2,
    audio: "audio/L1_Q02.mp3",
    prompt: "听对话，判断对/错：他们决定今天订票。",
    choices: ["对", "错"],
    answer: 0
  },

  // ---------- 阅读 ----------
  {
    id: "R1_Q01",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我___中国菜。",
    choices: ["喜欢", "完成", "介绍"],
    answer: 0
  },
  {
    id: "R1_Q02",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "如果下雨，我们就___博物馆。",
    choices: ["去", "看", "写"],
    answer: 0
  },

  // ---------- 书写（默认不自动判分；points 可设 0 或留给人工） ----------
  {
    id: "W1_Q01",
    section: "writing",
    type: "writing",
    points: 0,
    prompt: "请用中文写 2-3 句话，简单介绍你自己（姓名、来自哪里、喜欢什么）。",
    placeholder: "例如：我叫… 我来自… 我喜欢…"
  }
];
