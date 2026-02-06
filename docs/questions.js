// ==============================
// Placement Test Question Bank
// 固定卷：题目不因 School/Project 不同而改变
// 你只需要在 QUESTIONS 里继续加题即可
//
// 听力音频：audio 指向 audio/ 目录下 mp3，例如 "audio/L01.mp3"
// audio_text：仅用于将来 TTS/备份，不会显示在卷面
// ==============================

// （可选）仅用于首页下拉，不影响题目
const PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" },
];

const QUESTIONS = [
  // ==========================
  // Listening 听力（20题）
  // ==========================
  {
    id: "L01", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L01.mp3",
    audio_text: "A：你好吗？B：我很好。",
    prompt: "B 怎么样？",
    choices: ["很忙", "很好", "很累", "很冷"],
    answer: 1
  },
  {
    id: "L02", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L02.mp3",
    audio_text: "A：你喝什么？B：我喝茶。",
    prompt: "B 喝什么？",
    choices: ["咖啡", "茶", "水", "牛奶"],
    answer: 0
  },
  {
    id: "L03", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L03.mp3",
    audio_text: "A：现在几点？B：两点。",
    prompt: "现在几点？",
    choices: ["一点", "两点", "三点", "四点"],
    answer: 1
  },
  {
    id: "L04", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L04.mp3",
    audio_text: "A：你去哪儿？B：我去学校。",
    prompt: "B 去哪儿？",
    choices: ["医院", "学校", "商店", "家"],
    answer: 1
  },
  {
    id: "L05", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L05.mp3",
    audio_text: "A：你喜欢中国菜吗？B：我很喜欢。",
    prompt: "B 喜欢中国菜吗？",
    choices: ["不喜欢", "很喜欢", "一般", "不知道"],
    answer: 1
  },
  {
    id: "L06", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L06.mp3",
    audio_text: "A：明天你有空吗？B：我没有空。",
    prompt: "明天 B 有空吗？",
    choices: ["有", "没有", "不确定", "很忙但有空"],
    answer: 1
  },
  {
    id: "L07", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L07.mp3",
    audio_text: "A：今天星期几？B：星期五。",
    prompt: "今天星期几？",
    choices: ["星期三", "星期四", "星期五", "星期六"],
    answer: 2
  },
  {
    id: "L08", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L08.mp3",
    audio_text: "A：你住哪儿？B：我住北京。",
    prompt: "B 住哪儿？",
    choices: ["上海", "北京", "广州", "成都"],
    answer: 1
  },
  {
    id: "L09", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L09.mp3",
    audio_text: "A：你吃饭了吗？B：我吃了。",
    prompt: "B 吃饭了吗？",
    choices: ["没吃", "吃了", "不想吃", "不知道"],
    answer: 1
  },
  {
    id: "L10", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L10.mp3",
    audio_text: "A：这个多少钱？B：十块钱。",
    prompt: "这个多少钱？",
    choices: ["八块", "十块", "十二块", "二十块"],
    answer: 1
  },
  {
    id: "L11", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L11.mp3",
    audio_text: "A：你周末做什么？B：我去看电影。",
    prompt: "周末 B 做什么？",
    choices: ["看书", "看电影", "运动", "做饭"],
    answer: 1
  },
  {
    id: "L12", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L12.mp3",
    audio_text: "A：你怎么去学校？B：我坐地铁去。",
    prompt: "B 怎么去学校？",
    choices: ["走路", "开车", "坐地铁", "骑车"],
    answer: 2
  },
  {
    id: "L13", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L13.mp3",
    audio_text: "A：你要吃什么？B：我要一碗面。",
    prompt: "B 要吃什么？",
    choices: ["米饭", "面", "饺子", "包子"],
    answer: 1
  },
  {
    id: "L14", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L14.mp3",
    audio_text: "A：你觉得这个地方怎么样？B：我觉得很漂亮。",
    prompt: "B 觉得这个地方怎么样？",
    choices: ["很贵", "很漂亮", "很远", "很小"],
    answer: 1
  },
  {
    id: "L15", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L15.mp3",
    audio_text: "A：你想喝点什么？B：我想喝果汁。",
    prompt: "B 想喝什么？",
    choices: ["茶", "水", "咖啡", "果汁"],
    answer: 3
  },
  {
    id: "L16", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L16.mp3",
    audio_text: "A：今天的天气怎么样？B：今天有点冷。",
    prompt: "今天的天气怎么样？",
    choices: ["很热", "有点冷", "下雨", "刮风"],
    answer: 1
  },
  {
    id: "L17", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L17.mp3",
    audio_text: "A：你为什么迟到了？B：因为路上很堵。",
    prompt: "B 为什么迟到？",
    choices: ["因为下雨", "因为堵车", "因为睡过头", "因为找不到路"],
    answer: 1
  },
  {
    id: "L18", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L18.mp3",
    audio_text: "A：这家店几点开门？B：八点开门。",
    prompt: "这家店几点开门？",
    choices: ["七点", "八点", "九点", "十点"],
    answer: 1
  },
  {
    id: "L19", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L19.mp3",
    audio_text: "A：你觉得学习中文难吗？B：一开始难，现在好多了。",
    prompt: "B 觉得学习中文怎么样？",
    choices: ["一直很难", "一开始难，现在好多了", "不难", "没学过"],
    answer: 1
  },
  {
    id: "L20", section: "listening", type: "listening_mcq", points: 1,
    audio: "audio/L20.mp3",
    audio_text: "A：你下个月去哪里旅行？B：我打算去西安。",
    prompt: "B 下个月打算去哪里？",
    choices: ["北京", "上海", "西安", "广州"],
    answer: 2
  },

  // ==========================
  // Reading 阅读（25题）
  // ==========================
  { id:"R01", section:"reading", type:"mcq", points:1,
    prompt:"“我不喝咖啡。”",
    choices:["我喜欢咖啡","我不喜欢咖啡","我只喝咖啡","我卖咖啡"],
    answer:1
  },
  { id:"R02", section:"reading", type:"mcq", points:1,
    prompt:"“他在学校。”",
    choices:["他去学校了","他不在学校","他正在学校","学校在他家"],
    answer:2
  },
  { id:"R03", section:"reading", type:"mcq", points:1,
    prompt:"“这是我的朋友。”",
    choices:["这是我认识的人","这是我的老师","这是我的爸爸","这是我的同学"],
    answer:0
  },
  { id:"R04", section:"reading", type:"mcq", points:1,
    prompt:"“今天很热。”",
    choices:["今天很冷","今天天气热","今天下雨","今天刮风"],
    answer:1
  },
  { id:"R05", section:"reading", type:"mcq", points:1,
    prompt:"“我们一起吃饭吧。”",
    choices:["你别吃","你吃我看","一起吃","不用吃"],
    answer:2
  },
  { id:"R06", section:"reading", type:"mcq", points:1,
    prompt:"“我家离地铁站很近。”",
    choices:["我家很远","我家在地铁站里","我家不近","我家靠近地铁站"],
    answer:3
  },

  { id:"R07", section:"reading", type:"mcq", points:1,
    prompt:"我今天 ___ 去超市。",
    choices:["要","来","走","会"],
    answer:0
  },
  { id:"R08", section:"reading", type:"mcq", points:1,
    prompt:"他每天 ___ 点起床。",
    choices:["两","八","十","五"],
    answer:1
  },
  { id:"R09", section:"reading", type:"mcq", points:1,
    prompt:"我喜欢吃米饭，也 ___ 吃面。",
    choices:["可","都","也","不"],
    answer:2
  },
  { id:"R10", section:"reading", type:"mcq", points:1,
    prompt:"如果明天不下雨，我们 ___ 去公园。",
    choices:["就","才","也","不"],
    answer:0
  },
  { id:"R11", section:"reading", type:"mcq", points:1,
    prompt:"你 ___ 哪儿来？",
    choices:["从","在","把","给"],
    answer:0
  },
  { id:"R12", section:"reading", type:"mcq", points:1,
    prompt:"这个菜太辣了，我吃 ___ 了。",
    choices:["不下","不上","不了","不去"],
    answer:2
  },

  // R13–R18（短文）
  { id:"R13", section:"reading", type:"mcq", points:1,
    prompt:"短文：我来中国三个月了。刚开始我听不懂老师说的话，现在好多了。我每天练习听力，也跟同学说中文。\n\n这个人来中国多久了？",
    choices:["三天","三个月","三年","三十个月"],
    answer:1
  },
  { id:"R14", section:"reading", type:"mcq", points:1,
    prompt:"短文：我来中国三个月了。刚开始我听不懂老师说的话，现在好多了。我每天练习听力，也跟同学说中文。\n\n他现在为什么听得懂了？",
    choices:["因为他每天练习","因为老师说得慢","因为他不学习","因为他去旅游"],
    answer:0
  },
  { id:"R15", section:"reading", type:"mcq", points:1,
    prompt:"短文：今天我和朋友去吃火锅。人很多，我们等了半个小时才有座位。虽然等得久，但是火锅很好吃。\n\n他们为什么要等？",
    choices:["因为火锅不好吃","因为人很多","因为没带钱","因为下雨了"],
    answer:1
  },
  { id:"R16", section:"reading", type:"mcq", points:1,
    prompt:"短文：今天我和朋友去吃火锅。人很多，我们等了半个小时才有座位。虽然等得久，但是火锅很好吃。\n\n火锅怎么样？",
    choices:["不好吃","很贵","很好吃","很辣"],
    answer:2
  },
  { id:"R17", section:"reading", type:"mcq", points:1,
    prompt:"短文：小王每天晚上十点睡觉，早上六点起床。他觉得早睡早起身体好，所以一直坚持。\n\n小王几点起床？",
    choices:["六点","八点","十点","十二点"],
    answer:0
  },
  { id:"R18", section:"reading", type:"mcq", points:1,
    prompt:"短文：小王每天晚上十点睡觉，早上六点起床。他觉得早睡早起身体好，所以一直坚持。\n\n他为什么早睡早起？",
    choices:["因为他没时间","因为他觉得身体好","因为他喜欢工作","因为他爱看电视"],
    answer:1
  },

  // R19–R25（理解/推断）
  { id:"R19", section:"reading", type:"mcq", points:1,
    prompt:"“这件衣服又便宜又好看。” 最合适的意思是：",
    choices:["很贵不好看","很便宜不好看","便宜又好看","贵但好看"],
    answer:2
  },
  { id:"R20", section:"reading", type:"mcq", points:1,
    prompt:"“我差点迟到了。” 表示：",
    choices:["我迟到了","我没有迟到，但差一点","我很早到","我不想去"],
    answer:1
  },
  { id:"R21", section:"reading", type:"mcq", points:1,
    prompt:"“他一边听音乐一边写作业。” 表示：",
    choices:["他先听音乐再写作业","他同时做两件事","他不写作业","他不听音乐"],
    answer:1
  },
  { id:"R22", section:"reading", type:"mcq", points:1,
    prompt:"“因为下雨，所以我们没去爬山。” 表示：",
    choices:["下雨我们去爬山了","没下雨也没去","下雨导致没去","爬山导致下雨"],
    answer:2
  },
  { id:"R23", section:"reading", type:"mcq", points:1,
    prompt:"“他不是不会做，只是不想做。” 表示：",
    choices:["他不会做","他能做但不想做","他想做但不会做","他不会也不想"],
    answer:1
  },
  { id:"R24", section:"reading", type:"mcq", points:1,
    prompt:"“我本来想今天去，但是太忙了。” 表示：",
    choices:["我今天去了","我原计划今天去，但没去","我明天去","我不忙"],
    answer:1
  },
  { id:"R25", section:"reading", type:"mcq", points:1,
    prompt:"“他刚到家，就下起雨来了。” 表示：",
    choices:["他到家后马上下雨","他到家前下雨","他没到家","雨停了"],
    answer:0
  },

  // ==========================
  // Writing 书写（15题：选择 + 排序）
  // ==========================
  // W-A（10题）选择正确词
  { id:"W_A01", section:"writing", type:"mcq", points:1, prompt:"我( )中文。", choices:["学习","跑步","睡觉","喝水"], answer:0 },
  { id:"W_A02", section:"writing", type:"mcq", points:1, prompt:"他每天( )八点起床。", choices:["早上","晚上","昨天","明天"], answer:0 },
  // 第3题你文档写“或按你设定”，我这里默认选 C（也允许 A/B/C）
  { id:"W_A03", section:"writing", type:"mcq", points:1, prompt:"我们( )去博物馆吧。", choices:["已经","如果","一起","因为"], answer:[0,1,2] },
  { id:"W_A04", section:"writing", type:"mcq", points:1, prompt:"请你( )慢一点说。", choices:["再","很","就","把"], answer:0 },
  { id:"W_A05", section:"writing", type:"mcq", points:1, prompt:"这个菜太辣了，我吃( )了。", choices:["不了","不上","不下","不去"], answer:0 },
  { id:"W_A06", section:"writing", type:"mcq", points:1, prompt:"我昨天( )北京。", choices:["去了","去","去着","去过"], answer:0 },
  { id:"W_A07", section:"writing", type:"mcq", points:1, prompt:"他( )会说中文，还会说英文。", choices:["不但","因为","所以","如果"], answer:0 },
  { id:"W_A08", section:"writing", type:"mcq", points:1, prompt:"我一边( )一边听音乐。", choices:["写作业","跑步","吃饭","睡觉"], answer:0 },
  { id:"W_A09", section:"writing", type:"mcq", points:1, prompt:"如果明天下雨，我们就( )去公园。", choices:["不","要","会","也"], answer:0 },
  { id:"W_A10", section:"writing", type:"mcq", points:1, prompt:"这里交通很方便，所以很( )。", choices:["受欢迎","生气","迟到","疲劳"], answer:0 },

  // W-B（5题）词语排序（自动判分：与参考答案一致即可）
  { id:"W_B01", section:"writing", type:"reorder", points:2, prompt:"把词语排成通顺句子", tokens:["我","来","中国","已经","三个月","了"], reference:"我已经来中国三个月了。" },
  { id:"W_B02", section:"writing", type:"reorder", points:2, prompt:"把词语排成通顺句子", tokens:["他","一边","听音乐","一边","写作业"], reference:"他一边听音乐一边写作业。" },
  { id:"W_B03", section:"writing", type:"reorder", points:2, prompt:"把词语排成通顺句子", tokens:["如果","明天下雨","我们","就","不去","公园"], reference:"如果明天下雨，我们就不去公园。" },
  { id:"W_B04", section:"writing", type:"reorder", points:2, prompt:"把词语排成通顺句子", tokens:["因为","交通","很方便","所以","这里","很受欢迎"], reference:"因为交通很方便，所以这里很受欢迎。" },
  { id:"W_B05", section:"writing", type:"reorder", points:2, prompt:"把词语排成通顺句子", tokens:["我","本来","想","今天","去","但是","太忙","了"], reference:"我本来想今天去，但是太忙了。" },
];
