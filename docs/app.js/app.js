function $(sel){ return document.querySelector(sel); }
function el(tag, attrs={}, children=[]){
  const node=document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k==="class") node.className=v;
    else node.setAttribute(k,v);
  });
  children.forEach(c=>node.appendChild(typeof c==="string"?document.createTextNode(c):c));
  return node;
}

const state = { answers:{} };

function groupTitle(q){
  if(q.type && q.type.startsWith("listening")) return "听力 Listening";
  return "选择题 MCQ";
}

function renderQuestion(q, idx){
  const wrap = el("div", {class:"qCard"});
  wrap.appendChild(el("div",{class:"qMeta"},[`Q${idx+1} · ${q.points||1} pts`]));
  wrap.appendChild(el("div",{class:"qPrompt"},[q.prompt||""]));
  if(q.audio){
    wrap.appendChild(el("audio",{controls:"true",preload:"none",src:q.audio}));
  }

  const list = el("div",{class:"choices"});
  (q.choices||[]).forEach((text,i)=>{
    const id = `${q.id}_${i}`;
    const label = el("label",{class:"choiceItem",for:id},[
      el("input",{type:"radio",name:q.id,id,value:String(i),...(state.answers[q.id]===i?{checked:"true"}:{})}),
      el("span",{},[text])
    ]);
    label.querySelector("input").addEventListener("change",()=>{
      state.answers[q.id]=i;
      render();
    });
    list.appendChild(label);
  });

  wrap.appendChild(list);
  return wrap;
}

function render(){
  const quizBox=$("#quizBox");
  const submitBtn=$("#submitBtn");
  const progress=$("#progress");
  const progressText=$("#progressText");
  if(!quizBox) return;

  const qs = (typeof QUESTIONS!=="undefined" && Array.isArray(QUESTIONS)) ? QUESTIONS : [];
  quizBox.innerHTML="";

  if(qs.length===0){
    quizBox.appendChild(el("div",{class:"error"},[
      "题库未加载（QUESTIONS 为空或未定义）。",
      el("br"),
      "请检查 questions.js 是否正常加载。"
    ]));
    if(submitBtn) submitBtn.disabled=true;
    if(progress) progress.style.width="0%";
    if(progressText) progressText.textContent="0 / 0";
    return;
  }

  const total = qs.length;
  const done = Object.keys(state.answers).length;
  if(progress) progress.style.width = `${Math.round(done/total*100)}%`;
  if(progressText) progressText.textContent = `${done} / ${total}`;
  if(submitBtn) submitBtn.disabled = done!==total;

  const groups = {};
  qs.forEach(q=>{ const g=groupTitle(q); (groups[g] ||= []).push(q); });

  Object.entries(groups).forEach(([gname,items])=>{
    quizBox.appendChild(el("h3",{class:"sectionTitle"},[gname]));
    items.forEach((q,idx)=>quizBox.appendChild(renderQuestion(q, idx)));
  });
}

function scoreExam(){
  const qs = (typeof QUESTIONS!=="undefined" && Array.isArray(QUESTIONS)) ? QUESTIONS : [];
  let score=0,total=0;
  qs.forEach(q=>{
    const pts=q.points||1; total+=pts;
    if(state.answers[q.id]===q.answer) score+=pts;
  });
  return {score,total};
}

function initExamPage(){
  if(!$("#quizBox")) return; // 只在 exam.html 生效

  const name = localStorage.getItem("quiz_name") || "";
  const school = localStorage.getItem("quiz_school") || "";
  const who = $("#who");
  if(who) who.textContent = (name && school) ? `考生：${name}｜项目：${school}` : "未检测到考生信息，请返回上一页填写。";

  $("#submitBtn")?.addEventListener("click", ()=>{
    const {score,total}=scoreExam();
    alert(`完成！你的分数：${score} / ${total}`);
    // 下一步：接入结果收集（Google Forms / Apps Script）
  });

  render();
}

window.addEventListener("DOMContentLoaded", initExamPage);
