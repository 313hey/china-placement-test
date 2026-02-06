(function () {
  // =========================
  // 配置：Google Form（可选）
  // 1) 打开你的 Google Form
  // 2) 右上角 ⋮ -> 获取预填链接 -> 填一次 -> 生成链接
  // 3) 从链接里找 entry.xxxxx 的 id
  // 4) action URL 一般长这样：
  //    https://docs.google.com/forms/d/e/XXXXXXX/formResponse
  // =========================
  const GOOGLE_FORM_ACTION_URL = ""; // <- 先留空：不提交。要提交就填上 formResponse URL
  const FORM_ENTRY = {
    name: "",   // e.g. "entry.123456"
    school: "", // e.g. "entry.234567"
    score: "",  // e.g. "entry.345678"
    detail: "", // e.g. "entry.456789" (可放分区得分/答案概览)
  };

  // 页面识别
  const isExam = !!document.getElementById("quizBox");
  const isResult = !!document.getElementById("breakdown");

  // 基础数据
  const name = localStorage.getItem("quiz_name") || "";
  const school = localStorage.getItem("quiz_school") || "";

  // 如果没填信息，exam/result 都回首页
  if ((isExam || isResult) && (!name || !school)) {
    window.location.href = "index.html";
    return;
  }

  // 工具：answers 存取
  function loadAnswers() {
    try { return JSON.parse(localStorage.getItem("quiz_answers") || "{}"); }
    catch { return {}; }
  }
  function saveAnswers(obj) {
    localStorage.setItem("quiz_answers", JSON.stringify(obj));
  }
  function setAnswer(qid, val) {
    const a = loadAnswers();
    a[qid] = val;
    saveAnswers(a);
  }

  function normalizeText(s) {
    return String(s || "")
      .replace(/\s+/g, "")
      .replace(/[，。！？,.!?；;：“”"（）()【】\[\]、]/g, "")
      .trim();
  }

  function groupQuestions() {
    const all = (typeof QUESTIONS !== "undefined" && Array.isArray(QUESTIONS)) ? QUESTIONS : [];
    const by = { listening: [], reading: [], writing: [] };
    for (const q of all) {
      if (q.section && by[q.section]) by[q.section].push(q);
    }
    return by;
  }

  function isAnswered(q, ans) {
    if (ans == null) return false;
    if (q.type === "reorder") return normalizeText(ans).length > 0;
    return true;
  }

  function scoreOne(q, ans) {
    // 自动评分：mcq/listening_mcq/listening_tf/reorder
    // 说明：audio_text 不显示，也不参与评分
    if (!isAnswered(q, ans)) return { got: 0, max: q.points || 0, ok: false };

    if (q.type === "reorder") {
      const ok = normalizeText(ans) === normalizeText(q.reference || "");
      return { got: ok ? (q.points || 0) : 0, max: q.points || 0, ok };
    }

    // 选择题：answer 可能是 number 或 [number...]
    const correct = q.answer;
    let ok = false;
    if (Array.isArray(correct)) ok = correct.includes(Number(ans));
    else ok = Number(ans) === Number(correct);

    return { got: ok ? (q.points || 0) : 0, max: q.points || 0, ok };
  }

  function calcScore() {
    const by = groupQuestions();
    const answers = loadAnswers();

    const sections = ["listening", "reading", "writing"];
    const breakdown = {};
    let totalGot = 0, totalMax = 0;

    for (const sec of sections) {
      let got = 0, max = 0, answered = 0, count = by[sec].length;
      for (const q of by[sec]) {
        const res = scoreOne(q, answers[q.id]);
        got += res.got;
        max += res.max;
        if (isAnswered(q, answers[q.id])) answered++;
      }
      breakdown[sec] = { got, max, answered, count };
      totalGot += got;
      totalMax += max;
    }

    const startedAt = Number(localStorage.getItem("quiz_startedAt") || Date.now());
    return { breakdown, totalGot, totalMax, startedAt };
  }

  // =========================
  // Exam 页面逻辑
  // =========================
  if (isExam) {
    const by = groupQuestions();
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const sectionTitle = document.getElementById("sectionTitle");
    const sectionHint = document.getElementById("sectionHint");
    const quizBox = document.getElementById("quizBox");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    const submitTip = document.getElementById("submitTip");
    const needTip = document.getElementById("needTip");
    const err = document.getElementById("err");

    document.getElementById("who").textContent = name;
    document.getElementById("which").textContent = school;
    document.getElementById("backHome").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    const SECTIONS = ["listening", "reading", "writing"];
    const SECTION_META = {
      listening: { title: "听力", hint: "每题先播放音频，再选择答案。可反复播放。" },
      reading: { title: "阅读", hint: "阅读题目后选择最合适的一项。" },
      writing: { title: "书写", hint: "包含选择 + 词语排序。排序题：请在输入框写出完整句子。" },
    };

    function getCurrentSection() {
      const s = localStorage.getItem("quiz_currentSection");
      return SECTIONS.includes(s) ? s : "listening";
    }
    function setCurrentSection(sec) {
      localStorage.setItem("quiz_currentSection", sec);
    }

    function renderSection(sec) {
      err.textContent = "";
      setCurrentSection(sec);

      // tabs active
      tabs.forEach(t => t.classList.toggle("active", t.dataset.section === sec));

      sectionTitle.textContent = SECTION_META[sec].title;
      sectionHint.textContent = SECTION_META[sec].hint;

      const qs = by[sec] || [];
      const answers = loadAnswers();

      quizBox.innerHTML = "";
      qs.forEach((q, idx) => {
        const wrap = document.createElement("div");
        wrap.className = "q";

        const head = document.createElement("div");
        head.className = "qhead";
        head.innerHTML = `<div class="qtitle">${idx + 1}. ${q.prompt || ""}</div><div class="muted">${q.points || 0} 分</div>`;
        wrap.appendChild(head);

        // audio
        if (q.type.startsWith("listening") && q.audio) {
          const arow = document.createElement("div");
          arow.className = "audioRow";
          arow.innerHTML = `<audio controls preload="none" src="${q.audio}"></audio>`;
          wrap.appendChild(arow);
        }

        // choices
        if (q.type === "mcq" || q.type === "listening_mcq" || q.type === "listening_tf") {
          const ch = document.createElement("div");
          ch.className = "choices";
          const chosen = answers[q.id];
          q.choices.forEach((c, i) => {
            const id = `${q.id}_${i}`;
            const label = document.createElement("label");
            label.innerHTML = `
              <input type="radio" name="${q.id}" id="${id}" value="${i}" ${String(chosen) === String(i) ? "checked" : ""} />
              ${c}
            `;
            ch.appendChild(label);
          });
          ch.addEventListener("change", (e) => {
            const v = e.target && e.target.value;
            if (v != null) setAnswer(q.id, Number(v));
            updateProgress();
          });
          wrap.appendChild(ch);
        }

        // reorder
        if (q.type === "reorder") {
          const tokenRow = document.createElement("div");
          tokenRow.className = "muted";
          tokenRow.style.marginTop = "8px";
          tokenRow.innerHTML = q.tokens.map(t => `<span class="token">${t}</span>`).join("");
          wrap.appendChild(tokenRow);

          const ta = document.createElement("textarea");
          ta.placeholder = "请把词语排成一句通顺的句子（输入完整句子）";
          ta.value = answers[q.id] || "";
          ta.addEventListener("input", () => {
            setAnswer(q.id, ta.value);
            updateProgress();
          });
          wrap.appendChild(ta);
        }

        quizBox.appendChild(wrap);
      });

      updateProgress();
      updateNavButtons();
    }

    function updateNavButtons() {
      const sec = getCurrentSection();
      const idx = SECTIONS.indexOf(sec);
      prevBtn.disabled = idx <= 0;
      nextBtn.disabled = idx >= SECTIONS.length - 1;
      prevBtn.textContent = "上一页";
      nextBtn.textContent = idx >= SECTIONS.length - 1 ? "下一页" : "下一页";
    }

    function updateProgress() {
      const sec = getCurrentSection();
      const qs = by[sec] || [];
      const answers = loadAnswers();

      const answered = qs.filter(q => isAnswered(q, answers[q.id])).length;
      const total = qs.length;

      // section progress
      const pct = total ? Math.round((answered / total) * 100) : 0;
      progressFill.style.width = pct + "%";
      progressText.textContent = `${SECTION_META[sec].title}：${answered} / ${total} 已作答`;

      // overall submit tip
      const sc = calcScore();
      const allAnswered = Object.values(sc.breakdown).every(x => x.answered === x.count);
      submitTip.textContent = allAnswered ? "✅ 已完成全部题目，可以提交。" : "未完成全部题目也可以提交，但会影响得分。";
      needTip.textContent = answered === total ? "" : "本页还有未作答题目（可先跳页，答案会保留）";
    }

    prevBtn.addEventListener("click", () => {
      const sec = getCurrentSection();
      const idx = SECTIONS.indexOf(sec);
      if (idx > 0) renderSection(SECTIONS[idx - 1]);
    });

    nextBtn.addEventListener("click", () => {
      const sec = getCurrentSection();
      const idx = SECTIONS.indexOf(sec);
      if (idx < SECTIONS.length - 1) renderSection(SECTIONS[idx + 1]);
    });

    tabs.forEach(t => {
      t.addEventListener("click", () => renderSection(t.dataset.section));
    });

    submitBtn.addEventListener("click", async () => {
      err.textContent = "";
      const sc = calcScore();
      localStorage.setItem("quiz_lastScore", JSON.stringify(sc));

      // 可选：提交到 Google Form
      try {
        if (GOOGLE_FORM_ACTION_URL && FORM_ENTRY.name && FORM_ENTRY.school && FORM_ENTRY.score) {
          const detail = JSON.stringify(sc.breakdown);
          const fd = new FormData();
          fd.append(FORM_ENTRY.name, name);
          fd.append(FORM_ENTRY.school, school);
          fd.append(FORM_ENTRY.score, `${sc.totalGot}/${sc.totalMax}`);
          if (FORM_ENTRY.detail) fd.append(FORM_ENTRY.detail, detail);

          // no-cors: Pages 纯前端常用方式
          await fetch(GOOGLE_FORM_ACTION_URL, { method: "POST", mode: "no-cors", body: fd });
        }
      } catch (e) {
        // 不阻断跳转，只提示
        err.textContent = "（提示）分数已生成，但提交到 Google Form 失败。请检查 formResponse URL 和 entry id。";
      }

      // 跳转成绩页
      window.location.href = "result.html";
    });

    renderSection(getCurrentSection());
  }

  // =========================
  // Result 页面逻辑
  // =========================
  if (isResult) {
    const who = document.getElementById("who");
    const which = document.getElementById("which");
    const when = document.getElementById("when");
    const total = document.getElementById("total");
    const note = document.getElementById("note");
    const tbody = document.getElementById("breakdown");

    who.textContent = name;
    which.textContent = school;

    const last = (() => {
      try { return JSON.parse(localStorage.getItem("quiz_lastScore") || "null"); }
      catch { return null; }
    })();

    const sc = last || calcScore();
    const dt = new Date(sc.startedAt || Date.now());
    when.textContent = dt.toLocaleString();

    total.textContent = `${sc.totalGot} / ${sc.totalMax}`;
    note.textContent = "提示：如需修改答案，可返回考试页继续调整，再提交即可更新成绩。";

    const label = { listening: "听力", reading: "阅读", writing: "书写" };
    tbody.innerHTML = "";
    ["listening", "reading", "writing"].forEach(sec => {
      const b = sc.breakdown[sec];
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${label[sec]}</td><td>${b.got}</td><td>${b.max}</td>`;
      tbody.appendChild(tr);
    });

    document.getElementById("again").addEventListener("click", () => {
      window.location.href = "index.html";
    });
    document.getElementById("review").addEventListener("click", () => {
      window.location.href = "exam.html";
    });
  }
})();
