// =========================
// 0) Google Form 配置（先留空也能跑：只是不提交）
// 你给我的链接是 viewform 普通链接，不是“预填链接”，所以没有 entry.xxxxx
// 你需要去 Form 里：⋮ → 获取预填链接 → 复制带 entry. 的那条，再发我
// =========================
const GOOGLE_FORM_ACTION_URL = ""; // 例如：https://docs.google.com/forms/d/e/XXX/formResponse
const FORM_ENTRY = {
  name: "",     // 例如：entry.111111
  school: "",   // 例如：entry.222222
  score: "",    // 例如：entry.333333
  detail: "",   // 例如：entry.444444（可选）
};

// -------------------------
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function loadAnswers(){
  try { return JSON.parse(localStorage.getItem("quiz_answers") || "{}"); }
  catch(e){ return {}; }
}
function saveAnswers(obj){
  localStorage.setItem("quiz_answers", JSON.stringify(obj || {}));
}
function getSection(){
  return localStorage.getItem("quiz_section") || "listening";
}
function setSection(sec){
  localStorage.setItem("quiz_section", sec);
}
function getUser(){
  return {
    name: localStorage.getItem("quiz_name") || "",
    school: localStorage.getItem("quiz_school") || "",
  };
}

// 题库按 section 分组
function questionsBySection(section){
  return (window.QUESTIONS || []).filter(q => q.section === section);
}
const SECTION_ORDER = ["listening","reading","writing"];
const SECTION_LABEL = { listening:"听力", reading:"阅读", writing:"书写" };

function renderTabs(){
  const sec = getSection();
  $all(".tab").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.sec === sec);
  });
}

function renderHeader(){
  const {name, school} = getUser();
  const who = $("#who");
  if(who) who.textContent = `${name || "—"}  ·  ${school || "—"}`;
}

function renderProgress(){
  const sec = getSection();
  const answered = loadAnswers();
  const allQ = (window.QUESTIONS || []);
  const doneCount = Object.keys(answered).length;
  const totalCount = allQ.length;

  const bar = $("#bar");
  const txt = $("#progressText");
  const pct = totalCount ? Math.round((doneCount/totalCount)*100) : 0;
  if(bar) bar.style.width = pct + "%";
  if(txt) txt.textContent = `${SECTION_LABEL[sec]}（已作答 ${doneCount} / ${totalCount}）`;
}

function qView(q, answers){
  const wrap = document.createElement("div");
  wrap.className = "q";

  const title = document.createElement("div");
  title.className = "qtitle";
  title.textContent = q.prompt || "";
  wrap.appendChild(title);

  if(q.audio){
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = q.audio; // 例如 audio/L1_Q01.mp3（相对 exam.html）
    wrap.appendChild(audio);
  }

  // 选择题
  if(q.type === "mcq" || q.type === "tf" || q.type === "listening_mcq" || q.type === "listening_tf"){
    const box = document.createElement("div");
    box.className = "choices";

    (q.choices || []).forEach((c, idx)=>{
      const id = `${q.id}_${idx}`;
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.id;
      input.value = String(idx);
      input.id = id;
      input.checked = (answers[q.id] === idx);

      input.addEventListener("change", ()=>{
        const next = loadAnswers();
        next[q.id] = idx;
        saveAnswers(next);
        renderProgress();
      });

      const span = document.createElement("span");
      span.textContent = " " + c;

      label.appendChild(input);
      label.appendChild(span);
      box.appendChild(label);
    });

    wrap.appendChild(box);
    return wrap;
  }

  // 书写题（自由输入，不计分也行；你后面可改为人工评分）
  if(q.type === "writing"){
    const ta = document.createElement("textarea");
    ta.placeholder = q.placeholder || "请作答…";
    ta.value = (typeof answers[q.id] === "string") ? answers[q.id] : "";
    ta.addEventListener("input", ()=>{
      const next = loadAnswers();
      next[q.id] = ta.value;
      saveAnswers(next);
      renderProgress();
    });
    wrap.appendChild(ta);
    return wrap;
  }

  return wrap;
}

function renderQuestions(){
  const sec = getSection();
  const box = $("#quizBox");
  if(!box) return;

  box.innerHTML = "";
  const answers = loadAnswers();
  const qs = questionsBySection(sec);

  if(!qs.length){
    const p = document.createElement("div");
    p.className = "muted";
    p.textContent = `该分区暂无题目：请检查 questions.js 里是否给每道题写了 section: "${sec}"`;
    box.appendChild(p);
    return;
  }

  qs.forEach(q=>{
    box.appendChild(qView(q, answers));
  });

  // 按分区控制上一页/下一页
  const idx = SECTION_ORDER.indexOf(sec);
  $("#prevBtn").disabled = (idx <= 0);
  $("#nextBtn").disabled = (idx >= SECTION_ORDER.length - 1);

  // 提交按钮：只有最后一页才可用（你也可以随时放开）
  $("#submitBtn").disabled = (idx !== SECTION_ORDER.length - 1);
}

function scoreExam(){
  const answers = loadAnswers();
  const qs = (window.QUESTIONS || []);
  let score = 0;
  let total = 0;

  const bySec = { listening:{score:0,total:0}, reading:{score:0,total:0}, writing:{score:0,total:0} };

  qs.forEach(q=>{
    const pts = Number(q.points || 0);
    total += pts;
    bySec[q.section].total += pts;

    // 书写题默认不自动判分（points 也可以设 0）
    if(q.type === "writing") return;

    if(typeof q.answer === "number"){
      const a = answers[q.id];
      if(a === q.answer) {
        score += pts;
        bySec[q.section].score += pts;
      }
    }
  });

  return { score, total, bySec };
}

function submitToGoogleForm(payload){
  // 没配就跳过
  if(!GOOGLE_FORM_ACTION_URL || !FORM_ENTRY.name || !FORM_ENTRY.school || !FORM_ENTRY.score){
    return Promise.resolve({ skipped:true });
  }
  const fd = new FormData();
  fd.append(FORM_ENTRY.name, payload.name || "");
  fd.append(FORM_ENTRY.school, payload.school || "");
  fd.append(FORM_ENTRY.score, String(payload.score || ""));
  if(FORM_ENTRY.detail) fd.append(FORM_ENTRY.detail, payload.detail || "");

  // no-cors：成功/失败浏览器不回传细节，但大多数场景可用
  return fetch(GOOGLE_FORM_ACTION_URL, { method:"POST", mode:"no-cors", body: fd })
    .then(()=>({ ok:true }))
    .catch(()=>({ ok:false }));
}

function goSection(next){
  setSection(next);
  renderTabs();
  renderProgress();
  renderQuestions();
  window.scrollTo(0,0);
}

function bindEvents(){
  // tabs
  $all(".tab").forEach(btn=>{
    btn.addEventListener("click", ()=>goSection(btn.dataset.sec));
  });

  $("#prevBtn")?.addEventListener("click", ()=>{
    const sec = getSection();
    const idx = SECTION_ORDER.indexOf(sec);
    if(idx>0) goSection(SECTION_ORDER[idx-1]);
  });
  $("#nextBtn")?.addEventListener("click", ()=>{
    const sec = getSection();
    const idx = SECTION_ORDER.indexOf(sec);
    if(idx<SECTION_ORDER.length-1) goSection(SECTION_ORDER[idx+1]);
  });

  $("#backInfoBtn")?.addEventListener("click", ()=>{
    location.href = "./index.html";
  });

  $("#submitBtn")?.addEventListener("click", ()=>{
    const {score,total,bySec} = scoreExam();
    const user = getUser();
    const result = {
      ...user,
      score, total,
      bySec,
      answers: loadAnswers(),
      ts: new Date().toISOString()
    };
    localStorage.setItem("quiz_result", JSON.stringify(result));
    location.href = "./result.html";
  });

  // result.html buttons
  $("#retryBtn")?.addEventListener("click", ()=>{
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_result");
    localStorage.setItem("quiz_section","listening");
    location.href = "./index.html";
  });
  $("#backExamBtn")?.addEventListener("click", ()=>{
    location.href = "./exam.html";
  });
}

function renderResultPageIfAny(){
  const totalEl = $("#total");
  if(!totalEl) return; // 不在 result 页

  const raw = localStorage.getItem("quiz_result");
  if(!raw){
    totalEl.textContent = "未找到成绩记录。请返回重新考试。";
    return;
  }
  const r = JSON.parse(raw);
  $("#name").textContent = r.name || "—";
  $("#school").textContent = r.school || "—";
  totalEl.textContent = `总分：${r.score} / ${r.total}`;

  const b = r.bySec || {};
  $("#breakdown").textContent =
    `听力：${b.listening?.score||0}/${b.listening?.total||0} · ` +
    `阅读：${b.reading?.score||0}/${b.reading?.total||0} · ` +
    `书写：${b.writing?.score||0}/${b.writing?.total||0}`;

  const submitStatus = $("#submitStatus");
  submitStatus.textContent = "正在提交到老师记录表…";

  const detail = JSON.stringify({
    bySec: r.bySec,
    // 如果你想把答案也传上去，取消下一行注释（会比较长）
    // answers: r.answers
  });

  submitToGoogleForm({
    name: r.name,
    school: r.school,
    score: r.score,
    detail
  }).then(res=>{
    if(res.skipped){
      submitStatus.textContent = "（未配置 Google Form，已跳过提交）";
    }else{
      submitStatus.textContent = "已提交（如需核对请看 Google Form Responses）";
    }
  }).catch(()=>{
    submitStatus.textContent = "提交失败（请检查 Form 设置是否允许匿名提交）";
  });
}

function bootExamPageIfAny(){
  const quizBox = $("#quizBox");
  if(!quizBox) return; // 不在 exam 页

  renderHeader();
  renderTabs();
  renderProgress();
  renderQuestions();
}

window.addEventListener("DOMContentLoaded", ()=>{
  bindEvents();
  bootExamPageIfAny();
  renderResultPageIfAny();
});
