(function () {
  // ====== 可配置 ======
  const SHOW_AUDIO_TEXT_ON_PAPER = false; // 听力 audio_text 默认不显示在卷面（只用来TTS）
  const TTS_LANG = "zh-CN";
  const TTS_RATE = 1.0;

  // ====== DOM ======
  const quizBox = document.getElementById("quizBox");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("status");
  const resultEl = document.getElementById("result");
  const progressFill = document.getElementById("progress");
  const progressText = document.getElementById("progressText");

  const metaName = document.getElementById("metaName");
  const metaSchool = document.getElementById("metaSchool");
  const backToInfo = document.getElementById("backToInfo");

  // ====== 基础校验 ======
  if (!quizBox || !submitBtn) return;
  if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS)) {
    quizBox.innerHTML = `<div class="muted">questions.js 没加载成功：请确认 exam.html 里引用了 ./questions.js</div>`;
    return;
  }

  // ====== 读入信息 ======
  const studentName = localStorage.getItem("quiz_name") || "";
  const studentSchool = localStorage.getItem("quiz_school") || "";
  metaName.textContent = studentName || "（未填写）";
  metaSchool.textContent = studentSchool || "（未选择）";

  backToInfo?.addEventListener("click", () => {
    location.href = "index.html";
  });

  // ====== 工具：TTS ======
  function speak(text) {
    if (!("speechSynthesis" in window)) {
      alert("这个浏览器不支持 TTS（语音合成）。建议用 Chrome。");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = TTS_LANG;
    u.rate = TTS_RATE;
    window.speechSynthesis.speak(u);
  }

  // ====== 渲染题目 ======
  const answers = {}; // { id: number|string }

  function render() {
    const total = QUESTIONS.length;
    progressText.textContent = `0 / ${total}`;
    progressFill.style.width = "0%";

    quizBox.innerHTML = QUESTIONS.map((q, idx) => {
      const tag = `${q.section || ""}${q.level ? " · " + q.level : ""} · ${q.points || 1}分`;
      const stemHtml = q.stem ? `<div class="muted" style="margin:8px 0;white-space:pre-wrap">${escapeHtml(q.stem)}</div>` : "";

      const audioBlock = (q.type && q.type.startsWith("listening"))
        ? renderAudio(q)
        : "";

      const body = q.type === "writing_text"
        ? `<textarea data-qid="${q.id}" placeholder="请在这里输入你的句子…"></textarea>
           <div class="muted" style="margin-top:6px;">提示：本题需要老师人工评分。</div>`
        : renderChoices(q);

      return `
        <div class="q" data-qid="${q.id}">
          <div class="qHead">
            <div>
              <span class="tag">第 ${idx + 1} 题</span>
              <span class="tag">${escapeHtml(tag)}</span>
            </div>
          </div>

          ${stemHtml}
          <div style="margin-top:8px;white-space:pre-wrap">${escapeHtml(q.prompt || "")}</div>

          ${audioBlock}

          <div class="choices" style="margin-top:10px;">
            ${body}
          </div>
        </div>
      `;
    }).join("");

    // 绑定选择题
    quizBox.querySelectorAll('input[type="radio"]').forEach(r => {
      r.addEventListener("change", () => {
        const qid = r.getAttribute("data-qid");
        const val = Number(r.value);
        answers[qid] = val;
        updateProgress();
      });
    });

    // 绑定写作题
    quizBox.querySelectorAll("textarea").forEach(t => {
      t.addEventListener("input", () => {
        const qid = t.getAttribute("data-qid");
        answers[qid] = t.value;
        updateProgress();
      });
    });

    // 绑定听力播放按钮（TTS or mp3）
    quizBox.querySelectorAll("[data-tts]").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-tts") || "";
        // 播两遍：简单做法就是说两次
        speak(text);
        setTimeout(() => speak(text), 2200);
      });
    });

    quizBox.querySelectorAll("[data-audio]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-audio");
        const audio = document.getElementById(id);
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
      });
    });
  }

  function renderAudio(q) {
    // 1) 如果你给了 mp3：q.audio = "audio/L1_Q01.mp3"
    if (q.audio) {
      const audioId = `aud_${q.id}`;
      return `
        <div style="margin-top:10px;">
          <button class="btn" type="button" data-audio="${audioId}">▶ 播放音频（建议播两遍）</button>
          <audio id="${audioId}" src="${escapeAttr(q.audio)}"></audio>
        </div>
      `;
    }

    // 2) 否则用 TTS 播放 q.audio_text
    const t = q.audio_text || "";
    const transcript = (SHOW_AUDIO_TEXT_ON_PAPER && t)
      ? `<div class="muted" style="margin-top:8px;white-space:pre-wrap">（录音文本）${escapeHtml(t)}</div>`
      : "";

    return `
      <div style="margin-top:10px;">
        <button class="btn" type="button" data-tts="${escapeAttr(t)}">🔊 播放（TTS，自动播两遍）</button>
        ${transcript}
      </div>
    `;
  }

  function renderChoices(q) {
    if (!q.choices || !q.choices.length) return `<div class="muted">（本题缺少选项）</div>`;
    return q.choices.map((c, i) => {
      const id = `${q.id}_${i}`;
      return `
        <label for="${id}">
          <input id="${id}" type="radio" name="${q.id}" value="${i}" data-qid="${q.id}" />
          ${escapeHtml(String.fromCharCode(65 + i) + ". " + c)}
        </label>
      `;
    }).join("");
  }

  function updateProgress() {
    const total = QUESTIONS.length;
    let done = 0;
    for (const q of QUESTIONS) {
      const v = answers[q.id];
      if (q.type === "writing_text") {
        if (typeof v === "string" && v.trim()) done++;
      } else {
        if (typeof v === "number") done++;
      }
    }
    progressText.textContent = `${done} / ${total}`;
    progressFill.style.width = `${Math.round((done / total) * 100)}%`;
  }

  // ====== 评分 ======
  function score() {
    let listeningTotal = 0, listeningGot = 0;
    let readingTotal = 0, readingGot = 0;
    let writingATotal = 0, writingAGot = 0;
    let writingBTotal = 0; // 主观题不自动给分，但统计分值

    // 分层题块：用于HSK预估（按文档规则拆块）
    const blocks = {
      HSK1: { total: 0, got: 0 },
      HSK2: { total: 0, got: 0 },
      HSK3: { total: 0, got: 0 },
      HSK4: { total: 0, got: 0 },
    };

    function addBlock(level, isCorrect) {
      if (!blocks[level]) return;
      blocks[level].total += 1;
      if (isCorrect) blocks[level].got += 1;
    }

    for (const q of QUESTIONS) {
      if (q.section === "Listening") {
        listeningTotal += 1;
        const correct = ANSWER_KEY[q.id];
        const pick = answers[q.id];
        const ok = (typeof correct === "number" && typeof pick === "number" && correct === pick);
        if (ok) listeningGot += 1;

        // 按题号切块：Q1-5=HSK1, Q6-10=HSK2, Q11-15=HSK3, Q16-20=HSK4
        const num = Number(q.id.replace("L", ""));
        if (num >= 1 && num <= 5) addBlock("HSK1", ok);
        else if (num <= 10) addBlock("HSK2", ok);
        else if (num <= 15) addBlock("HSK3", ok);
        else addBlock("HSK4", ok);
      }

      if (q.section === "Reading") {
        readingTotal += 1;
        const correct = ANSWER_KEY[q.id];
        const pick = answers[q.id];
        const ok = (typeof correct === "number" && typeof pick === "number" && correct === pick);
        if (ok) readingGot += 1;

        // R1-6=HSK1, R7-12=HSK2, R13-18=HSK3, R19-25=HSK4
        const num = Number(q.id.replace("R", ""));
        if (num >= 1 && num <= 6) addBlock("HSK1", ok);
        else if (num <= 12) addBlock("HSK2", ok);
        else if (num <= 18) addBlock("HSK3", ok);
        else addBlock("HSK4", ok);
      }

      if (q.section === "Writing") {
        if (q.id.startsWith("WA")) {
          writingATotal += 1;
          const correct = ANSWER_KEY[q.id];
          const pick = answers[q.id];
          const ok = (typeof correct === "number" && typeof pick === "number" && correct === pick);
          if (ok) writingAGot += 1;

          // W-A 前5题=HSK1，后5题=HSK2（按文档拆法）
          const n = Number(q.id.replace("WA",""));
          if (n >= 1 && n <= 5) addBlock("HSK1", ok);
          else addBlock("HSK2", ok);
        }
        if (q.id.startsWith("WB")) {
          writingBTotal += 1;
          // 主观题：不自动给分；但对HSK3/4能力判定建议人工看整体
          // 这里不进 blocks 的 got 统计（避免误判）
        }
      }
    }

    // 百分制画像
    const listeningPct = listeningTotal ? Math.round((listeningGot / listeningTotal) * 100) : 0;
    const readingPct = readingTotal ? Math.round((readingGot / readingTotal) * 100) : 0;
    const writingPct = (writingATotal + writingBTotal)
      ? Math.round((writingAGot / (writingATotal + writingBTotal)) * 100)  // WB不自动判分，所以这里会偏保守
      : 0;

    // ===== HSK 预估（只基于客观题块；WB需要老师参考） =====
    // 文档建议：某等级题块>=60%，且低一等级题块>=75%  → 可进入该等级
    function canEnter(level) {
      const order = ["HSK1","HSK2","HSK3","HSK4"];
      const idx = order.indexOf(level);
      const cur = blocks[level];
      if (!cur || cur.total === 0) return false;

      const curRate = cur.got / cur.total;
      if (curRate < 0.60) return false;

      if (idx > 0) {
        const prev = blocks[order[idx - 1]];
        if (!prev || prev.total === 0) return false;
        const prevRate = prev.got / prev.total;
        if (prevRate < 0.75) return false;
      }
      return true;
    }

    function levelFromBlocks() {
      // 最高能进到哪一档
      if (canEnter("HSK4")) return 4;
      if (canEnter("HSK3")) return 3;
      if (canEnter("HSK2")) return 2;
      if (canEnter("HSK1")) return 1;
      return 0;
    }

    // 用“听力块/阅读块/书写块”三者中位数（这里书写块先用 W-A 来近似）
    // 听力等级：只看听力块
    function listeningLevel() {
      // 复制一份 blocks，按听力题单独算
      // 这里简化：用 listeningGot 在四段的通过情况估计
      // 更稳：直接按题段通过率
      const seg = (start, end) => {
        let total = 0, got = 0;
        for (let i = start; i <= end; i++) {
          const id = "L" + i;
          if (ANSWER_KEY[id] === undefined) continue;
          total++;
          if (answers[id] === ANSWER_KEY[id]) got++;
        }
        return total ? got/total : 0;
      };
      const h1 = seg(1,5), h2 = seg(6,10), h3 = seg(11,15), h4 = seg(16,20);
      if (h4>=0.60 && h3>=0.75) return 4;
      if (h3>=0.60 && h2>=0.75) return 3;
      if (h2>=0.60 && h1>=0.75) return 2;
      if (h1>=0.60) return 1;
      return 0;
    }

    function readingLevel() {
      const seg = (start, end) => {
        let total = 0, got = 0;
        for (let i = start; i <= end; i++) {
          const id = "R" + i;
          if (ANSWER_KEY[id] === undefined) continue;
          total++;
          if (answers[id] === ANSWER_KEY[id]) got++;
        }
        return total ? got/total : 0;
      };
      const h1 = seg(1,6), h2 = seg(7,12), h3 = seg(13,18), h4 = seg(19,25);
      if (h4>=0.60 && h3>=0.75) return 4;
      if (h3>=0.60 && h2>=0.75) return 3;
      if (h2>=0.60 && h1>=0.75) return 2;
      if (h1>=0.60) return 1;
      return 0;
    }

    function writingLevelApprox() {
      // 只用 W-A（客观）粗估：前5=HSK1，后5=HSK2；HSK3/4 需要看WB
      const seg = (start, end) => {
        let total = 0, got = 0;
        for (let i = start; i <= end; i++) {
          const id = "WA" + i;
          total++;
          if (answers[id] === ANSWER_KEY[id]) got++;
        }
        return total ? got/total : 0;
      };
      const h1 = seg(1,5), h2 = seg(6,10);
      if (h2>=0.60 && h1>=0.75) return 2;
      if (h1>=0.60) return 1;
      return 0;
    }

    const L = listeningLevel();
    const R = readingLevel();
    const W = writingLevelApprox();

    const trio = [L,R,W].sort((a,b)=>a-b);
    const median = trio[1];

    return {
      listeningGot, listeningTotal, listeningPct,
      readingGot, readingTotal, readingPct,
      writingAGot, writingATotal, writingBTotal, writingPct,
      hsk: { L, R, W, median },
      answersSnapshot: JSON.parse(JSON.stringify(answers)),
    };
  }

  // ====== 提交（本地显示结果；结果收集你后面接表格） ======
  submitBtn.addEventListener("click", () => {
    statusEl.textContent = "正在计算分数…";
    const s = score();

    const listeningScore = s.listeningGot; // 20题=20分
    const readingScore = s.readingGot;     // 25题=25分
    const writingAScore = s.writingAGot;   // 10题=10分
    const totalAuto = listeningScore + readingScore + writingAScore; // WB人工

    resultEl.innerHTML = `
      <div class="resultBox">
        <div class="resultBig">自动评分（不含 W-B 人工题）：${totalAuto} 分</div>
        <div class="muted" style="margin-top:6px;">W-B（排词成句）需要老师人工评分（共 ${s.writingBTotal*2} 分）。</div>

        <div class="grid">
          <div class="pill"><b>听力</b><div>${s.listeningGot}/${s.listeningTotal}（${s.listeningPct}）</div></div>
          <div class="pill"><b>阅读</b><div>${s.readingGot}/${s.readingTotal}（${s.readingPct}）</div></div>
          <div class="pill"><b>书写（仅W-A自动）</b><div>${s.writingAGot}/${s.writingATotal}</div></div>
        </div>

        <div style="margin-top:12px;">
          <b>HSK 预估（客观题为主）</b>
          <div class="muted">听力：HSK${s.hsk.L || "—"}｜阅读：HSK${s.hsk.R || "—"}｜书写：HSK${s.hsk.W || "—"}（W-B需人工看）</div>
          <div class="resultBig" style="margin-top:6px;">整体建议：HSK${s.hsk.median || "—"}</div>
        </div>

        <div class="muted" style="margin-top:10px;">
          （下一步你要“收集结果”时，我们把 s.answersSnapshot + 学生信息 POST 到 Google Sheet / Form / 后端。）
        </div>
      </div>
    `;

    statusEl.textContent = "已出结果。";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ====== HTML escape ======
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[s]));
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

  // ====== init ======
  render();
  updateProgress();
})();
