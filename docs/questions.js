// ==============================
// Question Bank (25 items + 1 practice)
// - L00: practice_listening (Not scored) with speaker audio + image options
// - Listening: L01–L15
//   - Image-only options (no text): L01, L02, L04, L06, L08
//   - Text-only options (NO A/B/C/D prefixes): L03, L05, L07, L09–L15
// - MCQ section: C16–C25 (NO A/B/C/D prefixes)
//
// IMPORTANT PATHS (match your GitHub Pages publish folder):
// - Practice audio: audio/L00.mp3
// - Listening audios: audio/L01.mp3 ... audio/L15.mp3
// - Practice images: img/EX_A.png ... img/EX_D.png
// - Listening images: img/L01_A.png ... etc
// ==============================

const PROJECT_OPTIONS = [
  { value: "CIS", label: "CIS" },
  { value: "Hohhot", label: "Hohhot" }
];

const QUESTIONS = [
  // =========================
  // Practice (Not scored)
  // =========================
  {
    id: "L00",
    section: "listening",
    type: "practice_listening",
    points: 0,
    title: "试听题 / Practice (Not scored)",
    prompt: "她喜欢什么颜色？ / What color does she like?",
    audio: "audio/L00.mp3",
    // ✅ image-only (no text; UI already shows A/B/C/D)
    choices: [
      { text: "", img: "img/EX_A.png" },
      { text: "", img: "img/EX_B.png" },
      { text: "", img: "img/EX_C.png" },
      { text: "", img: "img/EX_D.png" }
    ],
    answer: 1, // B
    helpHtml: `
      <div style="line-height:1.7">
        <div style="font-weight:900">说明 / Instructions</div>
        <div>请点击喇叭按钮听录音，然后选 A/B/C/D。/ Click the speaker to listen, then choose A/B/C/D.</div>
        <div style="margin-top:6px">此题不计分，但必须完成后才进入正式题。/ Not scored, but required to start the test.</div>
      </div>
    `
  },

  // =========================
  // Listening 1–15
  // =========================

  // 1 (image-only)
  {
    id: "L01",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L01.mp3",
    prompt: "1. 男的是谁？（Who is the man?）",
    choices: [
      { text: "", img: "img/L01_A.png" },
      { text: "", img: "img/L01_B.png" },
      { text: "", img: "img/L01_C.png" },
      { text: "", img: "img/L01_D.png" }
    ],
    answer: 0
  },

  // 2 (image-only)
  {
    id: "L02",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L02.mp3",
    prompt: "2. 男的想喝什么？（What does the man want to drink?）",
    choices: [
      { text: "", img: "img/L02_A.png" },
      { text: "", img: "img/L02_B.png" },
      { text: "", img: "img/L02_C.png" },
      { text: "", img: "img/L02_D.png" }
    ],
    answer: 0
  },

  // 3 (text-only) ✅ NO A/B/C/D prefixes
  {
    id: "L03",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L03.mp3",
    prompt: "3. 今天几号？（What date is it today?）",
    choices: ["1号", "2号", "3号", "4号"],
    answer: 2
  },

  // 4 (image-only)
  {
    id: "L04",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L04.mp3",
    prompt: "4. 他家有几口人？（How many people are in his family?）",
    choices: [
      { text: "", img: "img/L04_A.png" },
      { text: "", img: "img/L04_B.png" },
      { text: "", img: "img/L04_C.png" },
      { text: "", img: "img/L04_D.png" }
    ],
    answer: 2
  },

  // 5 (text-only) ✅ NO A/B/C/D prefixes
  {
    id: "L05",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L05.mp3",
    prompt: "5. 现在几点？（What time is it now?）",
    choices: ["8:00", "8:30", "9:00", "9:30"],
    answer: 1
  },

  // 6 (image-only)
  {
    id: "L06",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L06.mp3",
    prompt: "6. 他去哪儿？（Where is he going?）",
    choices: [
      { text: "", img: "img/L06_A.png" },
      { text: "", img: "img/L06_B.png" },
      { text: "", img: "img/L06_C.png" },
      { text: "", img: "img/L06_D.png" }
    ],
    answer: 0
  },

  // 7 (text-only) ✅ NO A/B/C/D prefixes
  {
    id: "L07",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L07.mp3",
    prompt: "7. 这件衣服多少钱？（How much is this clothing item?）",
    choices: ["15块", "30块", "50块", "80块"],
    answer: 2
  },

  // 8 (image-only)
  {
    id: "L08",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L08.mp3",
    prompt: "8. 他喜欢什么？（What does he like?）",
    choices: [
      { text: "", img: "img/L08_A.png" },
      { text: "", img: "img/L08_B.png" },
      { text: "", img: "img/L08_C.png" },
      { text: "", img: "img/L08_D.png" }
    ],
    answer: 0
  },

  // 9–15 (text-only) ✅ NO A/B/C/D prefixes
  {
    id: "L09",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L09.mp3",
    prompt: "9. 明天天气怎么样？",
    choices: ["很热", "很冷", "下雨", "下雪"],
    answer: 2
  },
  {
    id: "L10",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L10.mp3",
    prompt: "10. 男生会不会说中文？",
    choices: ["不会", "会一点儿", "会很多", "不知道"],
    answer: 1
  },
  {
    id: "L11",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L11.mp3",
    prompt: "11. 女生怎么来学校？",
    choices: ["坐地铁", "坐公交车", "走路", "开车"],
    answer: 0
  },
  {
    id: "L12",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L12.mp3",
    prompt: "12. 他为什么没去游泳？",
    choices: ["因为下雨了", "因为太忙了", "因为感冒了", "因为忘了"],
    answer: 2
  },
  {
    id: "L13",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L13.mp3",
    prompt: "13. 他们先做什么？",
    choices: ["先看电影", "先去图书馆", "先吃饭", "先踢足球"],
    answer: 1
  },
  {
    id: "L14",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L14.mp3",
    prompt: "14. 他几点睡觉？",
    choices: ["九点", "十点", "十点半", "十一点"],
    answer: 1
  },
  {
    id: "L15",
    section: "listening",
    type: "listening_mcq",
    points: 1,
    audio: "audio/L15.mp3",
    prompt: "15. 他们上周去了哪里？",
    choices: ["动物园", "公园", "图书馆", "博物馆"],
    answer: 0
  },

  // =========================
  // MCQ Section 16–25 (选择题 / MCQ) ✅ NO A/B/C/D prefixes
  // =========================
  { id:"C16", section:"reading", type:"mcq", points:1, prompt:"16. 我 ___ 中国。", choices:["来","去","看","听"], answer:0 },
  { id:"C17", section:"reading", type:"mcq", points:1, prompt:"17. 我想喝一 ___ 水。", choices:["杯","本","张","条"], answer:0 },
  { id:"C18", section:"reading", type:"mcq", points:1, prompt:"18. 选出最自然的一句：", choices:[
      "我明天跟朋友去看电影。",
      "我跟朋友明天去看电影。",
      "我去看电影明天跟朋友。",
      "我明天去跟朋友看电影。"
    ], answer:0
  },
  { id:"C19", section:"reading", type:"mcq", points:1, prompt:"19. ___ 下雨，所以我们不去公园。", choices:["因为","但是","还是","和"], answer:0 },
  { id:"C20", section:"reading", type:"mcq", points:1, prompt:"20. 你要茶 ___ 咖啡？", choices:["和","还是","因为","所以"], answer:1 },
  { id:"C21", section:"reading", type:"mcq", points:1, prompt:"21. 他比我 ___。", choices:["高","高的","高了","高着"], answer:0 },
  { id:"C22", section:"reading", type:"mcq", points:1, prompt:"22. 选出正确的一句：", choices:[
      "请把门关上。",
      "请把关上门。",
      "请门把关上。",
      "请把门关上了着。"
    ], answer:0
  },
  { id:"C23", section:"reading", type:"mcq", points:1, prompt:"23. 小通知：今天下午三点有中文课，请准时到教室。\n中文课几点开始？", choices:["两点","三点","四点","五点"], answer:1 },
  { id:"C24", section:"reading", type:"mcq", points:1, prompt:"24. 他下午做什么？", choices:["做作业","踢足球","看电影","去游泳"], answer:1 },
  { id:"C25", section:"reading", type:"mcq", points:1, prompt:"25. 我很喜欢 ___ 中文。", choices:["学习","学习着","学了","学过"], answer:0 },
];