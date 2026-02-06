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

const state = { started:false, answers:{} };

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

  const choices = Array.isArray(q.choices)?q.choices:[];
  const chosen = state.answers[q.id];

  const list = el("div",{class:"choices"});
  choices.forEach((text,i)=>{
    const id = `${q.id}_${i}`;
    const label = el("label",{class:"choiceItem",for:id},[
      el("input",{type:"radio",name:q.id,id,value:String(i),...(chosen===i?{checked:"true"}:{})}),
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
  const startBtn=$("#startBtn");
  const submitBtn=$("#submitBtn");
  const progress=$("#progress");
  const progressText=$("#progressText");
  const tip=$("#tip");

  const name=$("#name")?.value.trim();
  const school=$("#schoolSelect")?.value;

  // 开始按钮：必须填信息
  startBtn.disabled = !(name && school);
  if(tip) tip.textContent = startBtn.disabled ? "请先填写姓名" : "";

  // 未开始：不显示题目
  if(!state.started){
    quizBox.innerHTML="";
    quizBox.appendChild(el("div",{class:"hint"},[
      "填写姓名和学校/项目后，点击「开始考试」。"
    ]));
    if(submitBtn) submitBtn.disabled=true;
    if(progress) progress.style.width="0%";
    if(progressText) progressText.textContent="0 / 0";
    return;
  }

  // 已开始：必须有 QUESTIONS
  const qs = (typeof QUESTIONS!=="undefined" && Array.isArray(QUESTIONS)) ? QUESTIONS : [];
  quizBox.innerHTML="";

  if(qs.length===0){
    quizBox.appendChild(el("div",{class:"error"},[
      "题库没有加载成功（QUESTIONS 为空或未定义）。",
      el("br"),
      "请检查：questions.js 是否正常加载，是否有 const QUESTIONS = [...]。"
    ]));
    if(submitBtn) submitBtn.disabled=true;
    return;
  }

  const total = qs.length;
  const done = Object.keys(state.answers).length;

  if(progress) progress.style.width = `${Math.round(done/total*100)}%`;
  if(progressText) progressText.textContent = `${done} / ${total}`;

  // 分组渲染
  const groups = {};
  qs.forEach(q=>{
    const g=groupTitle(q);
    (groups[g] ||= []).push(q);
  });
  Object.entries(groups).forEach(([gname,items])=>{
    quizBox.appendChild(el("h3",{class:"sectionTitle"},[gname]));
    items.forEach((q,idx)=>quizBox.appendChild(renderQuestion(q, idx)));
  });

  if(submitBtn) submitBtn.disabled = done!==total;
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

function submitExam(){
  const {score,total}=scoreExam();
  alert(`完成！你的分数：${score} / ${total}`);
  // 下一步我们再接入收集结果（Google Forms / Apps Script）
}

window.addEventListener("DOMContentLoaded",()=>{
  $("#startBtn")?.addEventListener("click",()=>{ state.started=true; render(); });
  $("#submitBtn")?.addEventListener("click",submitExam);
  $("#name")?.addEventListener("input",render);
  $("#schoolSelect")?.addEventListener("change",render);
  render();
});
