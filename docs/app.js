// ==============================
// Exam Engine (3 sections + persist answers + result page)
// ==============================

/**
 * 你需要在这里填 Google Form 的两个东西：
 * 1) GOOGLE_FORM_ACTION_URL: 形如：
 *    https://docs.google.com/forms/d/e/【你的FormID】/formResponse
 * 2) FORM_ENTRY: 你表单里每个题对应的 entry.xxxxx
 *    例如：{ name: "entry.123", school: "entry.456", score: "entry.789", breakdown: "entry.101112" }
 *
 * 下面先留空，不影响考试流程，只影响“提交到表单”。
 */
const GOOGLE_FORM_ACTION_URL = ""; // TODO: 填你的 formResponse
const FORM_ENTRY = {
  name: "",      // TODO: entry.xxxxx
  school: "",    // TODO: entry.xxxxx
  score: "",     // TODO: entry.xxxxx
  breakdown: ""  // TODO: entry.xxxxx
};

// localStorage keys
const LS = {
  name: "quiz_name",
  school: "quiz_school",
  answers: "quiz_answers",
  state: "quiz_state",
  result: "quiz_result"
};

function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function byId(id) { return document.getElementById(id); }

function normalizeText(s) {
  return String(s || "").replace(/\s+/g, "").replace(/[，。！？,.!?]/g, "");
}

function groupBySection(questions) {
  const sections = ["listening", "reading"];
  const map = { listening: [], reading: [] };
  (questions || []).forEach(q => {
    let sec = q.section || "reading";
    if (!breakdown[sec]) sec = "reading";
    if (map[sec]) map[sec].push(q);
  });
  return { sections, map };
}

// render helpers
function renderMCQ(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "q";
  wrap.innerHTML = `
    <div class="qTitle">${q.prompt}</div>
    ${q.audio ? `<audio controls src="${q.audio}"></audio>` : ""}
    <div class="choices"></div>
  `;

  const choicesDiv = wrap.querySelector(".choices");
  q.choices.forEach((c, idx) => {
   // ✅ 支持 choices 为：字符串 或 {text,img} 的版本
function renderMCQ(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "q";

  const prompt = document.createElement("div");
  prompt.className = "qPrompt";
  prompt.textContent = q.prompt || "";
  wrap.appendChild(prompt);

  const choicesDiv = document.createElement("div");
  choicesDiv.className = "choices";
  wrap.appendChild(choicesDiv);

  (q.choices || []).forEach((c, idx) => {
    const id = `${q.id}_${idx}`;
    const label = document.createElement("label");
    label.className = "choice";

    // ✅ 两种写法都兼容
    // 1) "A. xxx"
    // 2) { text: "A. xxx", img: "img/L01_A.png" }
    const text = (typeof c === "string") ? c : (c && c.text) ? c.text : "";
    const img  = (typeof c === "object" && c && c.img) ? c.img : "";

    label.innerHTML = `
      <input type="radio" name="${q.id}" id="${id}" value="${idx}"
        ${String(savedValue) === String(idx) ? "checked" : ""} />
      <span>${text}</span>
      ${
        img
          ? `<div style="margin-top:6px">
               <img src="${img}" alt="${text}"
                 style="max-width:260px;max-height:160px;border-radius:10px;border:1px solid rgba(0,0,0,.12)" />
             </div>`
          : ""
      }
    `;

    label.querySelector("input").addEventListener("change", (e) => {
      onChange(Number(e.target.value));
    });

    choicesDiv.appendChild(label);
  });

  return wrap;
}
}

function renderShortText(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "q";
  wrap.innerHTML = `
    <div class="qTitle">${q.prompt}</div>
    <textarea placeholder="请输入…"></textarea>
  `;
  const ta = wrap.querySelector("textarea");
  ta.value = savedValue || "";
  ta.addEventListener("input", () => onChange(ta.value));
  return wrap;
}


function renderInfo(q) {
  const wrap = document.createElement("div");
  wrap.className = "q";
  // 允许 prompt 用少量 HTML（示例/图片）
  wrap.innerHTML = `
    <div class="qTitle">${q.title || "说明 / Instructions"}</div>
    <div class="muted" style="margin-top:8px;white-space:pre-wrap">${q.prompt || ""}</div>
    ${q.html ? `<div style="margin-top:12px">${q.html}</div>` : ""}
    <div class="muted" style="margin-top:12px">点击“下一页”开始。</div>
  `;
  return wrap;
}


function calcScore(questions, answersMap) {
  let total = 0;
  let possible = 0;
  const breakdown = {
    listening: { score: 0, possible: 0, count: 0 },
    reading: { score: 0, possible: 0, count: 0 },
    writing: { score: 0, possible: 0, count: 0 }
  };

  (questions || []).forEach(q => {
    const pts = Number(q.points || 0);
    let sec = q.section || "reading";
    if (!breakdown[sec]) sec = "reading";
    possible += pts;
    breakdown[sec].possible += pts;
    breakdown[sec].count += 1;

    const ans = answersMap[q.id];

    // 如果你还没填答案（answer: null / undefined），那这题不计分（但仍计 possible）
    if (q.answer === null || typeof q.answer === "undefined") return;

    let correct = false;

    if (q.type === "info") {
      node = renderInfo(q);
    } else if (q.type === "mcq" || q.type === "listening_mcq" || q.type === "listening_tf") {
      correct = Number(ans) === Number(q.answer);
    } else if (q.type === "short_text") {
      // 写作主观题：默认不自动判分（你也可以后续改成关键词匹配）
      correct = false;
    }

    if (correct) {
      total += pts;
      breakdown[sec].score += pts;
    }
  });

  return { total, possible, breakdown };
}

async function submitToGoogleForm(payload) {
  // 没配置就直接跳过
  if (!GOOGLE_FORM_ACTION_URL || !FORM_ENTRY.name) return { ok: false, skipped: true };

  const fd = new FormData();
  fd.append(FORM_ENTRY.name, payload.name || "");
  fd.append(FORM_ENTRY.school, payload.school || "");
  fd.append(FORM_ENTRY.score, String(payload.totalScore));
  fd.append(FORM_ENTRY.breakdown, JSON.stringify(payload.breakdown));

  try {
    // no-cors：不会报跨域，但也拿不到返回。以“不抛错”为成功信号
    await fetch(GOOGLE_FORM_ACTION_URL, { method: "POST", mode: "no-cors", body: fd });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ==============================
// Boot exam page
// ==============================
(function bootExam() {
  // 只在 exam.html 上跑（有 quizBox 才跑）
  const quizBox = byId("quizBox");
  if (!quizBox) return;

  // 基本信息
  const name = localStorage.getItem(LS.name) || "";
  const school = localStorage.getItem(LS.school) || "";
  const who = byId("who");
  if (who) who.textContent = `${name || "（未填姓名）"} ｜ ${school || "（未选项目）"}`;

  // back
  const backBtn = byId("backBtn");
  if (backBtn) backBtn.addEventListener("click", () => location.href = "./index.html");

  // question bank
  if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS)) {
    quizBox.innerHTML = `<div class="muted">题库未加载（QUESTIONS 不存在）。请检查：docs/questions.js 是否为“文件”而不是“文件夹”。</div>`;
    return;
  }

  const { sections, map } = groupBySection(QUESTIONS);

  // state
  const defaultState = { sectionIndex: 0, pageIndex: 0 };
  const state = loadJSON(LS.state, defaultState);
  const answers = loadJSON(LS.answers, {});

  // dom
  const progress = byId("progress");
  const progressText = byId("progressText");
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");
  const submitTip = byId("submitTip");
  const tabButtons = Array.from(document.querySelectorAll(".tab"));

  function currentSectionKey() {
    return sections[state.sectionIndex] || "listening";
  }
  function currentQuestions() {
    return map[currentSectionKey()] || [];
  }
  function totalPagesInSection() {
    return currentQuestions().length;
  }

  function setTabActive() {
    tabButtons.forEach(btn => {
      const sec = btn.getAttribute("data-section");
      btn.classList.toggle("active", sec === currentSectionKey());
    });
  }

  function render() {
    const secKey = currentSectionKey();
    const qs = currentQuestions();
    const totalPages = qs.length;

    setTabActive();

    // edge
    if (totalPages === 0) {
      quizBox.innerHTML = `<div class="muted">本分段暂无题目（${secKey}）。请检查 questions.js 里的 section 字段。</div>`;
      if (progress) progress.style.width = "0%";
      if (progressText) progressText.textContent = `0 / 0`;
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    // clamp
    state.pageIndex = Math.max(0, Math.min(state.pageIndex, totalPages - 1));
    saveJSON(LS.state, state);

    const q = qs[state.pageIndex];
    const saved = answers[q.id];

    quizBox.innerHTML = ""; // clear

    let node;
    if (q.type === "info") {
      node = renderInfo(q);
    } else if (q.type === "mcq" || q.type === "listening_mcq" || q.type === "listening_tf") {
      node = renderMCQ(q, saved, (val) => {
        answers[q.id] = val;
        saveJSON(LS.answers, answers);
      });
    } else if (q.type === "short_text") {
      node = renderShortText(q, saved, (val) => {
        answers[q.id] = val;
        saveJSON(LS.answers, answers);
      });
    } else {
      node = document.createElement("div");
      node.className = "q";
      node.innerHTML = `<div class="muted">不支持的题型：${q.type}</div>`;
    }

    quizBox.appendChild(node);

    // progress within section
    const pct = ((state.pageIndex + 1) / totalPages) * 100;
    if (progress) progress.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${state.pageIndex + 1} / ${totalPages}`;

    // nav
    if (prevBtn) prevBtn.disabled = (state.sectionIndex === 0 && state.pageIndex === 0);
    if (nextBtn) nextBtn.disabled = (state.sectionIndex === sections.length - 1 && state.pageIndex === totalPages - 1);

    // submit hint
    if (submitTip) {
      submitTip.textContent = `当前分段：${secKey}（第 ${state.pageIndex + 1} / ${totalPages} 题）`;
    }
  }

  function goPrev() {
    const qs = currentQuestions();
    if (state.pageIndex > 0) {
      state.pageIndex -= 1;
    } else if (state.sectionIndex > 0) {
      state.sectionIndex -= 1;
      state.pageIndex = (map[currentSectionKey()] || []).length - 1;
    }
    saveJSON(LS.state, state);
    render();
  }

  function goNext() {
    const qs = currentQuestions();
    if (state.pageIndex < qs.length - 1) {
      state.pageIndex += 1;
    } else if (state.sectionIndex < sections.length - 1) {
      state.sectionIndex += 1;
      state.pageIndex = 0;
    }
    saveJSON(LS.state, state);
    render();
  }

  // tab click (允许随时跳分段)
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const sec = btn.getAttribute("data-section");
      const idx = sections.indexOf(sec);
      if (idx >= 0) {
        state.sectionIndex = idx;
        state.pageIndex = 0;
        saveJSON(LS.state, state);
        render();
      }
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      // score
      const { total, possible, breakdown } = calcScore(QUESTIONS, answers);

      const payload = {
        ts: Date.now(),
        name,
        school,
        totalScore: total,
        totalPossible: possible,
        breakdown
      };
      saveJSON(LS.result, payload);

      // submit to google form (best-effort)
      const r = await submitToGoogleForm(payload);
      // 不阻塞跳转
      location.href = "./result.html";
    });
  }

  render();
})();
