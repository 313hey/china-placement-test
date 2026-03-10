// ==============================
// Exam Engine (2 sections + persist answers + result page)
// - sections: listening + reading
// - supports: mcq / listening_mcq / listening_tf / short_text / info / practice_listening
// - supports choices: "text" OR { text: "...", img: "img/xxx.png" }
// - Listening UI: Question -> Speaker Play -> Options(2x2) -> Next
// - Instructions/Example: collapsible details using q.helpHtml (collapsed by default)
// - Audio: reset (pause + currentTime=0 + load) whenever a new question is rendered
// - Practice listening (L00): must choose to unlock Next; show correct answer feedback
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
  result: "quiz_result",
  practiceDone: "quiz_practice_done"
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

function escapeHtml(s){
  return (s ?? "").toString().replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

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

// 通用：2x2 选项卡渲染（支持图片）
// - text 为空则不渲染文字行（更干净）
function renderOptionsGrid({ q, savedValue, onPick }) {
  const letters = ["A","B","C","D"];
  const choices = Array.isArray(q.choices) ? q.choices : [];

  const grid = document.createElement("div");
  grid.className = "optGrid";

  choices.forEach((c, idx) => {
    const text = (typeof c === "string") ? c : (c && c.text) ? c.text : "";
    const img  = (typeof c === "object" && c && c.img) ? c.img : "";

    const card = document.createElement("button");
    card.type = "button";
    card.className = "optCard" + (String(savedValue) === String(idx) ? " selected" : "");

    card.innerHTML = `
      <div class="optLetter">${letters[idx] || ""}</div>
      <div class="optBody">
        ${text ? `<div class="optText">${escapeHtml(text)}</div>` : ""}
        ${img ? `<img class="optImg" src="${img}" alt="${escapeHtml(text)}" />` : ""}
      </div>
    `;

    card.addEventListener("click", () => {
      grid.querySelectorAll(".optCard").forEach(n => n.classList.remove("selected"));
      card.classList.add("selected");
      onPick(idx);
    });

    grid.appendChild(card);
  });

  return grid;
}

// ✅ 统一喇叭播放按钮（用于所有听力题）
// 返回 { barEl, audioEl }
function makeSpeakerBar(q) {
  const bar = document.createElement("div");
  bar.className = "audioBar";

  if (!q.audio) {
    bar.innerHTML = `<div class="muted">（本题无音频 / No audio for this item）</div>`;
    return { barEl: bar, audioEl: null };
  }

  const audioId = `aud_${q.id}_${Math.random().toString(16).slice(2)}`;

  bar.innerHTML = `
    <button type="button" class="btn btnPrimary" id="spk_${audioId}">🔊 播放 / Play</button>
    <span class="muted" style="margin-left:10px">可重复播放 / Replay allowed</span>
    <audio id="${audioId}" preload="auto" src="${q.audio}"></audio>
  `;

  const btn = bar.querySelector(`#spk_${audioId}`);
  const audio = bar.querySelector(`#${audioId}`);

  btn.addEventListener("click", async () => {
    try {
      audio.pause();
      audio.currentTime = 0;
      await audio.play();
    } catch (e) {
      // 如需提示可加 toast；这里静默即可
    }
  });

  return { barEl: bar, audioEl: audio };
}

// ✅ 听力/选择题（含 listening_mcq / mcq / listening_tf）：
// 信息流：题干 -> 喇叭按钮 -> 选项 -> next
function renderMCQ(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "qCard";

  const stemMain = (q.prompt || "").trim();
  const stemSub  = (q.subtext || "").trim(); // 可选：拼音/英文

  wrap.innerHTML = `
    <div class="panel">
      <div class="panelTitle">问题 / Question</div>
      <div class="stemMain">${escapeHtml(stemMain)}</div>
      ${stemSub ? `<div class="stemSub">${escapeHtml(stemSub)}</div>` : ""}
    </div>

    <div id="audioMount"></div>

    <div class="panel" style="margin-top:12px">
      <div class="panelTitle">选项 / Options</div>
      <div id="gridMount"></div>
    </div>

    <details class="helpFold" ${q.helpHtml ? "" : "style='display:none'"} >
      <summary>说明与示例 / Instructions & Example</summary>
      <div class="helpInner">${q.helpHtml || ""}</div>
    </details>
  `;

  // speaker bar
  const audioMount = wrap.querySelector("#audioMount");
  const { barEl } = makeSpeakerBar(q);
  audioMount.appendChild(barEl);

  // options
  const gridMount = wrap.querySelector("#gridMount");
  gridMount.appendChild(renderOptionsGrid({
    q,
    savedValue,
    onPick: (idx) => onChange(idx)
  }));

  return wrap;
}

// ✅ 试听题：喇叭播放→必须选择→立即显示正确答案→做完才能 Next
function renderPracticeListening(q, savedValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "qCard";

  const stemMain = (q.prompt || "").trim();
  const letters = ["A","B","C","D"];

  wrap.innerHTML = `
    <div class="panel">
      <div class="panelTitle">${escapeHtml(q.title || "试听题 / Practice (Not scored)")}</div>
      <div class="stemMain">${escapeHtml(stemMain)}</div>
      <div class="stemSub">点击喇叭听录音，再选择 / Click the speaker to listen, then choose</div>
    </div>

    <div id="audioMount"></div>

    <div class="panel" style="margin-top:12px">
      <div class="panelTitle">选项 / Options</div>
      <div id="gridMount"></div>
    </div>

    <div id="feedback" class="muted" style="margin-top:12px"></div>

    <details class="helpFold" ${q.helpHtml ? "" : "style='display:none'"} >
      <summary>说明与示例 / Instructions & Example</summary>
      <div class="helpInner">${q.helpHtml || ""}</div>
    </details>
  `;

  // speaker bar（同一套）
  const audioMount = wrap.querySelector("#audioMount");
  const { barEl } = makeSpeakerBar(q);
  audioMount.appendChild(barEl);

  const fb = wrap.querySelector("#feedback");
  const gridMount = wrap.querySelector("#gridMount");

  function showFeedback(idx){
    if (typeof q.answer !== "number") return;
    const correct = idx === q.answer;
    const correctLetter = letters[q.answer] || "B";
    fb.innerHTML = correct
      ? `<b style="color:#16a34a">✅ 正确 / Correct</b>`
      : `<b style="color:#dc2626">❌ 不正确 / Incorrect</b>　正确答案：<b>${correctLetter}</b> / Correct: <b>${correctLetter}</b>`;
  }

  // options with feedback
  gridMount.appendChild(renderOptionsGrid({
    q,
    savedValue,
    onPick: (idx) => {
      onChange(idx);
      showFeedback(idx);
    }
  }));

  // if already answered, show feedback
  if (savedValue !== null && savedValue !== undefined && savedValue !== "") {
    showFeedback(Number(savedValue));
  }

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

// info 页面（纯说明）
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

    // 不计分题一般不写 answer
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
  if (who) who.textContent = `${name || "（未填姓名）"} ｜ ${school || "（未填学校）"}`;

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

    if (q.type === "practice_listening") {
      node = renderPracticeListening(q, saved, (val) => {
        answers[q.id] = val;
        saveJSON(LS.answers, answers);
        // ✅ 做出选择就算完成试听
        localStorage.setItem(LS.practiceDone, "1");
        if (nextBtn) nextBtn.disabled = false;
      });
    } else if (q.type === "info") {
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

    // ✅ 切题重置音频（当前题的隐藏 audio 也会被归零）
    const a = quizBox.querySelector("audio");
    if (a) {
      try {
        a.pause();
        a.currentTime = 0;
        a.load();
      } catch (e) {}
    }

    // ✅ 试听题必须完成后才能 Next
    if (q && q.type === "practice_listening") {
      const done = localStorage.getItem(LS.practiceDone) === "1";
      if (nextBtn) nextBtn.disabled = !done;
    } else {
      if (nextBtn) nextBtn.disabled = false;
    }

    const pct = Math.round(((state.pageIndex + 1) / totalPages) * 100);
    if (progress) progress.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${state.pageIndex + 1} / ${totalPages}`;

    if (prevBtn) prevBtn.disabled = (state.sectionIndex === 0 && state.pageIndex === 0);
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