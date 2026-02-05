// ✅ 把这里替换成你 Apps Script 部署得到的 Web app URL
const SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwDYtwsRujLt01m-BZmz2CvOC-DxNzTBOKCneeNaj8A_Wpc8KzlO71Ffzuldq-19YMmLw/exec";

function hskBand(score, maxScore) {
  const pct = maxScore === 0 ? 0 : (score / maxScore);
  if (pct < 0.35) return "HSK1";
  if (pct < 0.60) return "HSK2";
  if (pct < 0.80) return "HSK3";
  return "HSK4+";
}

function render() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  QUESTIONS.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "q";

    const title = document.createElement("div");
    title.innerHTML = `<b>Q${idx + 1}</b> ${q.prompt}`;
    div.appendChild(title);

    if (q.audio) {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.preload = "none";
      audio.style.marginTop = "10px";

      const source = document.createElement("source");
      source.src = q.audio;
      source.type = "audio/mpeg";
      audio.appendChild(source);

      div.appendChild(audio);

      const tip = document.createElement("div");
      tip.className = "muted";
      tip.textContent = "提示：点击播放，可重复听。";
      div.appendChild(tip);
    }

    const choices = document.createElement("div");
    choices.className = "choices";
    q.choices.forEach((c, cidx) => {
      const id = `${q.id}_${cidx}`;
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="${q.id}" id="${id}" value="${cidx}">
        ${c}
      `;
      choices.appendChild(label);
    });
    div.appendChild(choices);

    container.appendChild(div);
  });
}

function collectAnswers() {
  const answers = {};
  QUESTIONS.forEach(q => {
    const picked = document.querySelector(`input[name="${q.id}"]:checked`);
    answers[q.id] = picked ? Number(picked.value) : null;
  });
  return answers;
}

function scoreAnswers(answers) {
  let score = 0;
  let max = 0;
  QUESTIONS.forEach(q => {
    max += (q.points || 1);
    if (answers[q.id] === q.answer) score += (q.points || 1);
  });
  return { score, max };
}

async function submitResult(payload) {
  const res = await fetch(SCRIPT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

document.getElementById("submitBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const final = document.getElementById("final");

  const name = document.getElementById("name").value.trim();
  const school = document.getElementById("school").value.trim();
  if (!name) {
    status.textContent = "请先填写姓名。";
    return;
  }

  const answers = collectAnswers();
  const { score, max } = scoreAnswers(answers);
  const band = hskBand(score, max);

  final.textContent = `你的得分：${score}/${max}；定位：${band}`;

  status.textContent = "正在提交结果…";

  try {
    const resp = await submitResult({
      name,
      school,
      score,
      hsk_level: band,
      answers,
      user_agent: navigator.userAgent
    });

    if (resp.ok) {
      status.textContent = "✅ 已提交成功！你可以关闭页面。";
    } else {
      status.textContent = `⚠️ 提交失败：${resp.error || "unknown error"}`;
    }
  } catch (e) {
    status.textContent = `⚠️ 提交失败：${String(e)}`;
  }
});

render();
