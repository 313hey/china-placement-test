{\rtf1\ansi\ansicpg936\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u9989  \u25226 \u36825 \u37324 \u26367 \u25442 \u25104 \u20320  Apps Script \u37096 \u32626 \u24471 \u21040 \u30340  Web app URL\
const SCRIPT_ENDPOINT = "
\f1\fs26 https://script.google.com/macros/s/AKfycbwDYtwsRujLt01m-BZmz2CvOC-DxNzTBOKCneeNaj8A_Wpc8KzlO71Ffzuldq-19YMmLw/exec
\f0\fs24 ";\
\
function hskBand(score, maxScore) \{\
  const pct = maxScore === 0 ? 0 : (score / maxScore);\
  if (pct < 0.35) return "HSK1";\
  if (pct < 0.60) return "HSK2";\
  if (pct < 0.80) return "HSK3";\
  return "HSK4+";\
\}\
\
function render() \{\
  const container = document.getElementById("questions");\
  container.innerHTML = "";\
\
  QUESTIONS.forEach((q, idx) => \{\
    const div = document.createElement("div");\
    div.className = "q";\
\
    const title = document.createElement("div");\
    title.innerHTML = `<b>Q$\{idx + 1\}</b> $\{q.prompt\}`;\
    div.appendChild(title);\
\
    if (q.audio) \{\
      const audio = document.createElement("audio");\
      audio.controls = true;\
      audio.preload = "none";\
      audio.style.marginTop = "10px";\
\
      const source = document.createElement("source");\
      source.src = q.audio;\
      source.type = "audio/mpeg";\
      audio.appendChild(source);\
\
      div.appendChild(audio);\
\
      const tip = document.createElement("div");\
      tip.className = "muted";\
      tip.textContent = "\uc0\u25552 \u31034 \u65306 \u28857 \u20987 \u25773 \u25918 \u65292 \u21487 \u37325 \u22797 \u21548 \u12290 ";\
      div.appendChild(tip);\
    \}\
\
    const choices = document.createElement("div");\
    choices.className = "choices";\
    q.choices.forEach((c, cidx) => \{\
      const id = `$\{q.id\}_$\{cidx\}`;\
      const label = document.createElement("label");\
      label.innerHTML = `\
        <input type="radio" name="$\{q.id\}" id="$\{id\}" value="$\{cidx\}">\
        $\{c\}\
      `;\
      choices.appendChild(label);\
    \});\
    div.appendChild(choices);\
\
    container.appendChild(div);\
  \});\
\}\
\
function collectAnswers() \{\
  const answers = \{\};\
  QUESTIONS.forEach(q => \{\
    const picked = document.querySelector(`input[name="$\{q.id\}"]:checked`);\
    answers[q.id] = picked ? Number(picked.value) : null;\
  \});\
  return answers;\
\}\
\
function scoreAnswers(answers) \{\
  let score = 0;\
  let max = 0;\
  QUESTIONS.forEach(q => \{\
    max += (q.points || 1);\
    if (answers[q.id] === q.answer) score += (q.points || 1);\
  \});\
  return \{ score, max \};\
\}\
\
async function submitResult(payload) \{\
  const res = await fetch(SCRIPT_ENDPOINT, \{\
    method: "POST",\
    headers: \{ "Content-Type": "application/json" \},\
    body: JSON.stringify(payload)\
  \});\
  return res.json();\
\}\
\
document.getElementById("submitBtn").addEventListener("click", async () => \{\
  const status = document.getElementById("status");\
  const final = document.getElementById("final");\
\
  const name = document.getElementById("name").value.trim();\
  const school = document.getElementById("school").value.trim();\
  if (!name) \{\
    status.textContent = "\uc0\u35831 \u20808 \u22635 \u20889 \u22995 \u21517 \u12290 ";\
    return;\
  \}\
\
  const answers = collectAnswers();\
  const \{ score, max \} = scoreAnswers(answers);\
  const band = hskBand(score, max);\
\
  final.textContent = `\uc0\u20320 \u30340 \u24471 \u20998 \u65306 $\{score\}/$\{max\}\u65307 \u23450 \u20301 \u65306 $\{band\}`;\
\
  status.textContent = "\uc0\u27491 \u22312 \u25552 \u20132 \u32467 \u26524 \'85";\
\
  try \{\
    const resp = await submitResult(\{\
      name,\
      school,\
      score,\
      hsk_level: band,\
      answers,\
      user_agent: navigator.userAgent\
    \});\
\
    if (resp.ok) \{\
      status.textContent = "\uc0\u9989  \u24050 \u25552 \u20132 \u25104 \u21151 \u65281 \u20320 \u21487 \u20197 \u20851 \u38381 \u39029 \u38754 \u12290 ";\
    \} else \{\
      status.textContent = `\uc0\u9888 \u65039  \u25552 \u20132 \u22833 \u36133 \u65306 $\{resp.error || "unknown error"\}`;\
    \}\
  \} catch (e) \{\
    status.textContent = `\uc0\u9888 \u65039  \u25552 \u20132 \u22833 \u36133 \u65306 $\{String(e)\}`;\
  \}\
\});\
\
render();\
}