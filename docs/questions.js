// ==============================
// Placement Test Question Bank
// 全项目通用：不因 School/Project 不同而改变
// 你只需要不断往 QUESTIONS 里加题
// ==============================

// （可选）仅用于首页下拉，不影响题目本身
const PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" },
];

// 题库：对所有项目通用
// 说明：
// - listening_mcq / listening_tf / mcq：answer 是正确选项下标（0-based）
// - short_text：主观题默认不自动判分（answer 不填也行）
const QUESTIONS = [

  // ==========================
  // A. 听力 Listening（示例：你把 mp3 放到 docs/audio/ 下，文件名要对得上）
  // ==========================
  {
    id: "L_Q01",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q01.mp3",
    audio_text: "A：你好吗？B：我很好，谢谢。",
    prompt: "问题：B怎么样？",
    choices: ["很忙", "很好", "很累", "很冷"],
    answer: 1
  },
  {
    id: "L_Q02",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q02.mp3",
    audio_text: "A：你要去哪里？B：我要去学校。",
    prompt: "问题：B要去哪里？",
    choices: ["去家", "去学校", "去饭店", "去医院"],
    answer: 1
  },
  {
    id: "L_Q03",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q03.mp3",
    audio_text: "A：你喜欢喝什么？B：我喜欢喝咖啡。",
    prompt: "问题：B喜欢喝什么？",
    choices: ["茶", "水", "咖啡", "牛奶"],
    answer: 2
  },
  {
    id: "L_Q04",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q04.mp3",
    audio_text: "A：你想吃什么？B：我想吃面条。",
    prompt: "问题：B想吃什么？",
    choices: ["米饭", "面条", "饺子", "包子"],
    answer: 1
  },
  {
    id: "L_Q05",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q05.mp3",
    audio_text: "A：你今天几点起床？B：我七点起床。",
    prompt: "问题：B几点起床？",
    choices: ["六点", "七点", "八点", "九点"],
    answer: 1
  },
  {
    id: "L_Q06",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q06.mp3",
    audio_text: "A：你的生日是哪一天？B：我的生日是五月三号。",
    prompt: "问题：B的生日是哪一天？",
    choices: ["五月三号", "五月四号", "六月三号", "四月三号"],
    answer: 0
  },
  {
    id: "L_Q07",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q07.mp3",
    audio_text: "A：你会说中文吗？B：我会说一点儿。",
    prompt: "问题：B会说中文吗？",
    choices: ["不会", "会说一点儿", "会说很多", "只会说英语"],
    answer: 1
  },
  {
    id: "L_Q08",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q08.mp3",
    audio_text: "A：你家有几口人？B：我家有四口人。",
    prompt: "问题：B家有几口人？",
    choices: ["三口", "四口", "五口", "六口"],
    answer: 1
  },
  {
    id: "L_Q09",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q09.mp3",
    audio_text: "A：你周末做什么？B：我周末去看电影。",
    prompt: "问题：B周末做什么？",
    choices: ["去看电影", "去买东西", "去上课", "去吃饭"],
    answer: 0
  },
  {
    id: "L_Q10",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q10.mp3",
    audio_text: "A：我们什么时候见面？B：我们明天上午十点见。",
    prompt: "问题：他们什么时候见面？",
    choices: ["今天上午十点", "明天上午十点", "明天下午十点", "后天上午十点"],
    answer: 1
  },
  {
    id: "L_Q11",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q11.mp3",
    audio_text: "A：你在哪里工作？B：我在公司工作。",
    prompt: "问题：B在哪里工作？",
    choices: ["在学校", "在公司", "在医院", "在家"],
    answer: 1
  },
  {
    id: "L_Q12",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q12.mp3",
    audio_text: "A：你怎么去学校？B：我坐地铁去学校。",
    prompt: "问题：B怎么去学校？",
    choices: ["坐地铁", "坐公交", "走路", "开车"],
    answer: 0
  },
  {
    id: "L_Q13",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q13.mp3",
    audio_text: "A：你昨天做了什么？B：我昨天去逛街了。",
    prompt: "问题：B昨天做了什么？",
    choices: ["去上课", "去逛街", "去旅行", "去吃饭"],
    answer: 1
  },
  {
    id: "L_Q14",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q14.mp3",
    audio_text: "A：这件衣服多少钱？B：这件衣服一百块。",
    prompt: "问题：这件衣服多少钱？",
    choices: ["一百块", "两百块", "三百块", "五十块"],
    answer: 0
  },
  {
    id: "L_Q15",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q15.mp3",
    audio_text: "A：你喜欢中国菜还是西餐？B：我更喜欢中国菜。",
    prompt: "问题：B喜欢什么？",
    choices: ["中国菜", "西餐", "都不喜欢", "都喜欢"],
    answer: 0
  },
  {
    id: "L_Q16",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q16.mp3",
    audio_text: "A：你今天下午有空吗？B：我今天下午没空，要上课。",
    prompt: "问题：B今天下午有空吗？",
    choices: ["有空", "没空", "不确定", "没说"],
    answer: 1
  },
  {
    id: "L_Q17",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q17.mp3",
    audio_text: "A：你觉得天气怎么样？B：今天很热。",
    prompt: "问题：今天天气怎么样？",
    choices: ["很冷", "很热", "下雨", "下雪"],
    answer: 1
  },
  {
    id: "L_Q18",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q18.mp3",
    audio_text: "A：你想喝茶还是咖啡？B：我想喝茶。",
    prompt: "问题：B想喝什么？",
    choices: ["茶", "牛奶", "咖啡", "水"],
    answer: 0
  },
  {
    id: "L_Q19",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q19.mp3",
    audio_text: "A：你明天去哪儿？B：我明天去北京。",
    prompt: "问题：B明天去哪儿？",
    choices: ["上海", "北京", "广州", "成都"],
    answer: 1
  },
  {
    id: "L_Q20",
    section: "listening",
    type: "listening_mcq",
    points: 2,
    audio: "audio/L_Q20.mp3",
    audio_text: "A：你会写汉字吗？B：我会写一点儿汉字。",
    prompt: "问题：B会写汉字吗？",
    choices: ["不会", "会写一点儿", "会写很多", "只会写拼音"],
    answer: 1
  },

  // ==========================
  // B. 阅读 Reading（你给的题库里目前 19 道）
  // ==========================
  {
    id: "R1",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "你好！我叫王晓云，我是老师。请问：“王晓云是谁？”",
    choices: ["老师", "学生", "医生", "经理"],
    answer: 0
  },
  {
    id: "R2",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我今天下午去图书馆看书。请问：“我下午去哪儿？”",
    choices: ["图书馆", "学校", "公司", "饭店"],
    answer: 0
  },
  {
    id: "R3",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "明天是星期天，我们去公园玩吧！请问：“明天星期几？”",
    choices: ["星期六", "星期天", "星期一", "星期五"],
    answer: 1
  },
  {
    id: "R4",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我想买一杯咖啡。请问：“我想买什么？”",
    choices: ["茶", "咖啡", "牛奶", "水"],
    answer: 1
  },
  {
    id: "R5",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "他家有三口人：爸爸、妈妈和他。请问：“他家有几口人？”",
    choices: ["两口", "三口", "四口", "五口"],
    answer: 1
  },
  {
    id: "R6",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我每天早上七点起床。请问：“我几点起床？”",
    choices: ["六点", "七点", "八点", "九点"],
    answer: 1
  },
  {
    id: "R7",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我喜欢吃中国菜，特别喜欢吃饺子。请问：“我喜欢吃什么？”",
    choices: ["西餐", "中国菜", "披萨", "汉堡"],
    answer: 1
  },
  {
    id: "R8",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "今天很冷，你要多穿点衣服。请问：“今天天气怎么样？”",
    choices: ["很热", "很冷", "下雨", "下雪"],
    answer: 1
  },
  {
    id: "R9",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我坐地铁去学校，很方便。请问：“我怎么去学校？”",
    choices: ["坐地铁", "坐公交", "走路", "开车"],
    answer: 0
  },
  {
    id: "R10",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "他昨天去看电影了。请问：“他昨天做了什么？”",
    choices: ["看电影", "去旅行", "去上课", "去工作"],
    answer: 0
  },
  {
    id: "R11",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "这件衣服一百块钱。请问：“这件衣服多少钱？”",
    choices: ["一百块", "两百块", "三百块", "五十块"],
    answer: 0
  },
  {
    id: "R12",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我明天要去北京出差。请问：“我明天去哪儿？”",
    choices: ["上海", "北京", "广州", "成都"],
    answer: 1
  },
  {
    id: "R13",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "周末我喜欢在家休息，不喜欢出门。请问：“我周末喜欢做什么？”",
    choices: ["出门玩", "在家休息", "去上课", "去工作"],
    answer: 1
  },
  {
    id: "R14",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "他在公司工作，是一名经理。请问：“他是谁？”",
    choices: ["老师", "学生", "经理", "医生"],
    answer: 2
  },
  {
    id: "R15",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我妈妈喜欢喝茶，我爸爸喜欢喝咖啡。请问：“我爸爸喜欢喝什么？”",
    choices: ["茶", "咖啡", "牛奶", "水"],
    answer: 1
  },
  {
    id: "R16",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我们今天晚上六点在饭店见面。请问：“我们几点见面？”",
    choices: ["五点", "六点", "七点", "八点"],
    answer: 1
  },
  {
    id: "R17",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "我不会说中文，只会说英语。请问：“我会说什么？”",
    choices: ["中文", "日语", "英语", "法语"],
    answer: 2
  },
  {
    id: "R18",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "他每天早上跑步，所以身体很好。请问：“他为什么身体很好？”",
    choices: ["因为他每天跑步", "因为他喜欢吃肉", "因为他不运动", "因为他睡得很晚"],
    answer: 0
  },
  {
    id: "R19",
    section: "reading",
    type: "mcq",
    points: 2,
    prompt: "今天下雨了，我们就不去公园了。请问：“今天他们去公园吗？”",
    choices: ["去", "不去", "不知道", "没说"],
    answer: 1
  },

  // ==========================
  // C. 写作 Writing（你给的题库里目前是“选词填空示例 5 题 + 排序示例 3 题”）
  // 主观题你后续要加也可以：type: "short_text"
  // ==========================
  {
    id: "W1",
    section: "writing",
    type: "mcq",
    points: 2,
    prompt: "我___北京。",
    choices: ["去", "吃", "看", "说"],
    answer: 0
  },
  {
    id: "W2",
    section: "writing",
    type: "mcq",
    points: 2,
    prompt: "他___老师。",
    choices: ["是", "有", "在", "去"],
    answer: 0
  },
  {
    id: "W3",
    section: "writing",
    type: "mcq",
    points: 2,
    prompt: "我___喝咖啡。",
    choices: ["喜欢", "跑步", "学习", "睡觉"],
    answer: 0
  },
  {
    id: "W4",
    section: "writing",
    type: "mcq",
    points: 2,
    prompt: "我们___学校见面。",
    choices: ["在", "吃", "写", "走"],
    answer: 0
  },
  {
    id: "W5",
    section: "writing",
    type: "mcq",
    points: 2,
    prompt: "今天___热。",
    choices: ["很", "去", "看", "写"],
    answer: 0
  },

  // 下面 3 道排序题：先当“主观不自动判分”也可以（如果你要自动判分，我可以下一步给你加拖拽/拼句判定）
  {
    id: "W11",
    section: "writing",
    type: "short_text",
    points: 2,
    prompt: "把词语排序成一句话：（我 / 喜欢 / 中国菜）\n请在下面输入正确句子：",
  },
  {
    id: "W12",
    section: "writing",
    type: "short_text",
    points: 2,
    prompt: "把词语排序成一句话：（他 / 明天 / 去 / 北京）\n请在下面输入正确句子：",
  },
  {
    id: "W13",
    section: "writing",
    type: "short_text",
    points: 2,
    prompt: "把词语排序成一句话：（我们 / 在 / 学校 / 见面）\n请在下面输入正确句子：",
  },
];
