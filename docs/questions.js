// ==============================
// 只做听力：试听 + 20题（已填正确答案）
// 放音频到 docs/audio/ 下：L00.mp3 ~ L20.mp3
// ==============================

const PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" },
];

// 题库（只包含 listening）
const QUESTIONS = [
  // 试听（不计分）
  {
    id: "L00",
    section: "listening",
    type: "listening_mcq",
    points: 0,
    audio: "audio/L00.mp3",
    prompt: "听力试听（不计分）。请先确认你能听清楚，然后点击下一题进入正式考试。",
    choices: ["我能听清楚", "我听不清楚", "我没声音", "我还没准备好"],
    answer: null
  },

  // 正式题 1-20（每题1分）
  {
    id: "L01", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L01.mp3",
    prompt: "问题：这个男生怎么样？",
    choices: ["很忙", "很好", "很累", "很冷"],
    answer: 1 // 1B
  },
  {
    id: "L02", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L02.mp3",
    prompt: "问题：男生叫什么？",
    choices: ["Mike", "Mary", "Mark", "Mei"],
    answer: 0 // 2A
  },
  {
    id: "L03", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L03.mp3",
    prompt: "问题：这本书是谁的？",
    choices: ["A 的", "B 的", "不是他们的", "不知道"],
    answer: 1 // 3B
  },
  {
    id: "L04", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L04.mp3",
    prompt: "问题：B 要什么？",
    choices: ["水", "茶", "咖啡", "牛奶"],
    answer: 1 // 4B
  },
  {
    id: "L05", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L05.mp3",
    prompt: "问题：B 家在哪儿？",
    choices: ["学校里面", "学校旁边", "学校后面", "学校对面"],
    answer: 1 // 5B
  },
  {
    id: "L06", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L06.mp3",
    prompt: "问题：现在几点？",
    choices: ["8:00", "8:30", "9:00", "9:30"],
    answer: 1 // 6B
  },
  {
    id: "L07", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L07.mp3",
    prompt: "问题：B 明天去哪里？",
    choices: ["北京", "上海", "广州", "深圳"],
    answer: 1 // 7B
  },
  {
    id: "L08", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L08.mp3",
    prompt: "问题：多少钱？",
    choices: ["12", "20", "28", "200"],
    answer: 1 // 8B
  },
  {
    id: "L09", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L09.mp3",
    prompt: "问题：B 中文怎么样？",
    choices: ["很好", "一点儿", "不会", "只会写"],
    answer: 1 // 9B
  },
  {
    id: "L10", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L10.mp3",
    prompt: "问题：B 怎么来学校？",
    choices: ["走路", "坐地铁", "坐飞机", "坐船"],
    answer: 1 // 10B
  },
  {
    id: "L11", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L11.mp3",
    prompt: "问题：B 周末可能先做什么？",
    choices: ["去旅游", "看电影", "写作业", "去运动"],
    answer: 2 // 11C
  },
  {
    id: "L12", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L12.mp3",
    prompt: "问题：B 昨天怎么了？",
    choices: ["迟到了", "感冒了", "生气了", "忘了时间"],
    answer: 1 // 12B
  },
  {
    id: "L13", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L13.mp3",
    prompt: "问题：他们几点出发？",
    choices: ["8点", "9点", "10点", "12点"],
    answer: 1 // 13B
  },
  {
    id: "L14", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L14.mp3",
    prompt: "问题：B 为什么不用排队？",
    choices: ["人不多", "订位了", "不吃饭", "关门了"],
    answer: 1 // 14B
  },
  {
    id: "L15", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L15.mp3",
    prompt: "问题：B 哪方面更弱？",
    choices: ["听力", "口语", "写字", "阅读"],
    answer: 2 // 15C
  },
  {
    id: "L16", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L16.mp3",
    prompt: "问题：集合时间是几点？",
    choices: ["2点", "3点", "4点", "5点"],
    answer: 1 // 16B
  },
  {
    id: "L17", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L17.mp3",
    prompt: "问题：B 最在意什么？",
    choices: ["颜色", "价格", "电池和拍照", "牌子"],
    answer: 2 // 17C
  },
  {
    id: "L18", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L18.mp3",
    prompt: "问题：B 用什么方法练口语？",
    choices: ["只背单词", "只看书", "聊天+听录音", "只写作文"],
    answer: 2 // 18C
  },
  {
    id: "L19", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L19.mp3",
    prompt: "问题：B 为什么喜欢老街？",
    choices: ["因为很安静", "因为有手工艺", "因为离酒店近", "因为人少"],
    answer: 1 // 19B
  },
  {
    id: "L20", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L20.mp3",
    prompt: "问题：如果明天下雨，会怎样？",
    choices: ["取消活动", "改到后天", "提前一天", "不改变"],
    answer: 1 // 20B
  }
];