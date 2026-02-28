// ==============================
// Exam Engine (2 sections + persist answers + result page)
// - sections: listening + reading
// - supports: mcq / listening_mcq / listening_tf / short_text / info
// - supports choices: "text" OR { text: "...", img: "img/xxx.png" }
// - Listening UI flow: Question -> Audio -> Options(2x2) -> Next
// - Instructions/Example: moved to collapsible details using q.helpHtml (collapsed by default)
// - Audio: reset (pause + currentTime=0 + load) whenever a new question is rendered
// ==============================

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

// ✅ 只保留两个分段：listening + reading
function groupBySection(questions) {
  const sections = ["listening", "reading"];
  const map = { listening: [], reading: [] };
  (questions || []).forEach(q => {
    const sec = q.section || "reading";
    if (map[sec]) map[sec].push(q);
  });
  return { sections, map };
}

// ==============================
// render helpers
// ==============================

function escapeHtml(s){
  return (s ?? "").toString().replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

// ✅ 听力/选择题 UI：题干 → 音频 → 选项（2x2）→ Next
function renderMCQ(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "qCard";

  const stemMain = (q.prompt || "").trim();
  const stemSub  = (q.subtext || "").trim(); // 可选：拼音/英文（如果你以后要加）

  const audioHTML = q.audio
    ? `<audio controls src="${q.audio}"></audio>`
    : "";

  const choices = Array.isArray(q.choices) ? q.choices : [];
  const letters = ["A","B","C","D"];

  wrap.innerHTML = `
    <div class="panel">
      <div class="panelTitle">问题 / Question</div>
      <div class="stemMain">${escapeHtml(stemMain)}</div>
      ${stemSub ? `<div class="stemSub">${escapeHtml(stemSub)}</div>` : ""}
    </div>

    <div class="audioBar" style="margin-top:10px">
      ${audioHTML}
    </div>

    <div class="panel" style="margin-top:12px">
      <div class="panelTitle">选项 / Options</div>
      <div class="optGrid" id="optGrid"></div>
    </div>

    <details class="helpFold" ${q.helpHtml ? "" : "style='display:none'"} >
      <summary>说明与示例 / Instructions & Example</summary>
      <div class="helpInner">${q.helpHtml || ""}</div>
    </details>
  `;

  const grid = wrap.querySelector("#optGrid");

  choices.forEach((c, idx) => {
    const text = (typeof c === "string") ? c : (c && c.text) ? c.text : "";
    const img  = (typeof c === "object" && c && c.img) ? c.img : "";

    const card = document.createElement("button");
    card.type = "button";
    card.className = "optCard" + (String(savedValue) === String(idx) ? " selected" : "");
    card.setAttribute("data-idx", String(idx));

    card.innerHTML = `
      <div class="optLetter">${letters[idx] || ""}</div>
      <div class="optBody">
        <div class="optText">${escapeHtml(text)}</div>
        ${img ? `<img class="optImg" src="${img}" alt="${escapeHtml(text)}" />` : ""}
      </div>
    `;

    card.addEventListener("click", () => {
      grid.querySelectorAll(".optCard").forEach(n => n.classList.remove("selected"));
      card.classList.add("selected");
      onChange(idx);
    });

    grid.appendChild(card);
  });

  return wrap;
}

function renderShortText(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "q";
  wrap.innerHTML = `
    <div class="qTitle">${escapeHtml(q.prompt || "")}</div>
    <textarea placeholder="请输入…"></textarea>
  `;
  const ta = wrap.querySelector("textarea");
  ta.value = savedValue || "";
  ta.addEventListener("input", () => onChange(ta.value));
  return wrap;
}

// ✅ 说明/示例页：type = "info"（版本A方案1：Practice页就是L00，不计分；点下一题进入L01）
function renderInfo(q) {
  const wrap = document.createElement("div");
  wrap.className = "qCard";
  wrap.innerHTML = `
    <div class="panel">
      <div class="panelTitle">${escapeHtml(q.title || "说明 / Instructions")}</div>
      <div class="stemMain" style="font-size:15px;font-weight:850">${escapeHtml(q.prompt || "")}</div>
    </div>

    <details class="helpFold" ${q.helpHtml ? "" : "style='display:none'"} style="margin-top:12px">
      <summary>说明与示例 / Instructions & Example</summary>
      <div class="helpInner">${q.helpHtml || ""}</div>
    </details>
  `;
  return wrap;
}

// ==============================
// scoring
// ==============================

function calcScore(questions, answersMap) {
  let total = 0;
  let possible = 0;

  const breakdown = {
    listening: { score: 0, possible: 0, count: 0 },
    reading: { score: 0, possible: 0, count: 0 }
  };

  (questions || []).forEach(q => {
    const pts = Number(q.points || 0);
    let sec = q.section || "reading";
    if (!breakdown[sec]) sec = "reading";

    possible += pts;
    breakdown[sec].possible += pts;
    breakdown[sec].count += 1;

    const ans = answersMap[q.id];

    // info 不计分：一般不写 answer
    if (q.answer === null || typeof q.answer === "undefined") return;

    let correct = false;
    if (q.type === "mcq" || q.type === "listening_mcq" || q.type === "listening_tf") {
      correct = Number(ans) === Number(q.answer);
    }

    if (correct) {
      total += pts;
      breakdown[sec].score += pts;
    }
  });

  return { total, possible, breakdown };
}

async function submitToGoogleForm(payload) {
  if (!GOOGLE_FORM_ACTION_URL || !FORM_ENTRY.name) return { ok: false, skipped: true };

  const fd = new FormData();
  fd.append(FORM_ENTRY.name, payload.name || "");
  fd.append(FORM_ENTRY.school, payload.school || "");
  fd.append(FORM_ENTRY.score, String(payload.totalScore));
  fd.append(FORM_ENTRY.breakdown, JSON.stringify(payload.breakdown));

  try {
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
  const quizBox = byId("quizBox");
  if (!quizBox) return;

  const name = localStorage.getItem(LS.name) || "";
  const school = localStorage.getItem(LS.school) || "";
  const who = byId("who");
  if (who) who.textContent = `${name || "（未填姓名）"} ｜ ${school || "（未选项目）"}`;

  const backBtn = byId("backBtn");
  if (backBtn) backBtn.addEventListener("click", () => location.href = "./index.html");

  if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS)) {
    quizBox.innerHTML = `<div class="muted">题库未加载（QUESTIONS 不存在）。请检查：questions.js 是否正确加载。</div>`;
    return;
  }

  const { sections, map } = groupBySection(QUESTIONS);

  const defaultState = { sectionIndex: 0, pageIndex: 0 };
  const state = loadJSON(LS.state, defaultState);
  const answers = loadJSON(LS.answers, {});

  const progress = byId("progress");
  const progressText = byId("progressText");
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");
  const tabButtons = Array.from(document.querySelectorAll(".tab"));

  function currentSectionKey() {
    return sections[state.sectionIndex] || "listening";
  }
  function currentQuestions() {
    return map[currentSectionKey()] || [];
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

    if (totalPages === 0) {
      quizBox.innerHTML = `<div class="muted">本分段暂无题目（${secKey}）。请检查 questions.js 里的 section 字段。</div>`;
      if (progress) progress.style.width = "0%";
      if (progressText) progressText.textContent = `0 / 0`;
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    state.pageIndex = Math.max(0, Math.min(state.pageIndex, totalPages - 1));
    saveJSON(LS.state, state);

    const q = qs[state.pageIndex];
    const saved = answers[q.id];

    quizBox.innerHTML = "";

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
      node.innerHTML = `<div class="muted">不支持的题型：${escapeHtml(q.type)}</div>`;
    }

    quizBox.appendChild(node);

    // ✅ 每次进入新题：音频默认暂停，进度归零；允许重复播放
    const a = quizBox.querySelector("audio");
    if (a) {
      try {
        a.pause();
        a.currentTime = 0;
        a.load();
      } catch (e) {}
    }

    const pct = Math.round(((state.pageIndex + 1) / totalPages) * 100);
    if (progress) progress.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${state.pageIndex + 1} / ${totalPages}`;

    if (prevBtn) prevBtn.disabled = (state.sectionIndex === 0 && state.pageIndex === 0);
    if (nextBtn) nextBtn.disabled = false;

    // Submit 按钮：你要求可以一直显示，因此不在这里做隐藏/显示控制
  }

  function goPrev() {
    const qs = currentQuestions();
    if (state.pageIndex > 0) {
      state.pageIndex -= 1;
    } else if (state.sectionIndex > 0) {
      state.sectionIndex -= 1;
      const prevSecQs = map[sections[state.sectionIndex]] || [];
      state.pageIndex = Math.max(0, prevSecQs.length - 1);
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

      await submitToGoogleForm(payload);
      location.href = "./result.html";
    });
  }

  render();
})();