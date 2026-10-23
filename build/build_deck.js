// 고프코어 패션 페어 서울 2027 — 전시산업론 중간고사 개인 과제 (6장)
// 교수님 템플릿(Exhibition_Midterm_Assignment.pptx)의 레이아웃·글꼴·색을 그대로 따르고
// 안내 문구 자리를 실제 내용으로 채운다.
// 실행: node build/build_deck.js <출력 경로.pptx>

const pptxgen = require("pptxgenjs");

const OUT = process.argv[2] || "GFF_SEOUL_2027_중간과제.pptx";
const AUTHOR = "( 이름 / 학번 )"; // 제출 전 본인 이름/학번으로 교체

// 템플릿 색상
const NAVY = "182F48";
const TEAL = "267D86";
const MUTED = "64748B";
const BODY = "334155";
const LINE = "CBD5E1";
const TINT = "EAF4F5";
const LIGHT = "F1F5F9";
const ORANGE = "C2410C";
const ORANGE_TINT = "FFF1E8";
const WHITE = "FFFFFF";
const FONT = "Noto Sans KR";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 (템플릿과 동일)
pres.author = "전시산업론 중간고사";
pres.title = "고프코어 패션 페어 서울 2027";
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

// 템플릿 공통 프레임: 상단 과제 표기, 이름/학번, 제목·소제목 자리
pres.defineSlideMaster({
  title: "GFF_CONTENT",
  background: { color: WHITE },
  objects: [
    {
      text: {
        text: AUTHOR,
        options: { x: 9.2, y: 0.31, w: 3.45, h: 0.29, fontFace: FONT, fontSize: 12, color: MUTED, align: "right", margin: 0 },
      },
    },
    {
      placeholder: {
        options: { name: "title", type: "title", x: 0.67, y: 0.85, w: 11.98, h: 0.62, fontFace: FONT, fontSize: 33, bold: true, color: NAVY, margin: 0, valign: "middle", align: "left" },
        text: "",
      },
    },
    {
      placeholder: {
        options: { name: "subtitle", type: "body", x: 0.67, y: 1.5, w: 11.98, h: 0.42, fontFace: FONT, fontSize: 18, color: TEAL, margin: 0, valign: "middle", align: "left" },
        text: "",
      },
    },
  ],
});

function frame(n, title, subtitle, sources, notes) {
  const s = pres.addSlide({ masterName: "GFF_CONTENT" });
  s.addText(`전시산업론 중간고사 개인 과제   ${typeof n === "number" ? `${n}/6` : n}`, {
    x: 0.67, y: 0.31, w: 6, h: 0.29, fontFace: FONT, fontSize: 12, color: MUTED, margin: 0, isTextBox: true, objectName: "과제 표기",
  });
  s.addText(title, { placeholder: "title" });
  s.addText(subtitle, { placeholder: "subtitle" });
  s.addText(sources, {
    x: 0.67, y: 6.93, w: 11.98, h: 0.45, fontFace: FONT, fontSize: 8.5, color: MUTED, margin: 0, valign: "top", isTextBox: true, objectName: "출처",
  });
  if (notes) s.addNotes(notes);
  return s;
}

function label(s, text, y, h = 0.4) {
  s.addText(text, {
    x: 0.67, y, w: 2.85, h, fontFace: FONT, fontSize: 15, bold: true, color: NAVY, margin: 0, valign: "top", isTextBox: true, objectName: `라벨 ${text}`,
  });
}

function box(s, x, y, w, h, fill, name, lineColor) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: fill }, line: lineColor ? { color: lineColor, width: 0.75 } : { type: "none" }, objectName: name,
  });
}

function rbox(s, x, y, w, h, fill, name, lineColor) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.06, fill: { color: fill }, line: lineColor ? { color: lineColor, width: 0.75 } : { type: "none" }, objectName: name,
  });
}

function txt(s, runs, opts) {
  s.addText(runs, Object.assign({ fontFace: FONT, color: BODY, margin: 0, valign: "top", isTextBox: true }, opts));
}

function arrow(s, x, y, w, color, name, reverse = false, width = 1.5) {
  s.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: reverse ? { color, width, beginArrowType: "triangle" } : { color, width, endArrowType: "triangle" },
    objectName: name,
  });
}

const CX = 3.7; // 내용 영역 시작 (템플릿과 동일)
const CW = 8.95;

// ─────────────────────────────────────────────────────────────
// 1/6 전시회 제목 · 기획 배경
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    1,
    "전시회 제목 · 기획 배경",
    "무슨 전시회이며, 왜 지금 필요한가?",
    "출처: TENANT news(2025, 2024년 아웃도어 상위 12개 브랜드 매출) · 뉴데일리(2025.4.11, 아웃도어 시장 7조→4조) · 엠브레인 트렌드모니터 「2026 등산 경험 및 인식 조사」(농촌진흥청 웹진 2026.6) · 뉴시스(2026.3.24, 지그재그 검색량) · 무신사 뉴스룸(2024.7.17, 도쿄 쇼룸) · 한국경제(2025.11.21, 아크테릭스 한국 직진출) · 한국경제(2026.5.28, SPOEX 2026 성과) · 쿠키뉴스(2026.3.6, 캠핑앤피크닉페어) · 서울특별시 보도자료(2025.2.27, 서울패션위크 트레이드쇼) · FashionUnited(2025.11, ISPO) · 참가업체 측 인터뷰(2026.10.17)",
    [
      "[전시회명] 고프코어 패션 페어 서울 2027(GORPCORE FASHION FAIR SEOUL). 산에서 입던 기능성 아웃도어가 도시의 패션이 된 '고프코어'를 단일 카테고리로 다루는 B2B+B2C 하이브리드 전시회입니다. 2027년 9월 30일(목)~10월 3일(일) 코엑스(가안, 예산·장소 검토는 중간고사 이후 단계), 앞 2일은 트레이드 데이, 뒤 2일은 퍼블릭 랩 데이입니다.",
      "[기획 배경] 첫째, 시장이 양극화됐습니다. 국내 아웃도어 시장은 2014년 약 7조 원에서 2024년 약 4조 원으로 줄었는데, 2024년 상위 12개 브랜드 중 성장한 곳은 노스페이스(+4.3%), 스노우피크어패럴(+32%), 아크테릭스(+41%) 세 곳뿐이었습니다. 등산복형 브랜드(K2 -8.8%, 블랙야크 -11.7%)는 줄고 패션성이 강한 브랜드만 컸습니다. 즉 수요가 '등산복'에서 '고프코어 패션'으로 이동했습니다.",
      "둘째, 소비자가 바뀌었습니다. 2026년 최근 1년 등산 경험률은 66.9%이고 20대 64.5%, 30대 62%로 젊은 층의 상승이 두드러집니다. 지그재그에서는 2026년 2~3월 '등산' 검색이 57%, '등산화' 검색이 170% 늘었습니다.",
      "셋째, 해외 수요가 한국으로 오고 있습니다. 아크테릭스는 2026년 한국에 직진출했고, 무신사가 도쿄에서 연 한국 브랜드 수주 쇼룸에는 빔즈·유나이티드애로우즈 등 일본 편집숍 바이어 200명 이상이 왔으며 주문이 3배 늘었습니다. 이것은 몇몇 브랜드의 불편이 아니라 산업 구조의 문제입니다. 고프코어 패션 산업이 더 커지려면 브랜드·바이어·관심 고객이 만나는 거래 인프라가 필요한데, 지금은 거래가 특정 플랫폼의 해외 쇼룸과 팝업으로 흩어져 있고 국내에는 중립적인 거래의 장이 없습니다.",
      "[기존 전시회와의 차이] SPOEX는 스포츠·레저 용품 전반, 캠핑앤피크닉페어와 고카프는 캠핑 장비 현장판매, 서울패션위크 트레이드쇼는 디자이너 의류 중심이라 '기능+패션'이 빠져 있습니다. 해외 ISPO는 기능 중심이며 출품사가 3,307개(2018)에서 1,937개(2024)로 줄어 2026년 암스테르담으로 이전합니다. 실제로 인터뷰한 마무트 유통 담당자도 코엑스·킨텍스 아웃도어 행사는 \"고객의 니즈가 다르기 때문에\" 참여하지 않는다고 했습니다. 우리 전시회는 고프코어 패션 단일 카테고리, 사전 매칭 수주상담, 기능을 검증하는 Test Lab과 고객 반응 리포트로 차별화합니다.",
    ].join("\n\n")
  );

  // 전시회명 · 작성자
  label(s, "전시회명 · 작성자", 2.12);
  txt(s, [
    { text: "고프코어 패션 페어 서울 2027", options: { fontSize: 21, bold: true, color: NAVY } },
    { text: "   GORPCORE FASHION FAIR SEOUL (GFF SEOUL)", options: { fontSize: 12, bold: true, color: TEAL } },
  ], { x: CX, y: 2.05, w: CW, h: 0.45, valign: "middle", objectName: "전시회명" });
  txt(s, "2027. 9. 30(목)~10. 3(일) · 코엑스(가안) · 트레이드 데이(B2B) 2일 + 퍼블릭 랩 데이(B2C) 2일", {
    x: CX, y: 2.5, w: 6.95, h: 0.3, fontSize: 10.5, color: BODY, valign: "middle", objectName: "개요",
  });
  txt(s, "작성자: [ 이름 / 학번 ]", {
    x: CX + 6.95, y: 2.5, w: CW - 6.95, h: 0.3, fontSize: 10.5, bold: true, color: NAVY, align: "right", valign: "middle", objectName: "작성자",
  });

  // 기획 배경: 근거 카드 3장 + 문제 정의
  label(s, "기획 배경", 3.0);
  const cards = [
    { big: "3 / 12", cap: "상위 12개 브랜드 중 성장(2024)", body: "아크테릭스 +41%, 스노우피크어패럴 +32%, 노스페이스 +4.3%만 성장. 시장은 7조(2014)→약 4조(2024). 등산복 수요가 고프코어 패션으로 이동" },
    { big: "66.9%", cap: "최근 1년 등산 경험률(2026)", body: "20대 64.5%·30대 62%로 상승. 지그재그 '등산화' 검색 +170%(2026.2~3). 2030이 새 소비층" },
    { big: "200명+", cap: "무신사 도쿄 쇼룸 일본 바이어", body: "빔즈·유나이티드애로우즈 등 참석, 주문 3배. 아크테릭스 2026 한국 직진출. 한국이 아시아 고프코어 테스트베드" },
  ];
  const cw = 2.9, gap = 0.125;
  cards.forEach((c, i) => {
    const x = CX + i * (cw + gap);
    rbox(s, x, 2.98, cw, 1.6, LIGHT, `근거 카드 ${i + 1}`);
    txt(s, c.big, { x: x + 0.15, y: 3.04, w: cw - 0.3, h: 0.5, fontSize: 24, bold: true, color: TEAL, valign: "middle", objectName: `근거 수치 ${i + 1}` });
    txt(s, c.cap, { x: x + 0.15, y: 3.52, w: cw - 0.3, h: 0.26, fontSize: 10, bold: true, color: NAVY, objectName: `근거 제목 ${i + 1}` });
    txt(s, c.body, { x: x + 0.15, y: 3.8, w: cw - 0.3, h: 0.74, fontSize: 9.5, color: BODY, objectName: `근거 설명 ${i + 1}` });
  });
  rbox(s, CX, 4.66, CW, 0.5, TINT, "문제 정의 배경");
  txt(s, [
    { text: "산업 구조의 문제  ", options: { bold: true, color: TEAL } },
    { text: "고프코어 패션 산업이 더 커지려면 브랜드·바이어·관심 고객이 만나는 거래 인프라가 필요한데 국내엔 없다 → 수주는 특정 플랫폼의 해외 쇼룸·팝업으로 흩어지고, 브랜드는 기능을 설명할 곳이 없다", options: { bold: true, color: NAVY } },
  ], { x: CX + 0.15, y: 4.66, w: CW - 0.3, h: 0.5, fontSize: 11, valign: "middle", objectName: "문제 정의" });

  // 기존 전시회와의 차이
  label(s, "기존 전시회와의 차이", 5.35);
  const rows = [
    ["SPOEX", "코엑스·3월·300개사/4.7만 명", "스포츠·레저 용품 전반, 패션·트렌드 관점 부재"],
    ["캠핑앤피크닉페어·고카프", "킨텍스·세텍·116개사(2026.3)", "캠핑 장비 현장판매 중심 (인터뷰: 고객 니즈가 달라 불참)"],
    ["서울패션위크 트레이드쇼", "DDP·130개 브랜드·바이어 300명", "디자이너 의류 수주, 기능 검증·아웃도어 없음"],
    ["ISPO (해외)", "뮌헨→2026 암스테르담", "기능 중심 B2B, 출품 3,307→1,937개사로 축소"],
  ];
  const tRows = rows.map((r) => [
    { text: r[0], options: { bold: true, color: NAVY } },
    { text: r[1], options: { color: MUTED } },
    { text: r[2], options: { color: BODY } },
  ]);
  s.addTable(tRows, {
    x: CX, y: 5.3, w: 5.55, colW: [1.55, 1.75, 2.25], rowH: 0.36, fontFace: FONT, fontSize: 8.5, margin: [2, 4, 2, 4], valign: "middle",
    border: { type: "solid", pt: 0.5, color: LINE }, objectName: "기존 전시회 비교표",
  });
  rbox(s, CX + 5.7, 5.3, CW - 5.7, 1.44, NAVY, "차별점 배경");
  txt(s, [
    { text: "GFF SEOUL 차별점", options: { bold: true, color: "9FE0E6", fontSize: 11, breakLine: true } },
    { text: "① 고프코어 '패션' 단일 카테고리", options: { color: WHITE, breakLine: true } },
    { text: "② 트레이드 데이: 인증 바이어 1:1 사전 매칭", options: { color: WHITE, breakLine: true } },
    { text: "③ 퍼블릭 랩 데이: 방수·보온 Test Lab", options: { color: WHITE, breakLine: true } },
    { text: "④ 브랜드별 고객 반응 리포트 제공", options: { color: WHITE } },
  ], { x: CX + 5.85, y: 5.38, w: CW - 6.0, h: 1.3, fontSize: 10, paraSpaceAfter: 2, objectName: "차별점" });
}

// ─────────────────────────────────────────────────────────────
// 2/6 미션 · 비전
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    2,
    "미션 · 비전 (Mission Statement)",
    "전시회의 존재 이유와 장기적인 방향",
    "출처: 산업통상부 「전시산업 발전 로드맵 2030」(2026.10.14 경제관계장관회의, 산업·문화 융합형 대형 전시회 비중 5%→20%, 국가·지역 대표 전시회 5개 이상) · 무신사 뉴스룸(2024.7.17, 도쿄 쇼룸) · Houyhnhnm·END.(케일 해외 판매) · TENANT news(2025) · 뉴데일리(2025.4.11) · 참가업체 측 인터뷰(2026.10.17)",
    [
      "[미션] 이 산업에서 문제를 가진 이해관계자는 둘입니다. 신진 K-고프코어 브랜드는 바이어를 만날 창구가 특정 플랫폼의 쇼룸이나 팝업으로 흩어져 있고, 국내에 들어온 해외 아웃도어 브랜드는 비싼 제품의 기능을 깊이 들어줄 고객을 만날 곳이 없습니다. 그래서 미션은 '신진 브랜드에게는 맞는 바이어를, 아웃도어 브랜드에게는 기능을 깊이 들어줄 고객을 한 곳에서 연결해, 고프코어 패션이 제값에 거래되는 장을 만든다'입니다.",
      "[비전] 2030년, 아시아 바이어가 다음 시즌 고프코어 트렌드를 사러 서울에 오는 아시아 대표 고프코어 패션 거래 플랫폼이 되는 것입니다. 이 전시회가 계속되면 산업이 이렇게 바뀝니다. K-고프코어 브랜드가 국내 플랫폼 입점 경쟁에만 기대지 않고 해외 편집숍과 총판으로 진출하고, 등산복 중심으로 7조에서 4조로 줄어든 아웃도어 산업이 '기능+패션' 수출 산업으로 다시 성장합니다.",
      "[연결] 이 문제는 몇몇 브랜드의 작은 불편이 아니라 산업 구조의 문제입니다. 고프코어 패션 산업이 더 커지려면 브랜드와 국내외 바이어가 만나는 거래 인프라, 그리고 기능의 가치를 소비자에게 전달할 접점이 필요한데 지금은 둘 다 없습니다. 미션은 이 두 가지를 해결하고, 비전은 그 결과 산업이 수출형으로 커지는 모습입니다. 정부가 이달 14일 발표한 「전시산업 발전 로드맵 2030」도 산업·문화 융합형 대형 전시회를 5%에서 20%로 늘리겠다고 해서 방향이 같습니다.",
    ].join("\n\n")
  );

  label(s, "미션  Mission", 2.12);
  txt(s, "누구의 어떤 문제를 해결하나요?", { x: 0.67, y: 2.47, w: 2.85, h: 0.3, fontSize: 10, color: MUTED, objectName: "미션 안내" });
  rbox(s, CX, 2.05, CW, 1.12, TINT, "미션 배경");
  txt(s, [
    { text: "신진 K-고프코어 브랜드에게는 '맞는 바이어'를, 아웃도어 브랜드에게는 '기능을 깊이 들어줄 고객'을 한 곳에서 연결해 고프코어 패션이 제값에 거래되는 장을 만든다.", options: { fontSize: 14, bold: true, color: NAVY, breakLine: true } },
    { text: "대상  ", options: { fontSize: 10, bold: true, color: TEAL } },
    { text: "신진 K-고프코어 브랜드 · 국내 진출 해외 아웃도어 브랜드     ", options: { fontSize: 10, color: BODY } },
    { text: "문제  ", options: { fontSize: 10, bold: true, color: TEAL } },
    { text: "바이어 창구가 플랫폼별로 흩어짐 · 기능을 들어줄 관심 고객 접점 부족", options: { fontSize: 10, color: BODY } },
  ], { x: CX + 0.2, y: 2.09, w: CW - 0.4, h: 1.04, valign: "middle", paraSpaceAfter: 5, objectName: "미션" });

  label(s, "비전  Vision", 3.37);
  txt(s, "지속되면 산업에 어떤 변화를?", { x: 0.67, y: 3.72, w: 2.85, h: 0.3, fontSize: 10, color: MUTED, objectName: "비전 안내" });
  rbox(s, CX, 3.3, CW, 1.38, NAVY, "비전 배경");
  txt(s, [
    { text: "2030년, 아시아 바이어가 다음 시즌 고프코어 트렌드를 사러 서울에 오는 '아시아 대표 고프코어 패션 거래 플랫폼'이 된다.", options: { fontSize: 14, bold: true, color: WHITE, breakLine: true } },
    { text: "산업 변화  ", options: { fontSize: 10, bold: true, color: "9FE0E6" } },
    { text: "K-고프코어 브랜드가 국내 플랫폼 입점 경쟁에만 기대지 않고 해외 편집숍·총판으로 진출하고, 등산복 중심으로 줄어든 아웃도어 산업이 '기능 + 패션' 수출 산업으로 다시 성장한다", options: { fontSize: 10, color: WHITE } },
  ], { x: CX + 0.2, y: 3.34, w: CW - 0.4, h: 1.3, valign: "middle", paraSpaceAfter: 5, objectName: "비전" });

  label(s, "기획 배경과의 연결", 4.85);
  txt(s, "앞 장의 문제와 미션·비전은 어떻게 이어지나요?", { x: 0.67, y: 5.2, w: 2.85, h: 0.5, fontSize: 10, color: MUTED, objectName: "연결 안내" });
  txt(s, [
    { text: "고프코어 패션 산업이 더 커지려면 ", options: { color: BODY } },
    { text: "① 브랜드와 국내외 바이어가 만나는 거래 인프라", options: { bold: true, color: NAVY } },
    { text: "와 ", options: { color: BODY } },
    { text: "② 기능의 가치를 소비자에게 전달할 접점", options: { bold: true, color: NAVY } },
    { text: "이 필요한데 지금은 둘 다 없다(산업 구조의 문제). 미션이 이 둘을 해결하고, 비전은 그 결과 산업이 수출형으로 커지는 모습이다.", options: { color: BODY } },
  ], { x: CX, y: 4.8, w: CW, h: 0.48, fontSize: 10, valign: "middle", objectName: "연결 서술" });
  const links = [
    ["배경 ① 수요가 등산복→고프코어 패션으로 이동, 기존 전시는 캠핑·용품 중심", "미션 '기능을 깊이 들어줄 고객'", "퍼블릭 랩 데이: Test Lab·브랜드 스토리 무대"],
    ["배경 ② 해외 바이어 수요가 플랫폼별 쇼룸·팝업으로 분산", "미션 '맞는 바이어'", "트레이드 데이: 인증 바이어 1:1 매칭"],
    ["배경 ③ 해외가 K-고프코어를 찾음(무신사 도쿄 주문 3배) + 로드맵 2030 융합형 전시 확대", "비전 '아시아 대표 플랫폼'", "해외 바이어 비중 확대, 연례 개최"],
  ];
  const colX = [CX, CX + 3.85, CX + 6.25];
  const colW = [3.55, 2.1, 2.7];
  links.forEach((r, i) => {
    const y = 5.33 + i * 0.52;
    rbox(s, colX[0], y, colW[0], 0.46, LIGHT, `연결 배경 ${i + 1}`);
    txt(s, r[0], { x: colX[0] + 0.1, y, w: colW[0] - 0.2, h: 0.46, fontSize: 9, color: BODY, valign: "middle", objectName: `연결 배경 문구 ${i + 1}` });
    arrow(s, colX[0] + colW[0] + 0.03, y + 0.23, 0.24, TEAL, `연결 화살표 A${i + 1}`);
    rbox(s, colX[1], y, colW[1], 0.46, TINT, `연결 미션 ${i + 1}`);
    txt(s, r[1], { x: colX[1] + 0.1, y, w: colW[1] - 0.2, h: 0.46, fontSize: 9.5, bold: true, color: TEAL, valign: "middle", objectName: `연결 미션 문구 ${i + 1}` });
    arrow(s, colX[1] + colW[1] + 0.03, y + 0.23, 0.09, TEAL, `연결 화살표 B${i + 1}`);
    rbox(s, colX[2], y, colW[2], 0.46, WHITE, `연결 실행 ${i + 1}`, LINE);
    txt(s, r[2], { x: colX[2] + 0.1, y, w: colW[2] - 0.2, h: 0.46, fontSize: 9, bold: true, color: NAVY, valign: "middle", objectName: `연결 실행 문구 ${i + 1}` });
  });
}

// ─────────────────────────────────────────────────────────────
// 3/6 개최 목표 (Objective)
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    3,
    "개최 목표 (Objective)",
    "이번 개최(제1회, 2027. 9. 30 ~ 10. 3)에서 달성할 목표 3가지 · SMART 기준",
    "출처: 서울특별시 보도자료(2025.2.27, 2025 F/W 서울패션위크 트레이드쇼 130개 브랜드·바이어 300여 명·수주상담 671만 달러) · 쿠키뉴스(2026.3.6, 캠핑앤피크닉페어 116개사) · 한국경제(2026.5.28, SPOEX 2026 300개사·4.7만 명) · 무신사 뉴스룸(2024.7.17) · BusinessWire(2023, FIELDSTYLE JAPAN 4.8만 명) · 참가업체 측 인터뷰(2026.10.17)",
    [
      "목표는 모두 '제1회 폐막일인 2027년 10월 3일'까지로 기한을 정했고, 숫자는 실제 비교 전시회 실적에서 가져왔습니다.",
      "[목표 1 참가업체] 고프코어 패션 브랜드 120개사, 200부스. 그중 신진 K-브랜드를 60개사 이상으로 해서 '발굴' 기능을 지키고, 2029년 3회차에는 300개사로 2.5배 키웁니다. 서울패션위크 트레이드쇼가 130개 브랜드, 캠핑앤피크닉페어가 116개사이므로 단일 카테고리 첫 회로 달성 가능한 규모입니다. SPOEX 수준인 300개사는 3회차 목표로 둡니다.",
      "[목표 2 거래] 사전 인증 바이어 300명(해외 100명), 1:1 매칭 상담 1,200건(브랜드당 10건), 수주상담액 700만 달러. 서울패션위크 트레이드쇼가 바이어 300명으로 671만 달러를 기록했고, 무신사 도쿄 쇼룸에는 해외 바이어만 200명 이상이 왔습니다. KOTRA 초청을 연계하면 해외 100명은 현실적입니다. 폐막 3개월 뒤 실제 계약 전환율까지 추적합니다. 거래 성과가 나오지 않으면 참가업체가 다음 해에 돌아오지 않아 전시회가 존속할 수 없기 때문에 이 목표가 가장 중요합니다.",
      "[목표 3 관심 고객 경험] 퍼블릭 랩 데이 사전등록 관람객 2만 명, 그중 50% 이상이 Test Lab을 체험하고, 참가업체의 '고객 반응' 만족도 4.0/5 이상. 인터뷰에서 브랜드가 말한 성공 기준이 '고객의 반응'이었기 때문에 관람객 수보다 체험률과 반응 만족도를 핵심 지표로 삼았습니다. 일본 FIELDSTYLE이 2일간 4.8만 명, SPOEX가 4일간 4.7만 명이므로 2일 2만 명은 보수적인 목표입니다.",
    ].join("\n\n")
  );

  // 열 제목
  const cx = [CX, CX + 3.05, CX + 6.0];
  const cwid = [2.95, 2.85, 2.95];
  ["달성할 내용", "확인할 지표 · 방법", "설정 근거"].forEach((h, i) => {
    txt(s, h, { x: cx[i], y: 2.05, w: cwid[i], h: 0.3, fontSize: 11, bold: true, color: TEAL, objectName: `열 제목 ${h}` });
  });
  s.addShape(pres.shapes.LINE, { x: CX, y: 2.38, w: CW, h: 0, line: { color: LINE, width: 0.75 }, objectName: "열 제목 구분선" });

  const goals = [
    {
      lab: "목표 1", sub: "참가업체",
      big: "120개사 · 200부스",
      what: "고프코어 패션 브랜드 유치 (신진 K-브랜드 60개사 이상)\n→ 2029년 3회차 300개사(2.5배)로 성장",
      how: "부스 계약서 기준 업체 수·부스 수와 카테고리 구성비\n→ 2027.8월 모집 마감 시점 확인, 회차별 비교",
      why: "서울패션위크 트레이드쇼 130개 브랜드, 캠핑앤피크닉페어 116개사 → 단일 카테고리 첫 회에 달성 가능한 규모. 3회차 목표는 SPOEX(300개사) 수준",
    },
    {
      lab: "목표 2", sub: "거래 성과",
      big: "수주상담 700만 달러",
      what: "사전 인증 바이어 300명(해외 100명)\n1:1 매칭 상담 1,200건(브랜드당 10건)",
      how: "바이어 등록·자격심사 DB, 매칭 시스템 상담 로그, 상담일지 집계\n→ 폐막 3개월 후 계약 전환율 추적",
      why: "서울패션위크 트레이드쇼 바이어 300명·수주상담 671만 달러(2025 F/W), 무신사 도쿄 쇼룸 해외 바이어 200명+. 거래 성과가 없으면 참가업체가 재참가하지 않아 전시회가 존속할 수 없음",
    },
    {
      lab: "목표 3", sub: "관심 고객 경험",
      big: "사전등록 2만 명",
      what: "Test Lab(방수 샤워부스·얼음 바닥) 체험률 50% 이상\n참가업체 '고객 반응' 만족도 4.0/5 이상",
      how: "관심사 프로필 사전등록, 체험존 QR 체크인 로그, 폐막 후 참가업체 설문\n→ 브랜드별 고객 반응 리포트 제공",
      why: "인터뷰: \"고객의 반응이겠죠\", \"관심 깊게 들어주는 고객들이 필요\". FIELDSTYLE(일본) 2일 4.8만 명, SPOEX 4일 4.7만 명 → 2일 2만 명은 보수적",
    },
  ];
  goals.forEach((g, i) => {
    const y = 2.5 + i * 1.47;
    label(s, g.lab, y + 0.02);
    txt(s, g.sub, { x: 0.67, y: y + 0.4, w: 2.85, h: 0.3, fontSize: 12, bold: true, color: TEAL, objectName: `목표 분류 ${i + 1}` });
    rbox(s, cx[0], y, cwid[0], 1.33, TINT, `목표 ${i + 1} 내용 배경`);
    txt(s, [
      { text: g.big, options: { fontSize: 15, bold: true, color: NAVY, breakLine: true } },
      { text: g.what, options: { fontSize: 9.5, color: BODY } },
    ], { x: cx[0] + 0.12, y: y + 0.08, w: cwid[0] - 0.24, h: 1.2, paraSpaceAfter: 3, objectName: `목표 ${i + 1} 내용` });
    rbox(s, cx[1], y, cwid[1], 1.33, LIGHT, `목표 ${i + 1} 지표 배경`);
    txt(s, g.how, { x: cx[1] + 0.12, y: y + 0.1, w: cwid[1] - 0.24, h: 1.15, fontSize: 9.5, color: BODY, objectName: `목표 ${i + 1} 지표` });
    rbox(s, cx[2], y, cwid[2], 1.33, WHITE, `목표 ${i + 1} 근거 배경`, LINE);
    txt(s, g.why, { x: cx[2] + 0.12, y: y + 0.1, w: cwid[2] - 0.24, h: 1.15, fontSize: 9.5, color: BODY, objectName: `목표 ${i + 1} 근거` });
  });
}

// ─────────────────────────────────────────────────────────────
// 4/6 산업 밸류체인 지도
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    4,
    "산업 밸류체인 지도",
    "고프코어 패션 산업의 흐름에서 전시회가 다룰 범위",
    "출처: 더구루(2026)·머니투데이(2018, 영원무역 OEM·노스페이스 유통) · 유안타증권(2024, 감성코퍼레이션) · 뉴데일리(2025.9.11) · Houyhnhnm·END.(케일) · 바이라인네트워크(2023, 무신사 로지스틱스) · 이투데이(2025, CJ대한통운 더 풀필) · 스마트투데이(2025, 프리뷰 인 서울) · 데일리안(FITI) · 산에이(2025, GO OUT KOREA)",
    [
      "고프코어 패션 산업은 다섯 단계로 흐르고, 그 사이를 물류와 마케팅 서비스가 잇습니다. 위쪽 회색 화살표는 제품의 흐름, 아래쪽 주황 화살표는 돈의 흐름입니다.",
      "① 소재·부자재: 고어텍스, 폴라텍 같은 기능성 원단과 효성티앤씨·코오롱인더스트리 같은 국내 소재사, YKK 지퍼와 비브람 밑창입니다. ② 생산: 영원무역 같은 OEM 기업입니다. 영원무역은 OEM과 동시에 노스페이스의 국내 유통까지 맡아 ②와 ③을 겸합니다. ③ 브랜드·기획: 아크테릭스·살로몬·마무트 같은 해외 브랜드, 노스페이스·스노우피크어패럴, 그리고 케일·산산기어·제로그램 같은 K-고프코어 브랜드입니다. ④ 유통: 무신사·29CM 같은 플랫폼, 백화점, 국내외 편집숍입니다. ⑤ 소비자: 2030 도시 소비자, 하이킹·러닝 크루, 크림 같은 리세일 시장입니다.",
      "단계 사이에는 무신사 로지스틱스나 CJ대한통운 '더 풀필' 같은 패션 풀필먼트, 인플루언서·모델과 PR 에이전시 같은 마케팅 서비스가 있고, 그 바깥을 시험기관·미디어·협회·정부가 받치고 있습니다.",
      "[범위] 핵심 범위는 ③ 브랜드와 ④ 바이어 사이의 거래(트레이드 데이), ③과 ⑤ 소비자 사이의 경험(퍼블릭 랩 데이)입니다. ① 소재는 스폰서형 소재 랩, 물류·마케팅은 서비스관으로 부분 포함하고, ② 생산은 제외합니다. 고프코어의 가격 프리미엄이 브랜드 스토리·기능 검증·유통 입점에서 결정되고, 소재·OEM 거래는 섬유산업연합회의 '프리뷰 인 서울'이 이미 다루고 있으며, 물류·마케팅사는 신진 브랜드의 해외 진출을 돕는 조력자이기 때문입니다.",
    ].join("\n\n")
  );

  label(s, "밸류체인 지도 작성", 2.02, 0.35);
  txt(s, [
    { text: "제품 ", options: { bold: true, color: MUTED } },
    { text: "→ 소재에서 소비자로,  ", options: { color: BODY } },
    { text: "돈 ", options: { bold: true, color: ORANGE } },
    { text: "← 소비자에서 소재로 흐른다.  ", options: { color: BODY } },
    { text: "점선 = 전시회가 다룰 범위", options: { bold: true, color: TEAL } },
  ], { x: CX, y: 2.05, w: CW, h: 0.32, fontSize: 11, valign: "middle", objectName: "지도 범례" });

  // 5단계 칼럼
  const stages = [
    { t: "① 소재 · 부자재", items: ["고어텍스(W. L. Gore)", "폴라텍", "효성티앤씨 · 코오롱인더스트리", "YKK(지퍼) · 비브람(밑창)"] },
    { t: "② 생산 (OEM/ODM)", items: ["영원무역 (룰루레몬 등 OEM)", "국내외 봉제 · 신발 공장", "※ 영원무역은 노스페이스 국내 유통(③)도 겸함"] },
    { t: "③ 브랜드 · 기획", items: ["해외: 아크테릭스 · 살로몬 (아머스포츠), 마무트, 살레와", "국내: 노스페이스(영원아웃도어), 스노우피크어패럴(감성코퍼레이션)", "K-고프코어: 케일 · 산산기어 · 제로그램"] },
    { t: "④ 유통 (바이어)", items: ["플랫폼: 무신사 · 29CM · KREAM", "백화점: 현대 · 신세계 · 롯데", "편집숍: 웍스아웃 / 1LDK · 빔즈(일본) / END.(영국)"] },
    { t: "⑤ 소비자 · 커뮤니티", items: ["2030 도시 고프코어 소비자", "하이킹 · 러닝 크루", "리세일: KREAM · 후루츠패밀리"] },
  ];
  const sx = 0.67, sw = 2.2, sg = 0.245, top = 2.86, hh = 0.42, bodyH = 1.15;
  const fullW = 5 * sw + 4 * sg;
  // 범위 표시(점선)
  s.addShape(pres.shapes.RECTANGLE, {
    x: sx + 2 * (sw + sg) - 0.08, y: top - 0.14, w: 3 * sw + 2 * sg + 0.16, h: hh + bodyH + 0.28,
    fill: { color: TINT }, line: { color: TEAL, width: 1.5, dashType: "dash" }, objectName: "전시 핵심 범위",
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: sx - 0.06, y: top - 0.1, w: sw + 0.12, h: hh + bodyH + 0.2,
    fill: { color: WHITE, transparency: 100 }, line: { color: TEAL, width: 1, dashType: "sysDot" }, objectName: "소재 랩 부분 범위",
  });
  txt(s, "GFF SEOUL 핵심 범위 (트레이드 데이 ③↔④ · 퍼블릭 랩 데이 ③↔⑤)", {
    x: sx + 2 * (sw + sg), y: top - 0.42, w: 3 * sw + 2 * sg, h: 0.26, fontSize: 9.5, bold: true, color: TEAL, align: "center", valign: "middle", objectName: "핵심 범위 라벨",
  });
  txt(s, "부분 포함: 스폰서형 소재 랩", {
    x: sx, y: top - 0.42, w: sw, h: 0.26, fontSize: 9.5, bold: true, color: TEAL, align: "center", valign: "middle", objectName: "소재 랩 라벨",
  });
  txt(s, "제외", {
    x: sx + sw + sg, y: top - 0.42, w: sw, h: 0.26, fontSize: 9.5, bold: true, color: MUTED, align: "center", valign: "middle", objectName: "생산 제외 라벨",
  });
  const flows = ["원단·부자재 공급", "완제품 납품", "수주 · 매입 · 위탁", "판매 · 체험"];
  stages.forEach((st, i) => {
    const x = sx + i * (sw + sg);
    const excluded = i === 1;
    box(s, x, top, sw, hh, excluded ? "94A3B8" : NAVY, `단계 머리 ${i + 1}`);
    txt(s, st.t, { x, y: top, w: sw, h: hh, fontSize: 11.5, bold: true, color: WHITE, align: "center", valign: "middle", objectName: `단계 이름 ${i + 1}` });
    box(s, x, top + hh, sw, bodyH, WHITE, `단계 본문 ${i + 1}`, LINE);
    txt(s, st.items.map((it, k) => ({ text: it, options: { bullet: { indent: 10 }, breakLine: k < st.items.length - 1, color: it.startsWith("※") ? MUTED : BODY } })), {
      x: x + 0.06, y: top + hh + 0.05, w: sw - 0.12, h: bodyH - 0.08, fontSize: 8.5, paraSpaceAfter: 2, objectName: `단계 기업 ${i + 1}`,
    });
    if (i < 4) {
      arrow(s, x + sw + 0.02, top + hh / 2, sg - 0.04, "94A3B8", `제품 흐름 ${i + 1}`);
    }
  });
  // 단계 사이 거래 관계(제품) 라벨
  flows.forEach((f, i) => {
    const x = sx + (i + 1) * (sw + sg) - sg / 2;
    txt(s, `→ ${f}`, { x: x - 0.7, y: top + hh + bodyH + 0.15, w: 1.4, h: 0.2, fontSize: 8, color: MUTED, align: "center", valign: "middle", objectName: `거래 관계 ${i + 1}` });
  });
  // 돈의 흐름
  const my = top + hh + bodyH + 0.45;
  arrow(s, sx + 0.1, my, fullW - 0.2, ORANGE, "돈의 흐름", true, 2);
  txt(s, "₩ 돈의 흐름(⑤→①):  소비자 결제 → 유통 수수료·마진 → 브랜드 매입대금 → 생산비 → 원단대금", {
    x: sx + 2.0, y: my + 0.04, w: 8.0, h: 0.24, fontSize: 9, bold: true, color: ORANGE, align: "center", valign: "middle", objectName: "돈의 흐름 라벨",
  });
  // 유통 지원 서비스 + 지원 생태계
  const gy = my + 0.33;
  const cg = 0.1;
  const cwid = (fullW - 5 * cg) / 6;
  txt(s, "유통 지원 서비스 · 부분 포함(서비스관)", {
    x: sx, y: gy, w: 2 * cwid + cg, h: 0.2, fontSize: 8.5, bold: true, color: TEAL, valign: "middle", objectName: "서비스 그룹 라벨",
  });
  txt(s, "지원 생태계 (6장 이해관계자)", {
    x: sx + 2 * (cwid + cg), y: gy, w: 4 * cwid + 3 * cg, h: 0.2, fontSize: 8.5, bold: true, color: MUTED, valign: "middle", objectName: "생태계 그룹 라벨",
  });
  const chips = [
    ["물류 · 풀필먼트", "CJ대한통운(더 풀필) · 무신사 로지스틱스", true],
    ["마케팅 · 홍보", "인플루언서 · 모델, 패션 PR 에이전시 외", true],
    ["시험 · 인증", "FITI시험연구원 (인공강우·써멀마네킨)", false],
    ["미디어", "GO OUT KOREA · 패션비즈 · 어패럴뉴스", false],
    ["협회", "한국아웃도어스포츠산업협회 · 섬유산업연합회", false],
    ["정책 · 공공", "산업통상부 · KOTRA · 산림청", false],
  ];
  const cy = gy + 0.22;
  chips.forEach((c, i) => {
    const x = sx + i * (cwid + cg);
    rbox(s, x, cy, cwid, 0.5, c[2] ? TINT : LIGHT, `지원 칩 ${i + 1}`, c[2] ? TEAL : undefined);
    txt(s, [
      { text: c[0], options: { bold: true, color: c[2] ? TEAL : NAVY, breakLine: true } },
      { text: c[1], options: { color: BODY } },
    ], { x: x + 0.08, y: cy, w: cwid - 0.16, h: 0.5, fontSize: 8, valign: "middle", objectName: `지원 칩 문구 ${i + 1}` });
  });

  label(s, "전시회가 다룰 범위", 6.08);
  txt(s, [
    { text: "포함 ", options: { bold: true, color: TEAL } },
    { text: "③ 브랜드 ↔ ④ 바이어(수주) + ③ 브랜드 ↔ ⑤ 관심 고객(체험)   ", options: { color: NAVY, bold: true } },
    { text: "부분 포함 ", options: { bold: true, color: TEAL } },
    { text: "① 소재 랩 · 물류/마케팅 서비스관   ", options: { color: NAVY, bold: true } },
    { text: "제외 ", options: { bold: true, color: MUTED } },
    { text: "② 생산(OEM)", options: { color: NAVY, bold: true, breakLine: true } },
    { text: "이유  (1) 고프코어의 가격 프리미엄은 브랜드 스토리·기능 검증·유통 입점(③~⑤)에서 결정  (2) 소재·OEM 거래는 섬유산업연합회 '프리뷰 인 서울'(코엑스, 약 500개사)이 이미 담당 → 중복 회피  (3) 물류·마케팅사는 신진 브랜드의 해외 진출을 돕는 조력자라 서비스관으로만 참여  (4) 인터뷰: 브랜드가 원하는 성과는 관심 고객의 반응", options: { color: BODY } },
  ], { x: CX, y: 6.06, w: CW, h: 0.8, fontSize: 9, paraSpaceAfter: 2, objectName: "범위 설명" });
}

// ─────────────────────────────────────────────────────────────
// 5/6 참가업체 · 바이어 연결표
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    5,
    "참가업체 · 바이어 연결표",
    "누가 무엇을 제공하고, 누가 왜 구매하는가?",
    "출처: 뉴데일리(2025.9.11) · 한국경제(2025.11.21) · Houyhnhnm·END.(케일) · 무신사 뉴스룸(2024.7.17, 도쿄 쇼룸) · 헤럴드경제(2025.12.30, 무신사 회원 1,600만) · 스마트투데이(2024, 코오롱스포츠 이토추·센트럴 유통 계약) · 파이낸셜뉴스(2025.6.10, 무신사 해외 주문 풀필먼트) · 이투데이(2025, CJ대한통운 '더 풀필') · 참가업체 측 인터뷰(2026.10.17)",
    [
      "[참가업체] 다섯 그룹입니다. A는 아크테릭스·살로몬·마무트·살레와 같은 해외 프리미엄 브랜드의 국내 법인이나 수입사, B는 케일·산산기어·제로그램 같은 K-고프코어 브랜드, C는 노스페이스·코오롱스포츠·스노우피크어패럴 같은 국내 대형사의 고프코어 라인, D는 고어텍스·폴라텍·효성티앤씨 같은 기능성 소재사, E는 CJ대한통운 '더 풀필'·무신사 로지스틱스 같은 물류·풀필먼트와 마케팅 대행사입니다. D와 E는 브랜드를 고객으로 하는 참가업체입니다.",
      "[바이어] 무신사·29CM·크림 같은 온라인 플랫폼 MD, 백화점 아웃도어 바이어, 웍스아웃이나 일본 1LDK·빔즈, 영국 END. 같은 국내외 편집숍, 이토추·센트럴 같은 해외 총판, 그리고 퍼블릭 랩 데이의 관심 소비자입니다.",
      "[연결] 참가업체마다 원하는 상대가 다릅니다. 인터뷰한 마무트 유통 담당자는 바이어 미팅이나 현장판매는 의미가 적고, 장비의 장점을 관심 깊게 들어줄 고객이 필요하다고 했습니다. 그래서 A그룹은 관심 고객과, 판로가 필요한 B그룹은 플랫폼·편집숍 바이어와, C그룹은 해외 총판과, D·E그룹은 참가 브랜드와 연결합니다. 교수님이 예로 드신 '유통 물류를 바꿔 마진을 늘리는' 거래가 E그룹입니다.",
    ].join("\n\n")
  );

  label(s, "참가업체 카테고리", 2.1);
  const exh = [
    ["A", "해외 프리미엄 아웃도어", "국내 법인·수입유통", "아크테릭스 · 살로몬 · 마무트 · 살레와(에스엠케이컴퍼니)"],
    ["B", "K-고프코어 브랜드", "신진·독립 브랜드", "케일(CAYL) · 산산기어 · 제로그램"],
    ["C", "국내 대형사 고프코어 라인", "아웃도어 대기업", "노스페이스(영원아웃도어) · 코오롱스포츠 · 스노우피크어패럴"],
    ["D", "기능성 소재 (소재 랩)", "스폰서형 참가", "고어텍스 · 폴라텍 · 효성티앤씨"],
    ["E", "성장 서비스 (서비스관)", "물류 · 마케팅", "CJ대한통운(더 풀필) · 무신사 로지스틱스 · 마케팅 대행사 외"],
  ];
  const ew = (CW - 4 * 0.1) / 5;
  exh.forEach((e, i) => {
    const x = CX + i * (ew + 0.1);
    rbox(s, x, 2.05, ew, 1.15, i >= 3 ? LIGHT : TINT, `참가업체 ${e[0]} 배경`);
    txt(s, [
      { text: `${e[0]}  ${e[1]}`, options: { bold: true, color: NAVY, fontSize: 9.5, breakLine: true } },
      { text: e[2], options: { color: TEAL, fontSize: 8.5, bold: true, breakLine: true } },
      { text: e[3], options: { color: BODY, fontSize: 8.5 } },
    ], { x: x + 0.08, y: 2.09, w: ew - 0.16, h: 1.07, paraSpaceAfter: 2, objectName: `참가업체 ${e[0]}` });
  });

  label(s, "바이어 카테고리", 3.38);
  const buy = [
    ["①", "온라인 패션 플랫폼 MD", "무신사(회원 1,600만) · 29CM · KREAM"],
    ["②", "백화점 아웃도어 바이어", "현대 · 신세계 · 롯데백화점"],
    ["③", "국내외 편집숍 바이어", "웍스아웃 / 1LDK · 빔즈 · 유나이티드애로우즈 / END."],
    ["④", "해외 총판 · 종합상사", "이토추상사(일본) · 센트럴그룹(태국)"],
    ["⑤", "관심 소비자 (퍼블릭)", "2030 하이킹 · 러닝 크루, 고프코어 커뮤니티"],
  ];
  const bw = (CW - 4 * 0.1) / 5;
  buy.forEach((b, i) => {
    const x = CX + i * (bw + 0.1);
    rbox(s, x, 3.3, bw, 0.98, i === 4 ? ORANGE_TINT : LIGHT, `바이어 ${b[0]} 배경`);
    txt(s, [
      { text: `${b[0]} ${b[1]}`, options: { bold: true, color: i === 4 ? ORANGE : NAVY, fontSize: 9.5, breakLine: true } },
      { text: b[2], options: { color: BODY, fontSize: 8.5 } },
    ], { x: x + 0.08, y: 3.34, w: bw - 0.16, h: 0.9, paraSpaceAfter: 2, objectName: `바이어 ${b[0]}` });
  });

  label(s, "거래 연결 관계", 4.45);
  txt(s, "참가업체 유형 → 제공 품목 → 바이어 유형 → 구매 이유", { x: 0.67, y: 4.8, w: 2.85, h: 0.5, fontSize: 9.5, color: MUTED, objectName: "연결 안내" });
  const head = ["참가업체", "제공 품목", "바이어", "구매(참여) 이유"].map((h) => ({ text: h, options: { bold: true, color: WHITE, fill: { color: NAVY } } }));
  const conn = [
    ["A 해외 프리미엄", "신제품 기능 시연, 브랜드 스토리", "⑤ 관심 소비자, ② 백화점", "고가 제품의 가치를 깊게 들어줄 고객 접점 (인터뷰: 현장판매·투자 유치보다 브랜드 홍보)"],
    ["B K-고프코어", "2028 S/S 시즌 컬렉션 수주", "① 플랫폼, ③ 편집숍", "트렌드 감도와 가격 경쟁력을 갖춘 K-브랜드 소싱 (무신사 도쿄 쇼룸 주문 3배)"],
    ["C 국내 대형사", "고프코어 라인, 해외 유통권", "④ 해외 총판, ② 백화점", "검증된 한국 브랜드의 아시아 유통 확대 (코오롱스포츠-이토추·센트럴 계약)"],
    ["D 기능성 소재", "기능성 원단, 성분 브랜딩", "A·B·C 브랜드 기획·소싱팀", "차기 시즌 소재 선정, 소비자에게 보여줄 기능 근거 확보"],
    ["E 성장 서비스", "풀필먼트·해외 배송, 홍보 대행", "A·B 참가 브랜드 (특히 신진)", "해외 주문·재고·홍보를 직접 감당하기 어려워 외주로 비용 절감·마진 개선 (무신사도 해외 주문 풀필먼트 준비)"],
  ].map((r) => [
    { text: r[0], options: { bold: true, color: NAVY } },
    { text: r[1], options: { color: BODY } },
    { text: r[2], options: { bold: true, color: TEAL } },
    { text: r[3], options: { color: BODY } },
  ]);
  s.addTable([head, ...conn], {
    x: CX, y: 4.42, w: CW, colW: [1.35, 2.05, 1.85, 3.7], rowH: [0.28, 0.42, 0.42, 0.42, 0.42, 0.42], fontFace: FONT, fontSize: 8.5, margin: [2, 5, 2, 5], valign: "middle",
    border: { type: "solid", pt: 0.5, color: LINE }, objectName: "거래 연결표",
  });
}

// ─────────────────────────────────────────────────────────────
// 6/6 주요 이해관계자 · 역할
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    6,
    "주요 이해관계자 · 역할",
    "누구와 협력하며, 각 주체는 무엇을 얻는가?",
    "출처: 산업통상부 「전시산업 발전 로드맵 2030」(2026.10.14) · 서울 관광·MICE기업 지원센터 공고(2026, 서울시 MICE산업 지원 전시회 분야) · 쿠키뉴스(2019.4.17, 한국아웃도어스포츠산업협회 2014년 설립) · 스마트투데이(2025, 프리뷰 인 서울 / 2025.10, 코오롱스포츠·산림청·한국등산트레킹지원센터 동서트레일 협약) · 데일리안(FITI 시험설비) · 산에이(2025, GO OUT KOREA 월 2만 부·인스타그램 7.4만) · 별첨 「전화 검증 기록」",
    [
      "이해관계자는 정부·공공, 협회, 시험연구기관, 미디어, 베뉴·플랫폼으로 나눴습니다. 교수님 말씀처럼 각 주체가 '왜 우리 배에 타야 하는지', 즉 얻는 이익을 함께 적었습니다.",
      "산업통상부는 이달 발표한 로드맵 2030의 융합형 전시 확대 성과를, KOTRA는 수출 상담 실적을, 서울관광재단은 외국인 MICE 방문객을 얻습니다. 한국아웃도어스포츠산업협회는 회원사 판로를, 섬유산업연합회는 프리뷰 인 서울과 연계한 소재 수요를 얻습니다. FITI시험연구원은 Test Lab의 방수·보온 시험을 자문하고 시험 고객을 얻습니다. 미디어 파트너인 GO OUT KOREA는 업계에 대한 영향력을 우리와 나누고 콘텐츠를 얻습니다. 협회와 산업 미디어는 회원사와 업계를 꽉 쥐고 있어 참가업체 모집에 가장 강한 파트너입니다.",
      "[별첨] 참가업체 측 검증은 아웃도어 브랜드 유통·판매 담당자 인터뷰(2026.10.17)로 했고, 그 결과로 Test Lab 도입, '고객 반응' KPI, 인플루언서·모델 콘텐츠 지원을 기획에 반영했습니다. 바이어 측 통화는 질문지와 대상 목록을 별첨에 정리했고 진행 예정입니다.",
    ].join("\n\n")
  );

  label(s, "주요 이해관계자", 2.08);
  const cats = [
    ["정부·공공", "산업통상부 · KOTRA · 서울관광재단 · 산림청"],
    ["협회", "한국아웃도어스포츠산업협회 · 한국섬유산업연합회"],
    ["연구·시험", "FITI시험연구원"],
    ["미디어", "GO OUT KOREA · 패션비즈"],
    ["베뉴·플랫폼", "코엑스 · 무신사"],
  ];
  const catW = [2.45, 2.35, 1.2, 1.5, 1.05];
  let cxp = CX;
  cats.forEach((c, i) => {
    rbox(s, cxp, 2.03, catW[i], 0.5, TINT, `이해관계자 분류 ${i + 1}`);
    txt(s, [
      { text: c[0], options: { bold: true, color: TEAL, fontSize: 8.5, breakLine: true } },
      { text: c[1], options: { color: NAVY, fontSize: 8.5, bold: true } },
    ], { x: cxp + 0.06, y: 2.05, w: catW[i] - 0.12, h: 0.46, valign: "middle", objectName: `이해관계자 분류 문구 ${i + 1}` });
    cxp += catW[i] + 0.1;
  });

  label(s, "역할과 참여 이유", 2.7);
  txt(s, "[기관명] / [기대 역할·기여] / [참여로 얻는 이익]", { x: 0.67, y: 3.05, w: 2.85, h: 0.5, fontSize: 9.5, color: MUTED, objectName: "역할 안내" });
  const head = ["기관명", "기대 역할 · 기여", "참여로 얻는 이익"].map((h) => ({ text: h, options: { bold: true, color: WHITE, fill: { color: NAVY } } }));
  const sh = [
    ["산업통상부", "후원 명칭, 전시회 지원사업 연계", "로드맵 2030 '산업·문화 융합형 전시 20%' 성과, 섬유패션 수출"],
    ["KOTRA", "해외 바이어 발굴·초청, 수출상담회 공동 운영", "수출 상담·계약 실적(기관 KPI)"],
    ["서울관광재단", "서울시 MICE 산업 지원(전시회 분야), 해외 홍보 채널", "외국인 MICE 방문객·서울 소비 증대"],
    ["한국아웃도어스포츠산업협회", "회원사 공동관 모집, 업계 의견 수렴", "회원사 판로 확대, 협회 위상 강화"],
    ["한국섬유산업연합회", "프리뷰 인 서울 연계, 소재 랩 구성", "기능성 소재의 브랜드 수요 발굴"],
    ["FITI시험연구원", "Test Lab 시험 자문(인공강우·써멀마네킨), 어워드 기능 심사", "시험·인증 고객 확보, 기관 신뢰도 홍보"],
    ["산림청 (한국등산·트레킹지원센터)", "숲길·안전 산행 캠페인관 (선례: 코오롱스포츠와 동서트레일 협약)", "2030 등산 인구 대상 숲길 정책 홍보"],
    ["GO OUT KOREA · 패션비즈", "미디어 파트너, 인플루언서·모델 섭외, 어워드 공동 주관", "콘텐츠·광고 수익, 업계 영향력 강화"],
    ["코엑스 / 무신사", "전시장·옥외 미디어 / 신진 브랜드 발굴 스폰서", "대관 수익·신규 전시 / 입점 브랜드·고객 데이터"],
  ].map((r) => [
    { text: r[0], options: { bold: true, color: NAVY } },
    { text: r[1], options: { color: BODY } },
    { text: r[2], options: { color: BODY } },
  ]);
  s.addTable([head, ...sh], {
    x: CX, y: 2.66, w: CW, colW: [2.45, 3.4, 3.1], rowH: 0.3, fontFace: FONT, fontSize: 8.5, margin: [1, 5, 1, 5], valign: "middle",
    border: { type: "solid", pt: 0.5, color: LINE }, objectName: "이해관계자 역할표",
  });

  label(s, "별첨 제출: 전화 검증 기록", 5.85, 0.6);
  const vw = (CW - 0.12) / 2;
  rbox(s, CX, 5.83, vw, 1.0, TINT, "검증 참가업체 배경");
  txt(s, [
    { text: "참가업체 측 · 완료", options: { bold: true, color: TEAL, fontSize: 10, breakLine: true } },
    { text: "아웃도어 브랜드 유통·판매 담당자(마무트 종로점·제로그램 등 운영), 2026.10.17, 약 5분", options: { color: NAVY, bold: true, fontSize: 9, breakLine: true } },
    { text: "→ 기획 수정: Test Lab(샤워부스·얼음 바닥) 도입, '고객 반응' KPI, 인플루언서·모델 콘텐츠 지원", options: { color: BODY, fontSize: 9 } },
  ], { x: CX + 0.12, y: 5.86, w: vw - 0.24, h: 0.94, paraSpaceAfter: 2, objectName: "검증 참가업체" });
  rbox(s, CX + vw + 0.12, 5.83, vw, 1.0, LIGHT, "검증 바이어 배경");
  txt(s, [
    { text: "바이어 측 · 진행 예정", options: { bold: true, color: ORANGE, fontSize: 10, breakLine: true } },
    { text: "온라인 플랫폼 MD · 편집숍 · 백화점 아웃도어 바이어 대상", options: { color: NAVY, bold: true, fontSize: 9, breakLine: true } },
    { text: "최소 1곳 이상 통화 필수 · 질문지·시도 기록표는 별첨 2 (연결 실패도 시도 내역으로 기록)", options: { color: BODY, fontSize: 9 } },
  ], { x: CX + vw + 0.24, y: 5.86, w: vw - 0.24, h: 0.94, paraSpaceAfter: 2, objectName: "검증 바이어" });
}

// ─────────────────────────────────────────────────────────────
// 별첨 1/2 전화 검증 기록 — 참가업체 측
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    "별첨 1/2",
    "별첨 · 전화 검증 기록 (참가업체 측)",
    "아웃도어 브랜드 유통·판매 담당자에게 수요를 직접 확인하고 기획을 수정했다",
    "※ 인터뷰 원문: 녹취록(2026.10.17, 약 5분 12초, 녹음 동의). 큰따옴표 안은 녹취 원문 그대로, 나머지는 요약. 답변은 수업 발표용으로만 활용 후 폐기하기로 안내함. 전화번호는 제출본에만 직접 기입.",
    "참가업체 측 검증은 아웃도어 브랜드 유통·판매를 맡고 있는 손호영 님(마이기어 운영, 제로그램·아울렛·마무트 종로점 운영)과 진행했습니다. 처음 세운 가정 네 가지 중 세 가지가 틀렸고, 그 결과로 Test Lab, 관심도 KPI, 참가업체 목적별 분리, 콘텐츠 파트너 지원을 기획에 넣었습니다. 가장 중요한 발언은 성공 기준을 묻자 '고객의 반응이겠죠'라고 답한 것과, 현장 판매보다 장비의 장점을 관심 깊게 들어줄 고객이 필요하다고 한 부분입니다."
  );

  const info = [
    ["접촉 대상", "손호영 님 · 아웃도어 브랜드 유통·판매 담당 (마이기어 운영 / 제로그램·아울렛·마무트 종로점 운영)"],
    ["일시 · 방식", "2026. 10. 17(토) · 대면 인터뷰(녹음 동의) · 약 5분 12초"],
    ["전화번호", "( 제출본에 직접 기입 )"],
    ["결과", "연결 성공 · 가정 4개 중 3개 기각 → 기획 수정 4건"],
  ];
  const iw = [4.4, 3.2, 1.9, 2.18];
  let ix = 0.67;
  info.forEach((c, i) => {
    rbox(s, ix, 2.05, iw[i], 0.55, i === 3 ? NAVY : TINT, `접촉 정보 ${i + 1}`);
    txt(s, [
      { text: c[0], options: { bold: true, color: i === 3 ? "9FE0E6" : TEAL, fontSize: 8.5, breakLine: true } },
      { text: c[1], options: { bold: true, color: i === 3 ? WHITE : NAVY, fontSize: 9 } },
    ], { x: ix + 0.1, y: 2.07, w: iw[i] - 0.2, h: 0.51, valign: "middle", objectName: `접촉 정보 문구 ${i + 1}` });
    ix += iw[i] + 0.1;
  });

  // 사전 가정 → 결과
  txt(s, "사전 가정 → 검증 결과", { x: 0.67, y: 2.75, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: NAVY, objectName: "사전 가정 제목" });
  const hyps = [
    ["H1", "브랜드는 바이어 미팅·현장판매를 가장 중시할 것", "기각", "현장판매·고객 확보·투자 유치는 의미가 적고, 브랜드 홍보와 관심 고객이 중요"],
    ["H2", "부스비가 가장 큰 참가 장벽일 것", "부분", "부스비는 2만~5만 달러로 늘 책정해 옴. 장벽은 비용 대비 효과·공간·인플루언서 일정"],
    ["H3", "기존 코엑스·킨텍스 아웃도어 박람회로 충분할 것", "기각", "\"고객의 니즈가 다르기 때문에 저희는 참여를 안 하고 있습니다\""],
    ["H4", "일반 소비자(B2C)는 주요 고객이 아닐 것", "기각", "B2C 매출 비중 약 30%, 일반 고객을 매우 중요하게 생각"],
  ];
  hyps.forEach((h, i) => {
    const y = 3.1 + i * 0.94;
    rbox(s, 0.67, y, 3.8, 0.86, LIGHT, `가정 ${h[0]} 배경`);
    txt(s, [
      { text: `${h[0]}  ${h[1]}`, options: { bold: true, color: NAVY, fontSize: 9, breakLine: true } },
      { text: `${h[2]}  `, options: { bold: true, color: h[2] === "기각" ? ORANGE : TEAL, fontSize: 9 } },
      { text: h[3], options: { color: BODY, fontSize: 8.5 } },
    ], { x: 0.77, y: y + 0.04, w: 3.6, h: 0.8, paraSpaceAfter: 2, objectName: `가정 ${h[0]}` });
  });

  // 질문 · 답변
  txt(s, "질문 · 답변 요지", { x: 4.62, y: 2.75, w: 4.4, h: 0.3, fontSize: 12, bold: true, color: NAVY, objectName: "질문 답변 제목" });
  const qa = [
    ["Q1~2 고객층", "일반 소비자와 기업(B2B) 모두에 판매, B2C 매출 약 30%"],
    ["Q3 참여 조건", "트레킹·백패킹 상품을 아는 고객이 얼마나 오는지, 관심도가 어느 정도인지"],
    ["Q4 부스비", "국내 부스 10년 이상, 해외(유럽·미국) 약 2년에 1회, 부스비 2만~5만 달러"],
    ["Q5 현장 시연", "고어텍스 방수를 보여줄 샤워부스, 냉기 차단을 보여줄 얼음 바닥(매트)"],
    ["Q6 참여 장애", "인플루언서·모델 일정 조율, 공간 크기, 비용 대비 효과 부족"],
    ["Q7 성공 기준", "고객의 반응"],
    ["Q8 기대 효과", "투자·바이어·현장판매·고객 확보는 의미 적음, 브랜드 홍보가 목적"],
  ].map((r) => [
    { text: r[0], options: { bold: true, color: NAVY } },
    { text: r[1], options: { color: BODY } },
  ]);
  s.addTable(qa, {
    x: 4.62, y: 3.1, w: 4.45, colW: [1.15, 3.3], rowH: 0.375, fontFace: FONT, fontSize: 8.5, margin: [2, 5, 2, 5], valign: "middle",
    border: { type: "solid", pt: 0.5, color: LINE }, objectName: "질문 답변표",
  });
  rbox(s, 4.62, 5.85, 4.45, 1.0, NAVY, "핵심 발언 배경");
  txt(s, [
    { text: "핵심 발언 (녹취 원문)", options: { bold: true, color: "9FE0E6", fontSize: 9, breakLine: true } },
    { text: "\"고객의 반응이겠죠.\" (성공 기준)", options: { color: WHITE, bold: true, fontSize: 8.5, breakLine: true } },
    { text: "\"이 장비에 대한 좋은 점을 설명하는 것, 그걸 관심 깊게 들어주는 고객들이 필요하지, 현장에서 판매를 하거나 이런 거는 의미가 없고요.\"", options: { color: WHITE, fontSize: 8.5 } },
  ], { x: 4.72, y: 5.88, w: 4.25, h: 0.94, paraSpaceAfter: 2, valign: "middle", objectName: "핵심 발언" });

  // 기획 수정 · 추가 확인
  txt(s, "기획 수정 (반영 위치)", { x: 9.22, y: 2.75, w: 3.43, h: 0.3, fontSize: 12, bold: true, color: NAVY, objectName: "기획 수정 제목" });
  rbox(s, 9.22, 3.1, 3.43, 1.9, TINT, "기획 수정 배경");
  const fixes = [
    "공동 Test Lab(샤워부스·얼음 바닥)을 주최 측이 설치 → 브랜드별 시연 공간 부담 감소 (1·3장)",
    "관람객 '수'보다 '관심도': 관심사 사전등록·체험률·고객 반응 만족도를 KPI로 (3장)",
    "참가업체 목적별 분리: 프리미엄 수입 브랜드는 관심 고객 연결, 신진 브랜드는 바이어 수주 (5장)",
    "인플루언서·모델 섭외를 미디어 파트너가 지원 (6장)",
  ];
  txt(s, fixes.map((f, k) => ({ text: f, options: { bullet: { type: "number", indent: 14 }, breakLine: k < fixes.length - 1 } })), {
    x: 9.3, y: 3.15, w: 3.28, h: 1.8, fontSize: 8.5, color: NAVY, paraSpaceAfter: 3, objectName: "기획 수정",
  });
  txt(s, "통화 후 추가로 확인할 사항", { x: 9.22, y: 5.15, w: 3.43, h: 0.28, fontSize: 11, bold: true, color: NAVY, objectName: "추가 확인 제목" });
  const more = [
    "국내 전시 부스비 수용 범위(원화)·부스 규모",
    "트레이드 데이 / 퍼블릭 랩 데이 중 희망일",
    "제로그램 등 취급 브랜드 공동 참가 가능 여부",
    "9월 말~10월 초 일정의 F/W 입고 시점 적합성",
  ];
  txt(s, more.map((m, k) => ({ text: m, options: { bullet: { indent: 10 }, breakLine: k < more.length - 1 } })), {
    x: 9.22, y: 5.45, w: 3.43, h: 1.2, fontSize: 8.5, color: BODY, paraSpaceAfter: 2, objectName: "추가 확인",
  });
}

// ─────────────────────────────────────────────────────────────
// 별첨 2/2 전화 검증 기록 — 바이어 측 (질문지 · 시도 기록표)
// ─────────────────────────────────────────────────────────────
{
  const s = frame(
    "별첨 2/2",
    "별첨 · 전화 검증 기록 (바이어 측)",
    "바이어 측 사전 가정과 통화 질문지, 시도 기록표 — 통화 후 결과 칸을 채운다",
    "※ 결과 표기: ● 연결 성공 / ○ 부재·재시도 / ✕ 거절·연결 실패. 연결에 실패한 시도도 지우지 않고 시도 내역으로 남긴다. 해외 바이어는 이메일·DM 시도도 함께 기록.",
    "바이어 측은 아직 통화 전입니다. 온라인 플랫폼 MD, 국내 편집숍, 백화점 아웃도어 바이어, 일본 편집숍까지 다섯 곳을 대상으로 정했고, 확인할 가정은 세 가지입니다. 통화 결과는 오른쪽 표에 바로 적고, 기획을 바꾼 내용은 마지막 칸에 남깁니다."
  );

  txt(s, "사전 가정 (바이어 측)", { x: 0.67, y: 2.05, w: 4.3, h: 0.3, fontSize: 12, bold: true, color: NAVY, objectName: "바이어 가정 제목" });
  const bh = [
    "B1  국내 플랫폼 MD는 신진 고프코어 브랜드를 한 번에 볼 소싱 창구가 부족하다",
    "B2  해외 편집숍은 한국에서 여러 브랜드를 한 번에 보고 1:1 미팅이 잡히면 출장 온다",
    "B3  바이어는 방수·보온 같은 기능 검증 데이터를 구매 판단에 쓴다",
  ];
  rbox(s, 0.67, 2.38, 4.3, 1.2, TINT, "바이어 가정 배경");
  txt(s, bh.map((b, k) => ({ text: b, options: { breakLine: k < bh.length - 1 } })), {
    x: 0.77, y: 2.43, w: 4.1, h: 1.1, fontSize: 9, bold: true, color: NAVY, paraSpaceAfter: 4, objectName: "바이어 가정",
  });

  txt(s, "통화 질문지", { x: 0.67, y: 3.7, w: 4.3, h: 0.3, fontSize: 12, bold: true, color: NAVY, objectName: "질문지 제목" });
  const qs = [
    "신규 아웃도어·고프코어 브랜드는 주로 어떤 경로로 발굴하나요?",
    "차기 시즌 바이잉은 1년에 몇 번, 언제 하나요? (9월 말~10월 초 적합성)",
    "고프코어 브랜드 120개가 모이고 1:1 사전 매칭을 해 준다면 참관할 의향이 있나요?",
    "구매 판단에서 기능(방수·보온) 검증 데이터는 얼마나 중요한가요?",
    "현장에서 꼭 보고 싶은 카테고리·브랜드는? (의류·신발·가방)",
    "참관을 막는 요인은 무엇인가요? (일정·출장비·브랜드 수준)",
    "(해외) 숙박·통역 지원이 출장 결정에 영향을 주나요?",
  ];
  txt(s, qs.map((q, k) => ({ text: q, options: { bullet: { type: "number", indent: 14 }, breakLine: k < qs.length - 1 } })), {
    x: 0.67, y: 4.02, w: 4.3, h: 1.95, fontSize: 9, color: BODY, paraSpaceAfter: 3, objectName: "질문지",
  });
  rbox(s, 0.67, 6.02, 4.3, 0.82, LIGHT, "오프닝 배경");
  txt(s, [
    { text: "오프닝  ", options: { bold: true, color: TEAL } },
    { text: "\"안녕하세요, 한림대학교 MICE 전공 학생 ○○○입니다. 수업 과제로 '고프코어 패션 페어 서울'을 기획하고 있어 바이어 관점의 의견을 3분만 여쭙고 싶습니다. 답변은 수업 발표용으로만 쓰고 폐기합니다. 녹음해도 될까요?\"", options: { color: BODY } },
  ], { x: 0.77, y: 6.05, w: 4.1, h: 0.76, fontSize: 8.5, valign: "middle", objectName: "오프닝 스크립트" });

  txt(s, "통화 대상 · 시도 기록표", { x: 5.12, y: 2.05, w: 7.5, h: 0.3, fontSize: 12, bold: true, color: NAVY, objectName: "시도 기록 제목" });
  const head = ["No", "대상 (기관 · 직무)", "전화번호", "시도 일시", "결과", "주요 답변 · 기획 수정"].map((h) => ({ text: h, options: { bold: true, color: WHITE, fill: { color: NAVY } } }));
  const targets = [
    "무신사 · 스포츠/아웃도어 카테고리 MD",
    "29CM · 아웃도어 MD",
    "웍스아웃 · 바이어 (국내 편집숍)",
    "현대백화점 · 아웃도어 바이어",
    "1LDK(일본 편집숍) · 바이어 (이메일·DM)",
    "",
    "",
    "",
  ];
  const rows = targets.map((t, i) => [
    { text: String(i + 1), options: { color: MUTED, align: "center" } },
    { text: t, options: { color: NAVY, bold: !!t } },
    { text: "" }, { text: "" }, { text: "" }, { text: "" },
  ]);
  s.addTable([head, ...rows], {
    x: 5.12, y: 2.38, w: 7.53, colW: [0.4, 2.35, 1.15, 1.0, 0.6, 2.03], rowH: [0.3, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44], fontFace: FONT, fontSize: 8.5, margin: [2, 4, 2, 4], valign: "middle",
    border: { type: "solid", pt: 0.5, color: LINE }, objectName: "시도 기록표",
  });
  txt(s, "통화가 끝나면 6장 '별첨 제출' 칸의 바이어 측 상태를 '완료'로 바꾸고, 바뀐 가정(B1~B3)을 기획에 반영한다.", {
    x: 5.12, y: 6.36, w: 7.53, h: 0.34, fontSize: 9, bold: true, color: TEAL, valign: "middle", objectName: "기록 후 할 일",
  });
}

pres.writeFile({ fileName: OUT }).then((f) => console.log("written", f));
