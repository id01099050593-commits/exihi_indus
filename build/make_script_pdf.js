// 바이어 측 전화 검증 대본(별도 PDF) 생성
// 실행: node make_script_pdf.js <출력.pdf> [<출력.html>]
// - Playwright(Chromium)로 A4 PDF를 만든다. Playwright가 없으면 HTML을 브라우저에서 열어 PDF로 인쇄하면 된다.
// - 말할 문장은 한 줄(.ln)씩 미리 끊어 두고, 줄이 넘쳐 문장 중간에서 꺾이면 오류로 멈춘다.

const fs = require("fs");
const path = require("path");

const OUT_PDF = process.argv[2] || path.join(__dirname, "..", "GFF_SEOUL_2027_바이어_통화대본.pdf");
const OUT_HTML = process.argv[3] || path.join(__dirname, "buyer_call_script.html");

function fontFile(sub, file) {
  try {
    return path.join(path.dirname(require.resolve("@expo-google-fonts/noto-sans-kr/package.json")), sub, file);
  } catch (e) {
    return path.join(require("os").homedir(), ".local/share/fonts", file);
  }
}
const FONT_R = fontFile("400Regular", "NotoSansKR_400Regular.ttf");
const FONT_B = fontFile("700Bold", "NotoSansKR_700Bold.ttf");

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const lines = (arr, cls = "") => arr.map((l) => `<div class="row ${cls}"><span class="ln">${esc(l)}</span></div>`).join("");
const say = (title, time, arr, dir) => `
  <h3>${esc(title)}${time ? ` <span class="time">${esc(time)}</span>` : ""}</h3>
  <div class="say">${lines(arr)}</div>
  ${dir ? `<div class="dir">${dir.map((d) => `<div class="row"><span class="ln">${esc(d)}</span></div>`).join("")}</div>` : ""}`;

// ── 통화 대상 ──
const target = [
  ["대상", "홀라인(HOLLAIN) 바잉 담당자 또는 대표"],
  ["어떤 곳", "백패킹·캠핑·클라이밍 등을 다루는 아웃도어 라이프스타일 편집숍"],
  ["매장", "서울 홍대점(2014년 3월 오픈) · 신세계백화점 강남점 · 제주"],
  ["취급 브랜드", "파타고니아 · 아크테릭스 · 헬리녹스 · 마무트 · 그라미치 · MSR 등과 자체 상품"],
  ["연락처", "홍대점 대표번호 (공식 사이트 고객센터 안내 기준 02-337-3907, 통화 전 다시 확인)"],
  ["통화 시간", "평일 오후 1~3시 (영업 12~21시, 문을 연 직후 한가한 시간) · 주말과 저녁은 피한다"],
  ["안 될 때", "공식 사이트 문의나 인스타그램 DM으로 통화 가능한 시간을 묻는다"],
];

const reasons = [
  ["통화가 된다", ["대표번호가 공개된 독립 편집숍이라 바이어나 대표와 직접 닿을 가능성이 높다.", "무신사·백화점 MD는 학생 전화로 연결되기 어렵다."]],
  ["실제로 문제를 겪는다", ["취급 브랜드 대부분이 해외 브랜드다.", "아크테릭스(2026)·하그로프스(2025)처럼 해외 브랜드가 한국에 직접 매장을 내면, 편집숍은 대신할 브랜드를 찾아야 한다.", "국내 고프코어 브랜드를 한자리에서 볼 곳이 없다는 우리 문제를 가장 가까이서 겪는 곳이다."]],
  ["행사와 맞는다", ["고프코어 옷이 실제로 팔리는 유통 채널이다.", "백화점 매장도 운영해 수수료 구조까지 물어볼 수 있다."]],
];

const hypotheses = [
  "국내 신진 브랜드는 SNS나 지인 소개로 찾고 있어 시간이 많이 든다.",
  "신진 브랜드는 물량·납기·품질이 불안해 들여오기를 망설인다.",
  "한자리에서 비교하고 1:1 상담이 잡힌다면 참관할 의향이 있다.",
];

const flow = [
  ["① 연결", "30초"], ["② 인사 · 녹음 동의", "20초"], ["③ 행사 설명", "1분"],
  ["④ 역할 · 혜택", "30초"], ["⑤ 질문 10개", "4분"], ["⑥ 마무리", "20초"],
];

const groups = [
  {
    title: "A. 지금 겪는 어려움", goal: "우리 행사가 푸는 문제를 이 바이어가 실제로 겪고 있는지 확인한다.",
    qs: [
      { q: ["새 브랜드, 특히 국내 아웃도어·고프코어 브랜드는 주로 어떤 경로로 찾으세요?"], why: "한자리에서 볼 곳이 없다는 문제를 실제로 겪는지",
        f: ["그 방법에서 가장 불편한 점은 뭔가요?", "1년에 새 브랜드를 몇 곳 정도 들이세요?"] },
      { q: ["국내 신진 브랜드를 들여올 때 가장 어렵거나 걱정되는 점은 무엇인가요?"], why: "소재관·제조관이 필요한지 (물량·납기·품질 문제)",
        f: ["보기로 묻기: 물량 · 납기 · 품질 · 공급가 · 브랜드 인지도 중에서는요?"] },
      { q: ["해외 브랜드들이 한국에 직접 매장을 내는 경우가 늘었는데,", "편집숍 입장에서 바잉이나 마진에 달라진 점이 있나요?"], why: "국내 브랜드를 새로 찾아야 할 이유가 실제로 있는지",
        f: ["그래서 국내 브랜드 비중을 늘릴 생각도 있으신가요?"] },
    ],
  },
  {
    title: "B. 행사에서 원하는 것", goal: "바이어가 이 행사에서 얻고 싶은 것과 꼭 있어야 할 구성을 확인한다.",
    qs: [
      { q: ["방금 말씀드린 행사에서 가장 도움이 될 것 같은 건 무엇인가요?"], why: "바이어에게 주는 혜택의 우선순위",
        f: ["보기로 묻기: 한자리 비교 · 1:1 사전 상담 · 생산 업체 확인 · 기능 시험 결과"] },
      { q: ["어떤 브랜드가 몇 곳쯤 와야 시간을 내서 오실 만하다고 느끼세요?"], why: "목표 규모(브랜드 90곳)가 바이어 눈높이에 맞는지",
        f: ["의류, 신발, 가방 중에 꼭 있어야 하는 품목이 있을까요?"] },
      { q: ["상담할 때 꼭 확인하고 싶은 조건이 있다면요?"], why: "1:1 상담에서 브랜드가 준비해야 할 정보",
        f: ["보기로 묻기: 최소 주문 수량 · 공급가와 마진 · 반품 · 독점 판매"] },
    ],
  },
  {
    title: "C. 참여 의향과 걸림돌", goal: "바이어가 실제로 올지, 무엇이 막는지 확인한다(실현 가능성).",
    qs: [
      { q: ["만약 이런 행사가 열린다면, 바이어로 참관하실 의향이 있으신가요?"], why: "실현 가능성의 핵심 — 바이어가 실제로 오는가",
        f: ["(예라면) 어떤 조건이면 꼭 오시겠어요?", "(아니라면) 어떤 점 때문인가요?"] },
      { q: ["9월 말에서 10월 초 일정은 바잉 시기와 맞나요? 언제가 제일 좋으세요?"], why: "개최 시기(2027.9.30~10.3)가 맞는지",
        f: [] },
      { q: ["참관을 망설이게 하는 점이 있다면 무엇인가요?"], why: "운영에서 풀어야 할 걸림돌",
        f: ["보기로 묻기: 매장 인력 · 시간 · 거리 · 비용"] },
      { q: ["마지막으로, 이런 행사가 바이어분들께 정말 도움이 되려면", "꼭 있어야 할 것 한 가지만 꼽아 주신다면요?"], why: "우리가 놓친 점 찾기",
        f: [] },
    ],
  },
];

const faq = [
  ["실제로 열리는 행사인가요?", ["아직은 수업 과제로 기획하는 단계입니다.", "바이어분 의견을 들어서 실제로 열릴 수 있는 행사인지 확인하고 있습니다."]],
  ["참가하려면 비용이 드나요?", ["바이어 참관은 무료로 생각하고 있습니다.", "부스비는 참가하는 브랜드와 업체가 내는 구조입니다."]],
  ["어떤 브랜드가 오나요?", ["케일, 산산기어, 고요웨어 같은 국내 고프코어 브랜드와 원단·봉제 업체가 모집 대상입니다.", "아직 확정된 곳은 없습니다."]],
  ["왜 저희에게 연락하셨어요?", ["아웃도어 브랜드를 직접 골라 들여오시는 편집숍이라서,", "바이어 입장의 의견을 가장 정확하게 들을 수 있다고 생각했습니다."]],
];

const tips = [
  "대본은 흐름을 잡는 용도다. 읽기보다 대화하듯 묻는다.",
  "답을 유도하지 않는다. \"좋죠?\" 대신 \"어떠세요?\"로 묻는다.",
  "숫자가 나오면 한 번 더 확인한다. (\"1년에 다섯 곳 정도라는 말씀이시죠?\")",
  "바쁘다고 하시면 1번(찾는 경로), 2번(어려운 점), 7번(참관 의향)만 묻고 마친다.",
  "통화가 끝나면 10분 안에 기록표를 채운다. 인상 깊은 말은 그대로 적는다.",
  "연결되지 않은 시도도 날짜·시각과 함께 남긴다. (교수님 기준: 연결 실패는 시도 내역으로 구분)",
];

let qn = 0;
const qCards = groups.map((g) => `
  <h3>${esc(g.title)}</h3>
  <div class="goal">${esc(g.goal)}</div>
  ${g.qs.map((x) => {
    qn += 1;
    return `<div class="q">
      <div class="qhead"><span class="n">${qn}</span><div class="qtext">${lines(x.q)}</div></div>
      <div class="why"><span class="tag">알고 싶은 것</span>${esc(x.why)}</div>
      ${x.f.length ? `<div class="follow">${x.f.map((f) => `<div class="row"><span class="ln">→ ${esc(f)}</span></div>`).join("")}</div>` : ""}
    </div>`;
  }).join("")}`).join("");

const shortQs = [
  "국내 고프코어 브랜드를 찾는 경로", "신진 브랜드를 들일 때 어려운 점", "해외 브랜드 직진출 이후 달라진 점",
  "행사에서 가장 도움이 될 것", "와야 할 브랜드 수 · 품목", "상담에서 확인할 조건",
  "바이어로 참관할 의향", "9월 말~10월 초 일정", "참관을 망설이게 하는 점", "꼭 있어야 할 것 한 가지",
];

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>바이어 측 전화 검증 대본</title>
<style>
@font-face { font-family: "GFFNoto"; src: url("file://${FONT_R}"); font-weight: 400; }
@font-face { font-family: "GFFNoto"; src: url("file://${FONT_B}"); font-weight: 700; }
@page { size: A4; margin: 15mm 16mm 17mm 16mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: "GFFNoto", "Noto Sans KR", sans-serif; color: #334155; font-size: 9.4pt; line-height: 1.55; word-break: keep-all; }
.row { margin: 0; }
h1 { font-size: 19pt; color: #182F48; margin: 0; letter-spacing: -0.2pt; }
.sub { color: #267D86; font-size: 10.5pt; font-weight: 700; margin-top: 1mm; }
.meta { color: #64748B; font-size: 8.8pt; margin-top: 1.5mm; }
.purpose { margin-top: 4mm; background: #182F48; color: #FFFFFF; border-radius: 2mm; padding: 3mm 4mm; font-size: 9.6pt; }
.purpose b { color: #9FE0E6; }
h2 { font-size: 12pt; color: #182F48; border-bottom: 1.2px solid #182F48; padding-bottom: 1.2mm; margin: 5mm 0 2.2mm; }
h3 { font-size: 10.4pt; color: #267D86; margin: 4mm 0 1.5mm; page-break-after: avoid; }
h3 .time { color: #94A3B8; font-size: 8.6pt; font-weight: 400; margin-left: 1.5mm; }
table { border-collapse: collapse; width: 100%; font-size: 9pt; }
td, th { border: 0.6px solid #CBD5E1; padding: 1.5mm 2.4mm; vertical-align: top; text-align: left; }
th { background: #182F48; color: #FFFFFF; font-weight: 700; }
td.k { background: #F1F5F9; font-weight: 700; color: #182F48; width: 23mm; white-space: nowrap; }
.reason { margin: 1.6mm 0; }
.reason .h { font-weight: 700; color: #182F48; }
.reason .h span { color: #267D86; margin-right: 1.5mm; }
.reason .b { padding-left: 5mm; }
.flow { display: flex; gap: 1.6mm; margin-top: 1mm; }
.flow div { flex: 1; background: #EEF2F6; border-radius: 1.6mm; padding: 1.8mm 1mm; text-align: center; font-size: 8.4pt; color: #182F48; font-weight: 700; }
.flow div span { display: block; color: #64748B; font-weight: 400; font-size: 8pt; }
.say { page-break-inside: avoid; background: #EEF6F7; border-left: 3px solid #267D86; border-radius: 0 1.6mm 1.6mm 0; padding: 2.6mm 4mm; font-size: 10.2pt; line-height: 1.78; color: #182F48; }
.dir { color: #64748B; font-size: 8.6pt; margin: 1.2mm 0 0 1mm; }
.goal { color: #64748B; font-size: 8.6pt; margin-bottom: 1.2mm; page-break-after: avoid; }
.q { border: 0.6px solid #CBD5E1; border-radius: 1.8mm; padding: 2mm 3mm; margin: 1.3mm 0; page-break-inside: avoid; }
.qhead { display: flex; gap: 2.4mm; align-items: flex-start; }
.qhead .n { flex: none; width: 5.2mm; height: 5.2mm; border-radius: 50%; background: #267D86; color: #FFFFFF; font-weight: 700; font-size: 8.4pt; text-align: center; line-height: 5.2mm; margin-top: 0.4mm; }
.qtext { font-weight: 700; color: #182F48; font-size: 10pt; line-height: 1.6; }
.why { font-size: 8.5pt; color: #475569; margin: 1mm 0 0 7.6mm; }
.why .tag { display: inline-block; background: #E6F2F3; color: #267D86; font-weight: 700; border-radius: 1mm; padding: 0 1.4mm; margin-right: 1.6mm; font-size: 7.8pt; }
.follow { font-size: 8.8pt; color: #334155; margin: 0.8mm 0 0 7.6mm; }
.faq td.k { white-space: normal; width: 44mm; }
ul.tips { margin: 0; padding-left: 4.5mm; }
ul.tips li { margin: 0.8mm 0; }
.pb { page-break-before: always; }
.sheet td { height: 8mm; }
.sheet td.k, .sheet td.no { height: auto; }
.sheet td.no { width: 8mm; text-align: center; color: #267D86; font-weight: 700; }
.sheet .short { width: 52mm; color: #182F48; }
.box { border: 0.6px solid #CBD5E1; border-radius: 1.6mm; padding: 2mm 3mm; min-height: 26mm; }
.box .t { font-weight: 700; color: #182F48; }
.box .h { color: #94A3B8; font-size: 8.4pt; }
.check td { height: auto; }
.check td.c { width: 30mm; text-align: center; color: #64748B; white-space: nowrap; }
</style></head>
<body>
  <h1>바이어 측 전화 검증 대본</h1>
  <div class="sub">고프코어 패션 페어 서울 2027 (GORPCORE FASHION FAIR SEOUL) · 전시산업론 중간과제 별첨 2</div>
  <div class="meta">작성: 정신영 / 20222631</div>
  <div class="purpose"><b>이 통화로 확인할 것</b><br>
    바이어가 이 행사에서 무엇을 얻을 수 있는지, 무엇을 원하는지, 무엇이 참관을 막는지를 직접 듣고,<br>
    바이어가 실제로 올 행사인지(실현 가능성)를 확인한다.</div>

  <h2>1. 통화 대상</h2>
  <table>${target.map(([k, v]) => `<tr><td class="k">${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table>

  <h2>2. 이곳을 고른 이유</h2>
  ${reasons.map(([h, b], i) => `<div class="reason"><div class="h"><span>${"①②③"[i]}</span>${esc(h)}</div><div class="b">${lines(b)}</div></div>`).join("")}

  <h2>3. 통화 전에 세운 가정</h2>
  ${hypotheses.map((h, i) => `<div class="row"><span class="ln"><b style="color:#267D86">${i + 1}</b>&nbsp; ${esc(h)}</span></div>`).join("")}
  <div class="dir" style="margin-top:1mm">통화 후 마지막 장 기록표에 맞음 · 일부 맞음 · 틀림을 표시한다.</div>

  <h2>4. 통화 흐름 (5~7분)</h2>
  <div class="flow">${flow.map(([a, b]) => `<div>${esc(a)}<span>${esc(b)}</span></div>`).join("")}</div>

  <h2>5. 대본</h2>
  ${say("① 연결", "매장 직원이 받았을 때", [
    "안녕하세요. 저는 한림대학교 MICE 전공 학생 정신영입니다.",
    "수업 과제 때문에 연락드렸는데요,",
    "매장 브랜드를 고르시는 바잉 담당자분과 5분 정도 통화할 수 있을까요?",
  ], [
    "담당자가 없으면: \"언제쯤 통화가 가능하실까요? 질문을 보내 드릴 이메일이 있을까요?\"",
    "→ 기록표에 '부재 · 재시도'와 시각을 적고, 알려 준 시간에 다시 건다.",
  ])}
  ${say("② 인사 · 녹음 동의", "약 20초", [
    "안녕하세요, 바쁘신데 시간 내주셔서 감사합니다.",
    "전시산업론 수업에서 전시회를 하나 직접 기획하는 과제를 하고 있는데요,",
    "실제로 브랜드를 고르고 들여오시는 분의 의견이 꼭 필요해서 연락드렸습니다.",
    "5분 정도면 충분하고, 답변은 수업 발표용으로만 쓰고 폐기하겠습니다.",
    "정확하게 기록하고 싶은데, 통화를 녹음해도 괜찮을까요?",
  ], ["녹음을 원하지 않으시면 \"메모만 하겠습니다\"라고 말하고 그대로 진행한다."])}
  ${say("③ 행사 설명", "약 1분", [
    "먼저 저희가 기획하는 행사를 간단히 말씀드릴게요.",
    "요즘 아웃도어 옷을 일상복으로 입는 '고프코어'가 크게 유행하고 있잖아요.",
    "아크테릭스나 살로몬 같은 브랜드가 대표적이고요.",
    "그런데 이 성장의 대부분은 해외 브랜드가 가져가고 있고,",
    "정작 그 옷의 원단이나 생산은 한국 회사들이 많이 맡고 있습니다.",
    "케일, 산산기어, 고요웨어 같은 국내 고프코어 브랜드도 늘고 있는데요,",
    "바이어분들이 이런 브랜드를 한자리에서 보고 비교할 곳은 아직 없다고 봤어요.",
    "그래서 '고프코어 패션 페어 서울'이라는 전시회를 기획하고 있습니다.",
    "2027년 가을, 코엑스에서 나흘 동안 여는 것으로 가정하고 있고요,",
    "앞의 이틀은 바이어 전용 '트레이드 데이'입니다.",
    "국내 고프코어 브랜드와 기능성 원단 업체, 봉제·생산 업체가 한 공간에 모입니다.",
    "참가업체는 브랜드 90곳, 원단·생산 업체 60곳 정도를 목표로 하고 있어요.",
    "뒤의 이틀은 '퍼블릭 랩 데이'로, 일반 소비자에게 엽니다.",
    "방수나 보온 기능을 직접 체험해 보는 날이에요.",
  ])}
  ${say("④ 바이어의 역할과 혜택", "약 30초", [
    "이 행사에서 바이어분들은 다음 시즌에 들여올 브랜드를 찾는 역할을 하시게 됩니다.",
    "마음에 드는 브랜드와는 그 자리에서 주문 상담을 하시면 되고요.",
    "미리 관심 있는 브랜드를 골라 주시면 1:1 상담 일정을 잡아 드립니다.",
    "생산 업체도 같은 자리에 있어서,",
    "그 브랜드가 물량이나 납기를 맞출 수 있는지 바로 확인하실 수 있어요.",
    "방수·보온 시험 결과도 함께 보실 수 있게 준비하려고 합니다.",
    "바이어 참관은 무료로 생각하고 있습니다.",
    "그럼 몇 가지만 여쭤볼게요.",
  ])}

  <h3>⑤ 질문 10개 <span class="time">약 4분 · 읽지 말고 대화하듯 묻는다</span></h3>
  ${qCards}

  ${say("⑥ 마무리", "약 20초", [
    "답변 정말 감사합니다. 말씀해 주신 내용은 기획에 꼭 반영하겠습니다.",
    "정리하다가 한두 가지 더 여쭤볼 게 생기면,",
    "문자로 짧게 연락드려도 괜찮을까요?",
    "바쁘신데 시간 내주셔서 감사합니다. 좋은 하루 보내세요.",
  ])}

  <h2>6. 받을 수 있는 질문과 답</h2>
  <table class="faq">${faq.map(([q, a]) => `<tr><td class="k">"${esc(q)}"</td><td>${lines(a)}</td></tr>`).join("")}</table>

  <h2>7. 통화할 때 지킬 것</h2>
  <ul class="tips">${tips.map((t) => `<li><span class="ln">${esc(t)}</span></li>`).join("")}</ul>

  <h2 class="pb">8. 통화 기록표</h2>
  <h3>시도 기록</h3>
  <table class="sheet"><tr><th style="width:12mm">차수</th><th style="width:36mm">날짜 · 시각</th><th style="width:42mm">결과 (연결 · 부재 · 거절)</th><th>메모</th></tr>
    ${[1, 2, 3].map((i) => `<tr><td class="no">${i}차</td><td></td><td></td><td></td></tr>`).join("")}</table>
  <h3>통화 정보</h3>
  <table class="sheet"><tr><td class="k">통화 상대</td><td></td><td class="k">전화번호</td><td></td></tr>
    <tr><td class="k">통화 일시</td><td></td><td class="k">녹음 여부</td><td></td></tr></table>
  <h3>질문별 답변 메모</h3>
  <table class="sheet"><tr><th style="width:8mm"></th><th style="width:52mm">질문</th><th>답변 메모</th></tr>
    ${shortQs.map((q, i) => `<tr><td class="no">${i + 1}</td><td class="short">${esc(q)}</td><td></td></tr>`).join("")}</table>
  <h3>가정 확인</h3>
  <table class="sheet check">${hypotheses.map((h, i) => `<tr><td class="no">${i + 1}</td><td>${esc(h)}</td><td class="c">맞음 · 일부 · 틀림</td></tr>`).join("")}</table>
  <div style="display:flex; gap:3mm; margin-top:3mm">
    <div class="box" style="flex:1"><div class="t">인상 깊은 말 (원문 그대로)</div></div>
    <div class="box" style="flex:1"><div class="t">기획에 반영할 점 · 더 확인할 점</div></div>
  </div>
</body></html>`;

fs.writeFileSync(OUT_HTML, html);

(async () => {
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch (e) {
    console.log("playwright가 없어 HTML만 만들었다:", OUT_HTML);
    return;
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.resolve(OUT_HTML));
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  // 인쇄 폭(A4 - 여백)에서 문장이 중간에 꺾이는지 검사
  await page.setViewportSize({ width: Math.round((210 - 32) * 96 / 25.4), height: 1200 });
  const wrapped = await page.evaluate(() =>
    [...document.querySelectorAll(".ln")]
      .filter((el) => new Set([...el.getClientRects()].map((r) => Math.round(r.top))).size > 1) // 서로 다른 줄에 걸쳤는가
      .map((el) => el.textContent));
  if (wrapped.length) {
    await browser.close();
    wrapped.forEach((t) => console.error("오류 [대본] 줄이 넘침:", t));
    throw new Error(`대본 줄 넘침 ${wrapped.length}건 — 의미 단위로 다시 끊어야 함`);
  }
  await page.pdf({
    path: OUT_PDF, format: "A4", printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<div></div>",
    footerTemplate: `<div style="width:100%; text-align:center; font-size:7pt; color:#94A3B8; font-family:'Noto Sans KR';">바이어 측 전화 검증 대본 · 고프코어 패션 페어 서울 2027 · <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await browser.close();
  console.log("written", OUT_PDF);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
