const QUESTIONS = [
  // 听力说明页（不计分）
  {
    id: "L00",
    section: "listening",
    type: "info",
    points: 0,
    title: "第一大题：听力 Listening（1–15）",
    prompt: `请听录音，并看题目中的“问题”，然后从选项 A/B/C/D 中选出最合适的答案。
Listen to the audio, read the question, then choose the best answer.

提示：
- 每题都可以重复播放。
- 前8题选项是图片，请看图片选择。`,
    html: `
      <div style="border:1px solid rgba(0,0,0,.12);border-radius:12px;padding:12px;background:#fafafa">
        <div style="font-size:13px;color:#666">示例 Example（不计分）</div>
        <div style="margin-top:8px">问题：她喜欢什么颜色？ / What color does she like?</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">A. 红色（图片）</div>
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">B. 蓝色（图片）</div>
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">C. 绿色（图片）</div>
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">D. 黄色（图片）</div>
        </div>
        <div style="margin-top:8px;font-size:13px;color:#666">答案：B</div>
      </div>
    `
  },

  // 听力 1-8：图片选项
  {
    id: "L01", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L01.mp3",
    prompt: "1. 男的是谁？ / Who is the man?",
    choices: [
      { text: "A. 老师 (lǎoshī)", img: "img/L01_A.png" },
      { text: "B. 学生 (xuéshēng)", img: "img/L01_B.png" },
      { text: "C. 医生 (yīshēng)", img: "img/L01_C.png" },
      { text: "D. 警察 (jǐngchá)", img: "img/L01_D.png" }
    ],
    answer: 0
  },
  {
    id: "L02", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L02.mp3",
    prompt: "2. 男的想喝什么？ / What does the man want to drink?",
    choices: [
      { text: "A. 水 (shuǐ)", img: "img/L02_A.png" },
      { text: "B. 茶 (chá)", img: "img/L02_B.png" },
      { text: "C. 牛奶 (niúnǎi)", img: "img/L02_C.png" },
      { text: "D. 咖啡 (kāfēi)", img: "img/L02_D.png" }
    ],
    answer: 0
  },
  {
    id: "L03", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L03.mp3",
    prompt: "3. 今天几号？ / What date is it today?",
    choices: [
      { text: "A. 1号", img: "img/L03_A.png" },
      { text: "B. 2号", img: "img/L03_B.png" },
      { text: "C. 3号", img: "img/L03_C.png" },
      { text: "D. 4号", img: "img/L03_D.png" }
    ],
    answer: 2
  },
  {
    id: "L04", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L04.mp3",
    prompt: "4. 他家有几口人？ / How many people are in his family?",
    choices: [
      { text: "A. 2个人", img: "img/L04_A.png" },
      { text: "B. 3个人", img: "img/L04_B.png" },
      { text: "C. 4个人", img: "img/L04_C.png" },
      { text: "D. 5个人", img: "img/L04_D.png" }
    ],
    answer: 2
  },
  {
    id: "L05", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L05.mp3",
    prompt: "5. 现在几点？ / What time is it now?",
    choices: [
      { text: "A. 8:00", img: "img/L05_A.png" },
      { text: "B. 8:30", img: "img/L05_B.png" },
      { text: "C. 9:00", img: "img/L05_C.png" },
      { text: "D. 9:30", img: "img/L05_D.png" }
    ],
    answer: 1
  },
  {
    id: "L06", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L06.mp3",
    prompt: "6. 他去哪儿？ / Where is he going?",
    choices: [
      { text: "A. 学校 (xuéxiào)", img: "img/L06_A.png" },
      { text: "B. 商店 (shāngdiàn)", img: "img/L06_B.png" },
      { text: "C. 医院 (yīyuàn)", img: "img/L06_C.png" },
      { text: "D. 家 (jiā)", img: "img/L06_D.png" }
    ],
    answer: 0
  },
  {
    id: "L07", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L07.mp3",
    prompt: "7. 这件衣服多少钱？ / How much is this clothing item?",
    choices: [
      { text: "A. 15块", img: "img/L07_A.png" },
      { text: "B. 30块", img: "img/L07_B.png" },
      { text: "C. 50块", img: "img/L07_C.png" },
      { text: "D. 80块", img: "img/L07_D.png" }
    ],
    answer: 2
  },
  {
    id: "L08", section: "listening", type: "listening_mcq", points: 1, audio: "audio/L08.mp3",
    prompt: "8. 他喜欢什么？ / What does he like?",
    choices: [
      { text: "A. 苹果 (píngguǒ)", img: "img/L08_A.png" },
      { text: "B. 香蕉 (xiāngjiāo)", img: "img/L08_B.png" },
      { text: "C. 西瓜 (xīguā)", img: "img/L08_C.png" },
      { text: "D. 葡萄 (pútáo)", img: "img/L08_D.png" }
    ],
    answer: 0
  },

  // 听力 9-15：文字选项
  { id:"L09", section:"listening", type:"listening_mcq", points:1, audio:"audio/L09.mp3",
    prompt:"9. 明天天气怎么样？ / What will the weather be like tomorrow?",
    choices:["A. 很热","B. 很冷","C. 下雨","D. 下雪"], answer:2
  },
  { id:"L10", section:"listening", type:"listening_mcq", points:1, audio:"audio/L10.mp3",
    prompt:"10. 男生会不会说中文？ / Can the boy speak Chinese?",
    choices:["A. 不会","B. 会一点儿","C. 会很多","D. 不知道"], answer:1
  },
  { id:"L11", section:"listening", type:"listening_mcq", points:1, audio:"audio/L11.mp3",
    prompt:"11. 女生怎么来学校？ / How does the girl come to school?",
    choices:["A. 坐地铁","B. 坐公交车","C. 走路","D. 开车"], answer:0
  },
  { id:"L12", section:"listening", type:"listening_mcq", points:1, audio:"audio/L12.mp3",
    prompt:"12. 他为什么没去游泳？ / Why didn’t he go swimming?",
    choices:["A. 因为下雨了","B. 因为太忙了","C. 因为感冒了","D. 因为忘了"], answer:2
  },
  { id:"L13", section:"listening", type:"listening_mcq", points:1, audio:"audio/L13.mp3",
    prompt:"13. 他们先做什么？ / What do they do first?",
    choices:["A. 先看电影","B. 先去图书馆","C. 先吃饭","D. 先踢足球"], answer:1
  },
  { id:"L14", section:"listening", type:"listening_mcq", points:1, audio:"audio/L14.mp3",
    prompt:"14. 他几点睡觉？ / What time does he go to sleep?",
    choices:["A. 九点","B. 十点","C. 十点半","D. 十一点"], answer:1
  },
  { id:"L15", section:"listening", type:"listening_mcq", points:1, audio:"audio/L15.mp3",
    prompt:"15. 他们上周去了哪里？ / Where did they go last week?",
    choices:["A. 动物园","B. 公园","C. 图书馆","D. 博物馆"], answer:0
  },

  // 第二大题说明页（不计分）
  {
    id: "R00",
    section: "reading",
    type: "info",
    points: 0,
    title: "第二大题：请选择合适的词（16–25）",
    prompt: `下面每题都有一个句子，句子里有一个空格“___”。请选择最合适的词，把它填进空格里。
Each sentence has a blank “___”. Choose the best word to complete the sentence.`,
    html: `
      <div style="border:1px solid rgba(0,0,0,.12);border-radius:12px;padding:12px;background:#fafafa">
        <div style="font-size:13px;color:#666">示例 Example（不计分）</div>
        <div style="margin-top:8px">我 ___ 学生。</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">A. 是</div>
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">B. 在</div>
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">C. 有</div>
          <div style="border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px">D. 去</div>
        </div>
        <div style="margin-top:8px;font-size:13px;color:#666">正确答案：A（我是学生。）</div>
      </div>
    `
  },

  // 16-25（10题）
  { id:"C16", section:"reading", type:"mcq", points:1, prompt:"16. 我 ___ 中国。 / I come to China.", choices:["A. 来","B. 去","C. 看","D. 听"], answer:0 },
  { id:"C17", section:"reading", type:"mcq", points:1, prompt:"17. 我想喝一 ___ 水。 / I want to drink a (cup of) water.", choices:["A. 杯","B. 本","C. 张","D. 条"], answer:0 },
  { id:"C18", section:"reading", type:"mcq", points:1, prompt:"18. 选出最自然的一句 / Choose the most natural sentence:", choices:[
    "A. 我明天跟朋友去看电影。","B. 我跟朋友明天去看电影。","C. 我去看电影明天跟朋友。","D. 我明天去跟朋友看电影。"
  ], answer:0 },
  { id:"C19", section:"reading", type:"mcq", points:1, prompt:"19. ___ 下雨，所以我们不去公园。", choices:["A. 因为","B. 但是","C. 还是","D. 和"], answer:0 },
  { id:"C20", section:"reading", type:"mcq", points:1, prompt:"20. 你要茶 ___ 咖啡？", choices:["A. 和","B. 还是","C. 因为","D. 所以"], answer:1 },
  { id:"C21", section:"reading", type:"mcq", points:1, prompt:"21. 他比我 ___ 。", choices:["A. 高","B. 高的","C. 高了","D. 高着"], answer:0 },
  { id:"C22", section:"reading", type:"mcq", points:1, prompt:"22. 选出正确的一句 / Choose the correct sentence:", choices:["A. 请把门关上。","B. 请把关上门。","C. 请门把关上。","D. 请把门关上了着。"], answer:0 },
  { id:"C23", section:"reading", type:"mcq", points:1, prompt:"23. 小通知：今天下午三点有中文课，请准时到教室。\n中文课几点开始？", choices:["A. 两点","B. 三点","C. 四点","D. 五点"], answer:1 },
  { id:"C24", section:"reading", type:"mcq", points:1, prompt:"24. 他下午做什么？", choices:["A. 做作业","B. 踢足球","C. 看电影","D. 去游泳"], answer:1 },
  { id:"C25", section:"reading", type:"mcq", points:1, prompt:"25. 我很喜欢 ___ 中文。", choices:["A. 学习","B. 学习着","C. 学了","D. 学过"], answer:0 },
];