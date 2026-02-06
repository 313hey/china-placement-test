function $(sel) { return document.querySelector(sel); }
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  children.forEach(c => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return node;
}

const state = {
  started: false,
  answers: {}, // id -> chosenIndex
};

function groupTitle(q) {
  if (q.type.startsWith("listening")) return "听力 Listening";
  return "选择题 MCQ";
}

function render() {
  const quizBox = $("#quizBox");
  const startBtn = $("#startBtn");
  const submitBtn = $("#submitBtn");
  const progress = $("#progress");
  const progressText = $("#progressText");

  const name = $("#name").value.trim();
  const school = $("#school").value.trim();

  // start button enable logic
  startBtn.disabled = !(name && school);

  // If not started: show intro
  if (!state.started) {
    quizBox.innerHTML = "";
    quizBox.appendChild(el("div", { class: "hint" }, [
      "请先填写姓名和学校/项目，然后点击「开始考试」。",
      el("br"),
      "说明：包含听力（音频）+ 选择题。完成后自动出分，并提交到老师记录表。"
    ]));
    submitBtn.disabled = true;
    progress.style.width = "0%";
    progressText.textContent = "0 / 0";
    return;
  }

  // started: render questions
  const qs = (typeof QUESTIONS !== "undefined" && Array.isArray(QUESTIONS)) ? QUESTIONS : null;
  quizBox.innerHTML = "";

  if (!qs || qs.length === 0) {
    quizBox.appendChild(el("div", { class: "error" }, [
      "题目没有加载成功（QUESTIONS 为空）。",
      el("br"),
      "请检查：questions.js 是否能打开、是否有 const QUESTIONS = [...]。"
    ]));
    submitBtn.disabled = true;
    return;
  }

  // grouping
  const groups = {};
  qs.forEach(q => {
    const g = groupTitle(q);
    (groups[g] ||= []).push(q);
  });

  let total = qs.length;
  let done = Object.keys(state.answers).length;
  progress.style.width = `${Math.round((done / total) * 100)}%`;
  progressText.textContent = `${done} / ${total}`;

  Object.entries(groups).forEach(([gname, items]) => {
    quizBox.appendChild(el("h3", { class: "sectionTitle" }, [gname]));
    items.forEach((q, idx) => {
      quizBox.appendChild(renderQuestion(q, idx));
    });
  });

  // submit enable only if all answered
  submitBtn.disabled = done !== total;
}

function renderQuestion(q, idx) {
  const wrap = el("div", { class: "qCard" });

  wrap.appendChild(el("div", { class: "qMeta" }, [
    `Q${idx + 1} · ${q.points || 1} pts`
  ]));

  wrap.appendChild(el("div", { class: "qPrompt" }, [q.prompt || ""]));

  if (q.audio) {
    wrap.appendChild(el("audio", {
      controls: "true",
      preload: "none",
      src: q.audio
    }));
  }

  const choices = Array.isArray(q.choices) ? q.choices : [];
  const chosen = state.answers[q.id];

  const list = el("div", { class: "choices" });
  choices.forEach((text, i) => {
    const id = `${q.id}_${i}`;
    const item = el("label", { class: "choiceItem", for: id }, [
      el("input", {
        type: "radio",
        name: q.id,
        id,
        value: String(i),
        ...(chosen === i ? { checked: "true" } : {})
      }),
      el("span", {}, [text])
    ]);

    item.querySelector("input").addEventListener("change", () => {
      state.answers[q.id] = i;
      render();
    });

    list.appendChild(item);
  });

  wrap.appendChild(list);
  return wrap;
}

function startExam() {
  state.started = true;
  render();
}

function scoreExam() {
  const qs = QUESTIONS || [];
  let score = 0;
  let total = 0;

  qs.forEach(q => {
    const pts = q.points || 1;
    total += pts;
    if (state.answers[q.id] === q.answer) score += pts;
  });

  return { score, total };
}

function submitExam() {
  const name = $("#name").value.trim();
  const school = $("#school").value.trim();

  const { score, total } = scoreExam();
  alert(`完成！你的分数：${score} / ${total}\n（下一步我们再接入自动收集结果）`);

  // TODO: later we will post to Google Form / Apps Script
}

window.addEventListener("DOMContentLoaded", () => {
  $("#startBtn").addEventListener("click", startExam);
  $("#submitBtn").addEventListener("click", submitExam);
  $("#name").addEventListener("input", render);
  $("#school").addEventListener("input", render);
  render();
});
