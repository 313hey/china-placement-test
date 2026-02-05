// 你可以不断往里加题。音频题：audio 指向 audio/ 目录下的 mp3
const QUESTIONS = [
  {
    id: "L1",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L1_Q01.mp3",
    prompt: "听句子，选正确答案：她今天下午三点有课。",
    choices: ["上午三点", "下午三点", "晚上三点"],
    answer: 1
  },
  {
    id: "L2",
    type: "listening_tf",
    points: 2,
    audio: "audio/L1_Q02.mp3",
    prompt: "听对话，判断对/错：他们决定今天订票。",
    choices: ["对", "错"],
    answer: 0
  },
  {
    id: "G1",
    type: "mcq",
    points: 2,
    prompt: "我___中国菜。",
    choices: ["喜欢", "完成", "介绍"],
    answer: 0
  },
  {
    id: "G2",
    type: "mcq",
    points: 2,
    prompt: "如果下雨，我们就___博物馆。",
    choices: ["去", "看", "写"],
    answer: 0
  }
];
