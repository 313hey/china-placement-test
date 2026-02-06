// 你只需要改这里就能改“项目下拉选项”
const PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" },
];

// 固定卷题库：来自《来华中文水平测试》
// 听力：用 audio_text 做 TTS（默认不在卷面显示）；若你有 mp3，也可以加 audio 字段指向 docs/audio/*.mp3
const QUESTIONS = [
  // =========================
  // A. 听力 Listening（20题）
  // =========================
  { id:"L1", section:"Listening", level:"HSK1", type:"listening_mcq", points:1,
    audio_text:"A：你好吗？B：我很好。问题：B 怎么样？",
    prompt:"听对话，选正确答案：B 怎么样？",
    choices:["很忙","很好","很累","很冷"], answer:1 },

  { id:"L2", section:"Listening", level:"HSK1", type:"listening_mcq", points:1,
    audio_text:"A：你叫什么名字？B：我叫 Mike。问题：B 叫什么？",
    prompt:"听对话，选正确答案：B 叫什么？",
    choices:["Mike","Mary","Mark","Mei"], answer:0 },

  { id:"L3", section:"Listening", level:"HSK1", type:"listening_mcq", points:1,
    audio_text:"A：这是你的书吗？B：不是，是我的。问题：这本书是谁的？",
    prompt:"听对话，选正确答案：这本书是谁的？",
    choices:["A 的","B 的","不是他们的","不知道"], answer:1 },

  { id:"L4", section:"Listening", level:"HSK1", type:"listening_mcq", points:1,
    audio_text:"A：你要茶还是咖啡？B：我要茶。问题：B 要什么？",
    prompt:"听对话，选正确答案：B 要什么？",
    choices:["水","茶","咖啡","牛奶"], answer:1 },

  { id:"L5", section:"Listening", level:"HSK1", type:"listening_mcq", points:1,
    audio_text:"A：你家在哪儿？B：在学校旁边。问题：B 家在哪儿？",
    prompt:"听对话，选正确答案：B 家在哪儿？",
    choices:["学校里面","学校旁边","学校后面","学校对面"], answer:1 },

  { id:"L6", section:"Listening", level:"HSK2", type:"listening_mcq", points:1,
    audio_text:"A：现在几点？B：八点半。问题：现在几点？",
    prompt:"听对话，选正确答案：现在几点？",
    choices:["8:00","8:30","9:00","9:30"], answer:1 },

  { id:"L7", section:"Listening", level:"HSK2", type:"listening_mcq", points:1,
    audio_text:"A：你明天去北京吗？B：不去，我去上海。问题：B 明天去哪里？",
    prompt:"听对话，选正确答案：B 明天去哪里？",
    choices:["北京","上海","广州","深圳"], answer:1 },

  { id:"L8", section:"Listening", level:"HSK2", type:"listening_mcq", points:1,
    audio_text:"A：这个多少钱？B：二十块。问题：多少钱？",
    prompt:"听对话，选正确答案：多少钱？",
    choices:["12","20","28","200"], answer:1 },

  { id:"L9", section:"Listening", level:"HSK2", type:"listening_mcq", points:1,
    audio_text:"A：你会说中文吗？B：会一点儿。问题：B 中文怎么样？",
    prompt:"听对话，选正确答案：B 中文怎么样？",
    choices:["很好","一点儿","不会","只会写"], answer:1 },

  { id:"L10", section:"Listening", level:"HSK2", type:"listening_mcq", points:1,
    audio_text:"A：你怎么来学校？B：我坐地铁来。问题：B 怎么来学校？",
    prompt:"听对话，选正确答案：B 怎么来学校？",
    choices:["走路","坐地铁","坐飞机","坐船"], answer:1 },

  { id:"L11", section:"Listening", level:"HSK3", type:"listening_mcq", points:1,
    audio_text:"A：周末你想做什么？B：我想去看电影，但是我还要写作业。问题：B 周末可能先做什么？",
    prompt:"听对话，选正确答案：B 周末可能先做什么？",
    choices:["去旅游","看电影","写作业","去运动"], answer:2 },

  { id:"L12", section:"Listening", level:"HSK3", type:"listening_mcq", points:1,
    audio_text:"A：你昨天为什么没来上课？B：我感冒了，在家休息。问题：B 昨天怎么了？",
    prompt:"听对话，选正确答案：B 昨天怎么了？",
    choices:["迟到了","感冒了","生气了","忘了时间"], answer:1 },

  { id:"L13", section:"Listening", level:"HSK3", type:"listening_mcq", points:1,
    audio_text:"A：我们几点出发？B：九点出发比较好，太早你会困。问题：他们几点出发？",
    prompt:"听对话，选正确答案：他们几点出发？",
    choices:["8点","9点","10点","12点"], answer:1 },

  { id:"L14", section:"Listening", level:"HSK3", type:"listening_mcq", points:1,
    audio_text:"A：这家餐厅人很多，我们要排队吗？B：不用，我已经订位了。问题：B 为什么不用排队？",
    prompt:"听对话，选正确答案：B 为什么不用排队？",
    choices:["人不多","订位了","不吃饭","关门了"], answer:1 },

  { id:"L15", section:"Listening", level:"HSK3", type:"listening_mcq", points:1,
    audio_text:"A：你觉得中文难不难？B：听力还可以，但是我写汉字很慢。问题：B 哪方面更弱？",
    prompt:"听对话，选正确答案：B 哪方面更弱？",
    choices:["听力","口语","写字","阅读"], answer:2 },

  { id:"L16", section:"Listening", level:"HSK4", type:"listening_mcq", points:1,
    audio_text:"小通知：今天下午三点在一楼大厅集合，去博物馆参观。请大家带学生证。问题：集合时间是几点？",
    prompt:"听通知，选正确答案：集合时间是几点？",
    choices:["2点","3点","4点","5点"], answer:1 },

  { id:"L17", section:"Listening", level:"HSK4", type:"listening_mcq", points:1,
    audio_text:"A：你想买哪种手机？B：我想要电池更耐用的，而且拍照要清楚。问题：B 最在意什么？",
    prompt:"听对话，选正确答案：B 最在意什么？",
    choices:["颜色","价格","电池和拍照","牌子"], answer:2 },

  { id:"L18", section:"Listening", level:"HSK4", type:"listening_mcq", points:1,
    audio_text:"A：你怎么练中文口语？B：我每天跟同学聊天，还会把自己的录音听一遍。问题：B 用什么方法练口语？",
    prompt:"听对话，选正确答案：B 用什么方法练口语？",
    choices:["只背单词","只看书","聊天+听录音","只写作文"], answer:2 },

  { id:"L19", section:"Listening", level:"HSK4", type:"listening_mcq", points:1,
    audio_text:"A：这次旅行你最喜欢哪里？B：我最喜欢老街，因为可以看到很多传统手工艺。问题：B 为什么喜欢老街？",
    prompt:"听对话，选正确答案：B 为什么喜欢老街？",
    choices:["因为很安静","因为有手工艺","因为离酒店近","因为人少"], answer:1 },

  { id:"L20", section:"Listening", level:"HSK4", type:"listening_mcq", points:1,
    audio_text:"A：如果明天下雨，我们就把户外活动改到后天；如果不下雨，就按原计划走。问题：如果明天下雨，会怎样？",
    prompt:"听对话，选正确答案：如果明天下雨，会怎样？",
    choices:["取消活动","改到后天","提前一天","不改变"], answer:1 },

  // =========================
  // B. 阅读 Reading（25题）
  // =========================
  { id:"R1", section:"Reading", level:"HSK1", type:"mcq", points:1,
    prompt:"“我不喝咖啡。” 最合适的意思是：",
    choices:["我喜欢咖啡","我不喜欢咖啡","我只喝咖啡","我卖咖啡"], answer:1 },

  { id:"R2", section:"Reading", level:"HSK1", type:"mcq", points:1,
    prompt:"“他在学校。” 最合适的意思是：",
    choices:["他去学校了","他不在学校","他正在学校","学校在他家"], answer:2 },

  { id:"R3", section:"Reading", level:"HSK1", type:"mcq", points:1,
    prompt:"“这是我的朋友。” 最合适的意思是：",
    choices:["这是我认识的人","这是我的老师","这是我的爸爸","这是我的同学"], answer:0 },

  { id:"R4", section:"Reading", level:"HSK1", type:"mcq", points:1,
    prompt:"“今天很热。” 最合适的意思是：",
    choices:["今天很冷","今天天气热","今天下雨","今天刮风"], answer:1 },

  { id:"R5", section:"Reading", level:"HSK1", type:"mcq", points:1,
    prompt:"“我们一起吃饭吧。” 最合适的意思是：",
    choices:["你别吃","你吃我看","一起吃","不用吃"], answer:2 },

  { id:"R6", section:"Reading", level:"HSK1", type:"mcq", points:1,
    prompt:"“我家离地铁站很近。” 最合适的意思是：",
    choices:["我家很远","我家在地铁站里","我家不近","我家靠近地铁站"], answer:3 },

  { id:"R7", section:"Reading", level:"HSK2", type:"mcq", points:1,
    prompt:"我____中国菜。",
    choices:["喜欢","走路","书包","早上"], answer:0 },

  { id:"R8", section:"Reading", level:"HSK2", type:"mcq", points:1,
    prompt:"他今天____来上课，因为他生病了。",
    choices:["不能","还是","已经","一起"], answer:0 },

  { id:"R9", section:"Reading", level:"HSK2", type:"mcq", points:1,
    prompt:"这件衣服很漂亮，____有点儿贵。",
    choices:["但是","所以","因为","如果"], answer:0 },

  { id:"R10", section:"Reading", level:"HSK2", type:"mcq", points:1,
    prompt:"我们____九点开始上课。",
    choices:["在","从","跟","对"], answer:0 },

  { id:"R11", section:"Reading", level:"HSK2", type:"mcq", points:1,
    prompt:"你想喝什么？我给你____。",
    choices:["买","走","写","学"], answer:0 },

  { id:"R12", section:"Reading", level:"HSK2", type:"mcq", points:1,
    prompt:"他每天都运动，____身体很好。",
    choices:["所以","但是","还是","如果"], answer:0 },

  // R13-18（短文）
  { id:"R13", section:"Reading", level:"HSK3", type:"mcq", points:1,
    stem:"短文：我来中国三个月了。刚开始我听不懂老师说的话，现在好多了。我每天练习听力，也跟同学说中文。",
    prompt:"这个人来中国多久了？",
    choices:["三天","三个月","三年","三十个月"], answer:1 },

  { id:"R14", section:"Reading", level:"HSK3", type:"mcq", points:1,
    stem:"短文：我来中国三个月了。刚开始我听不懂老师说的话，现在好多了。我每天练习听力，也跟同学说中文。",
    prompt:"他怎么提高中文？",
    choices:["只写汉字","不练习","练听力+说中文","只看电影"], answer:2 },

  { id:"R15", section:"Reading", level:"HSK3", type:"mcq", points:1,
    stem:"短文：昨天我们去公园。下午突然下雨，大家都跑到咖啡店里休息。雨停了以后，我们继续散步。",
    prompt:"昨天下午发生了什么？",
    choices:["下雨了","下雪了","刮风了","很热"], answer:0 },

  { id:"R16", section:"Reading", level:"HSK3", type:"mcq", points:1,
    stem:"短文：昨天我们去公园。下午突然下雨，大家都跑到咖啡店里休息。雨停了以后，我们继续散步。",
    prompt:"雨停后他们做什么？",
    choices:["回家","继续散步","睡觉","去上课"], answer:1 },

  { id:"R17", section:"Reading", level:"HSK3", type:"mcq", points:1,
    stem:"短文：小李想买一台电脑。他先看了价格，又比较了重量和电池。最后他买了更轻的那台，因为他常常出差。",
    prompt:"小李比较了什么？",
    choices:["颜色","价格/重量/电池","电影","天气"], answer:1 },

  { id:"R18", section:"Reading", level:"HSK3", type:"mcq", points:1,
    stem:"短文：小李想买一台电脑。他先看了价格，又比较了重量和电池。最后他买了更轻的那台，因为他常常出差。",
    prompt:"他为什么买更轻的？",
    choices:["因为更便宜","因为更漂亮","因为常出差","因为朋友喜欢"], answer:2 },

  // R19-25（HSK4）
  { id:"R19", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"他虽然很忙，____每天坚持学习中文。",
    choices:["但是","所以","如果","当然"], answer:0 },

  { id:"R20", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"这次活动我本来想参加，____临时有事，只好取消。",
    choices:["因为","可是","于是","结果"], answer:1 },

  { id:"R21", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"你先把作业写完，____可以去玩。",
    choices:["才","就","又","还"], answer:0 },

  { id:"R22", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"这个地方离市中心不远，交通也____方便。",
    choices:["越","更","挺","最"], answer:2 },

  { id:"R23", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"我____你早点告诉我，我就不会迟到了。",
    choices:["只要","要是","即使","除非"], answer:1 },

  { id:"R24", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"他说话很有礼貌，给人的感觉特别____。",
    choices:["友好","漂亮","便宜","热闹"], answer:0 },

  { id:"R25", section:"Reading", level:"HSK4", type:"mcq", points:1,
    prompt:"请你把这段话____一下，用更简单的中文写出来。",
    choices:["练习","解释","修改","讨论"], answer:2 },

  // =========================
  // C. 书写 Writing（20分）
  // =========================
  // W-A（10题客观）
  { id:"WA1", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"1 我( )中文。",
    choices:["学习","学校","学生","学会"], answer:0 },

  { id:"WA2", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"2 他( )北京人。",
    choices:["是","在","有","去"], answer:0 },

  // 注意：原文写 A/B/C 都可，这里为了线上自动判分，固定按“要”(C) 作为标准答案
  { id:"WA3", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"3 我们明天( )去博物馆。",
    choices:["想","会","要","（空）"], answer:2 },

  { id:"WA4", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"4 你( )几点起床？",
    choices:["什么时候","怎么","哪儿","谁"], answer:0 },

  { id:"WA5", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"5 这( )水很甜。",
    choices:["杯","张","本","个"], answer:0 },

  { id:"WA6", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"6 我有点儿( )，想睡觉。",
    choices:["困","热","饿","忙"], answer:0 },

  { id:"WA7", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"7 今天( )冷，带外套吧。",
    choices:["很","太","更","最"], answer:0 },

  { id:"WA8", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"8 他( )上课，因为生病了。",
    choices:["不能","不用","不要","不想"], answer:0 },

  { id:"WA9", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"9 我先吃饭，( )去上课。",
    choices:["然后","但是","所以","因为"], answer:0 },

  { id:"WA10", section:"Writing", level:"HSK1-2", type:"mcq", points:1,
    prompt:"10 你说得太快了，我( )听不懂。",
    choices:["有点儿","一下","一起","还是"], answer:0 },

  // W-B（5题主观：排词成句）
  { id:"WB1", section:"Writing", level:"HSK3-4", type:"writing_text", points:2,
    prompt:"把词语排成通顺句子：\n（我 / 来 / 中国 / 已经 / 三个月 / 了）",
    sample_answer:"我已经来中国三个月了。" },

  { id:"WB2", section:"Writing", level:"HSK3-4", type:"writing_text", points:2,
    prompt:"把词语排成通顺句子：\n（他 / 一边 / 听音乐 / 一边 / 写作业）",
    sample_answer:"他一边听音乐一边写作业。" },

  { id:"WB3", section:"Writing", level:"HSK3-4", type:"writing_text", points:2,
    prompt:"把词语排成通顺句子：\n（如果 / 明天下雨 / 我们 / 就 / 不去 / 公园）",
    sample_answer:"如果明天下雨，我们就不去公园。" },

  { id:"WB4", section:"Writing", level:"HSK3-4", type:"writing_text", points:2,
    prompt:"把词语排成通顺句子：\n（因为 / 交通 / 很方便 / 所以 / 这里 / 很受欢迎）",
    sample_answer:"因为交通很方便，所以这里很受欢迎。" },

  { id:"WB5", section:"Writing", level:"HSK3-4", type:"writing_text", points:2,
    prompt:"把词语排成通顺句子：\n（我 / 本来 / 想 / 今天 / 去 / 但是 / 太忙 / 了）",
    sample_answer:"我本来想今天去，但是太忙了。" },
];

// 客观题答案键（用于自动判分）
// 注：writing_text 不自动判分（老师后评），但会保存学生作答文本
const ANSWER_KEY = {
  // Listening
  L1:1, L2:0, L3:1, L4:1, L5:1, L6:1, L7:1, L8:1, L9:1, L10:1,
  L11:2, L12:1, L13:1, L14:1, L15:2, L16:1, L17:2, L18:2, L19:1, L20:1,
  // Reading
  R1:1, R2:2, R3:0, R4:1, R5:2, R6:3,
  R7:0, R8:0, R9:0, R10:0, R11:0, R12:0,
  R13:1, R14:2, R15:0, R16:1, R17:1, R18:2,
  R19:0, R20:1, R21:0, R22:2, R23:1, R24:0, R25:2,
  // Writing A
  WA1:0, WA2:0, WA3:2, WA4:0, WA5:0, WA6:0, WA7:0, WA8:0, WA9:0, WA10:0,
};
