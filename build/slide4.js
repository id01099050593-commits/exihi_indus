// 4/6 산업 밸류체인 지도 — 지도 한 장에 7단계 흐름, 돈의 흐름, 지원 기능, 병목, 전시 범위를 모두 담는다.
const { C, lineWidth } = require("./lib");

module.exports = function slide4(pres, T, frame) {
  const s = frame(
    "4/6",
    "산업 밸류체인 지도",
    "고프코어 패션 산업의 가치 흐름과 전시회가 다룰 범위",
    [
      "출처: 코오롱 공식 블로그(네오벤트) · 어패럴뉴스·국제섬유신문(벤텍스·신한산업) · 파이낸셜뉴스(2024.2.1, 신한산업) · 프라우덴(태평양물산) · YKK코리아 · 삼성증권·한국투자증권(2025, 영원무역)",
      "뉴스토마토(2026)·innoforest(기도산업) · 한국경제(태광실업·창신INC) · 부산일보(트렉스타) · 연세춘추(2021 봉제업체 실태조사) · 경북매일(2026, 대구 봉제 맵) · 한국경제매거진(효성 regen) · 뉴데일리(휴비스 에코에버)",
      "아시아경제(2024.7.2, 노스페이스 로열티) · TENANT news(2025) · 무신사 뉴스룸(2022.10.13, 그레일즈) · 스마트투데이(2026.8, 무신사 스탠다드 수주회) · BUYMA·프루츠패밀리(고요웨어·산산기어) · 이투데이(2025, 더 풀필) · 바이라인네트워크(2023)",
      "중소기업중앙회(2024.7.3, 2025.12.9) · 데일리안(FITI) · 산업통상부(2026.2.3) · 스마트투데이(2025, 프리뷰 인 서울) · 패션비즈(K패션 수출 장벽) · 아시아경제(2026.7.29, 코오롱스포츠 차이나) · 크린토피아-벤텍스 협약(2014)",
    ],
    [
      "지도는 왼쪽에서 오른쪽으로 제품이 흐르고, 아래 주황 화살표로 돈이 거꾸로 흐릅니다. ① 원사·원료에서 시작해 ② 기능성 원단, ③ 충전재·부자재, ④ 생산, ⑤ 브랜드, ⑥ 유통, ⑦ 소비자·순환으로 이어집니다. 맨 아래 줄은 각 단계를 받치는 시험·인증, 물류, 미디어, 정책 기능입니다.",
      "이 지도에서 문제가 보입니다. ④ 생산에서는 영원무역이 아크테릭스·노스페이스 같은 글로벌 브랜드를 만들고, ⑤ 브랜드에서는 해외 IP 라이선스 브랜드가 로열티를 해외로 보냅니다. 주황 원 ①②③은 기획 배경에서 말한 세 병목의 위치입니다.",
      "[범위] 점선 안의 ②~⑥을 정식 참가 범위로, ⑦을 퍼블릭 랩 데이로 다룹니다. 세 병목이 모두 ②~⑥ 사이의 연결 지점에 있기 때문입니다. ① 원사·원료는 K-브랜드와 직접 거래하지 않고 프리뷰 인 서울이 이미 다루므로 제외합니다. 시험·인증과 물류는 브랜드의 수출에 꼭 필요한 서비스라 서비스관으로 함께 참가합니다.",
    ]
  );

  // ── 레이아웃 ──
  const X0 = 0.45;
  const W = 12.43;
  const PAD = 0.08;
  const GAP = 0.12;
  const colW = [1.1, 1.62, 1.42, 1.66, 2.3, 2.25, 1.2];
  const colX = [];
  let cx = X0 + PAD;
  colW.forEach((w) => {
    colX.push(cx);
    cx += w + GAP;
  });
  const right = (i) => colX[i] + colW[i];

  const yPanel = 1.56;
  const yTag = 1.6;
  const yHead = 1.86;
  const hHead = 0.38;
  const yBody = yHead + hHead + 0.05;
  const hBody = 2.32;

  // 범례 (부제목 오른쪽)
  let lx = 7.35;
  [["국내 기업", "kr"], ["해외 기업", "gl"], ["해외 IP 라이선스", "ip"]].forEach(([t, k]) => {
    const r = T.badges(s, [{ t, k }], lx, 1.235, 3, { size: 7.5 });
    lx = r.lastRight + 0.1;
  });
  T.text(s, [[{ t: "→ ", b: true, c: C.MUTED }, "제품 흐름   ", { t: "← ", b: true, c: C.ORANGE }, "돈의 흐름   ", { t: "● ", b: true, c: C.ORANGE }, "병목 위치"]],
    { x: lx + 0.05, y: 1.22, w: X0 + W - lx - 0.05, h: 0.22 }, { size: 7.5, valign: "middle", name: "범례 설명" });

  // 지도 전체 바탕(한 덩어리)
  T.rect(s, { x: X0, y: yPanel, w: W, h: 4.12 }, "F8FAFC", { line: C.LINE, round: true, radius: 0.04, name: "지도 바탕" });

  // 범위 표시
  T.rect(s, { x: colX[1] - 0.05, y: yHead - 0.05, w: right(5) - colX[1] + 0.1, h: hHead + hBody + 0.13 }, null,
    { line: C.TEAL, lineW: 1.5, dash: "dash", name: "전시 정식 범위" });
  T.rect(s, { x: colX[6] - 0.05, y: yHead - 0.05, w: colW[6] + 0.1, h: hHead + hBody + 0.13 }, null,
    { line: C.TEAL, lineW: 1, dash: "sysDot", name: "퍼블릭 랩 데이 범위" });
  T.text(s, "제외", { x: colX[0], y: yTag, w: colW[0], h: 0.22 }, { size: 8, bold: true, color: C.GRAY, align: "center", valign: "middle", name: "제외 표시" });
  T.text(s, "GFF SEOUL 정식 참가 범위 ②~⑥ (소재관 · 제조관 · 브랜드관 · 트레이드 데이)", { x: colX[1], y: yTag, w: right(5) - colX[1], h: 0.22 },
    { size: 8.5, bold: true, color: C.TEAL, align: "center", valign: "middle", name: "정식 범위 표시" });
  T.text(s, "퍼블릭 랩 데이", { x: colX[6] - 0.05, y: yTag, w: colW[6] + 0.1, h: 0.22 }, { size: 8, bold: true, color: C.TEAL, align: "center", valign: "middle", name: "퍼블릭 범위 표시" });

  // ── 7단계 머리 ──
  const heads = [
    ["① 원사 · 원료", "섬유 · 화학"],
    ["② 기능성 원단", "투습방수 · 멤브레인"],
    ["③ 충전재 · 부자재", "다운 · 지퍼 · 밑창"],
    ["④ 생산", "OEM · ODM · 봉제 · 신발"],
    ["⑤ 브랜드", "기획 · 디자인 · 마케팅"],
    ["⑥ 유통 (B2B 바이어)", "국내 · 해외 판매 채널"],
    ["⑦ 소비자 · 순환", "착용 · 리세일 · 재활용"],
  ];
  heads.forEach((h, i) => {
    T.text(s, [[{ t: h[0], b: true, s: 9 }], [{ t: h[1], s: 7, c: i === 0 ? "E2E8F0" : C.SKY }]], { x: colX[i], y: yHead, w: colW[i], h: hHead },
      { fill: i === 0 ? C.GRAY : C.NAVY, round: false, color: C.WHITE, align: "center", valign: "middle", ls: 0.95, name: `단계 ${i + 1}` });
    T.rect(s, { x: colX[i], y: yBody, w: colW[i], h: hBody }, C.WHITE, { line: C.LINE, name: `단계 본문 ${i + 1}` });
    if (i < 6) T.arrow(s, right(i) + 0.01, yHead + hHead / 2, GAP - 0.02, C.GRAY, { width: 1.5, name: `제품 흐름 ${i + 1}` });
  });

  // ── 단계별 하위 내용 ──
  const k = (t) => ({ t, k: "kr" });
  const g = (t) => ({ t, k: "gl" });
  const ip = (t) => ({ t, k: "ip" });
  const out = (t) => ({ t, k: "out" });
  const pl = (t) => ({ t, k: "plain" });
  const cols = [
    [
      { l: "국내", items: [out("효성티앤씨"), out("태광산업"), out("휴비스")] },
      { l: "해외", items: [out("인비스타"), out("도레이")] },
      { l: "리사이클 원사", items: [out("효성 regen"), out("휴비스 에코에버")] },
    ],
    [
      { l: "국내 원단사", items: [k("코오롱인더스트리"), k("효성티앤씨"), k("벤텍스"), k("신한산업")] },
      { l: "해외 소재 브랜드", items: [g("고어텍스"), g("폴라텍"), g("퍼텍스")] },
      { note: ["코오롱 네오벤트 →", "노스페이스·컬럼비아 수출"] },
      { note: ["PFAS 규제로 비불소", "발수·멤브레인 전환 중"], warn: true },
      { note: ["원단 산지: 대구·경북", "화섬 직물 클러스터"] },
    ],
    [
      { l: "충전재", items: [k("프라우덴(태평양물산)"), g("프리마로프트"), g("3M 신슐레이트")] },
      { l: "부자재", items: [g("YKK코리아"), g("비브람"), g("SBS(중국)")] },
      { note: ["프라우덴 고객: 컬럼비아·", "몽벨·아디다스 등"] },
    ],
    [
      { l: "의류 OEM · 기능성", items: [k("영원무역"), k("기도산업"), k("한세실업"), k("세아상역")] },
      { note: ["영원무역 고객 40여 곳:", "아크테릭스·노스페이스 등"], warn: true },
      { l: "소량 · 샘플 봉제", items: [k("서울 도심 봉제 1.8만 곳"), k("대구 봉제 맵 20곳")] },
      { l: "신발", items: [k("태광실업"), k("창신INC"), k("트렉스타")] },
    ],
    [
      { l: "해외 직진출", items: [g("아크테릭스"), g("살로몬"), g("파타고니아"), g("마무트"), g("살레와")] },
      { l: "해외 IP 라이선스", items: [ip("노스페이스"), ip("디스커버리"), ip("내셔널지오그래픽"), ip("스노우피크어패럴")], tail: "로열티 151억→337억" },
      { l: "국내 오리지널 (2024 모두 역성장)", items: [k("코오롱스포츠"), k("K2"), k("블랙야크"), k("네파")] },
      { l: "K-고프코어 신진", items: [k("케일"), k("산산기어"), k("고요웨어"), k("그레일즈"), k("제로그램")] },
    ],
    [
      { l: "국내 플랫폼 (수수료 27.8%)", items: [k("무신사"), k("29CM"), k("W컨셉"), k("KREAM")], mark: "②" },
      { l: "백화점 · 편집숍 (최고 38%)", items: [k("현대"), k("신세계"), k("롯데"), k("웍스아웃")] },
      { l: "해외 편집숍 · 온라인", items: [g("빔즈"), g("유나이티드애로우즈"), g("1LDK"), g("END."), g("ZOZOTOWN")], mark: "③" },
      { l: "해외 유통 파트너", items: [g("안타(중국)"), g("이토추(일본)"), g("티몰(중국)")] },
    ],
    [
      { l: "소비자", items: [pl("2030 도시 소비자"), pl("하이킹 · 러닝 크루")] },
      { l: "리세일", items: [k("KREAM"), k("후루츠패밀리"), k("번개장터")] },
      { l: "재활용", items: [k("프라우덴 리사이클")] },
      { l: "관리 · 세탁", items: [k("크린토피아")] },
    ],
  ];

  const marks = {};
  cols.forEach((segs, i) => {
    const x = colX[i] + 0.06;
    const w = colW[i] - 0.12;
    let y = yBody + 0.06;
    segs.forEach((sg) => {
      if (sg.note) {
        T.text(s, sg.note, { x, y, w, h: 0.25 }, { size: 6.5, color: sg.warn ? C.ORANGE : C.MUTED, bold: !!sg.warn, ls: 0.9, name: `단계 ${i + 1} 메모` });
        y += 0.25 + 0.03;
        return;
      }
      T.text(s, sg.l, { x, y, w, h: 0.15 }, { size: 6.8, bold: true, color: C.TEAL, ls: 0.9, name: `단계 ${i + 1} ${sg.l}` });
      const top = y + 0.16;
      const r = T.badges(s, sg.items, x, top, w, { size: 7, h: 0.18, gy: 0.035, gx: 0.04 });
      if (sg.mark) marks[sg.mark] = (top + r.bottom) / 2;
      y = r.bottom;
      if (sg.tail) {
        const tWidth = lineWidth(sg.tail, { size: 6.5, bold: true });
        if (r.lastRight + 0.06 + tWidth <= x + w) {
          T.text(s, sg.tail, { x: r.lastRight + 0.06, y: r.lastY, w: tWidth + 0.02, h: r.rowH }, { size: 6.5, bold: true, color: C.ORANGE, valign: "middle", ls: 0.9, name: "로열티 유출" });
        } else {
          T.text(s, sg.tail, { x, y: y + 0.02, w, h: 0.14 }, { size: 6.5, bold: true, color: C.ORANGE, ls: 0.9, name: "로열티 유출" });
          y += 0.16;
        }
      }
      y += 0.06;
    });
    if (y > yBody + hBody + 0.005) {
      throw new Error(`밸류체인 ${i + 1}단계 본문 높이 초과: ${(y - yBody).toFixed(2)}in > ${hBody}in`);
    }
  });

  // 병목 표시 ①②③
  const dot = 0.21;
  T.circleNum(s, right(3) + GAP / 2 - dot / 2, yBody + 0.75, dot, "①", C.ORANGE, { size: 7.5 });
  T.circleNum(s, right(4) + GAP / 2 - dot / 2, marks["②"] - dot / 2, dot, "②", C.ORANGE, { size: 7.5 });
  T.circleNum(s, right(4) + GAP / 2 - dot / 2, marks["③"] - dot / 2, dot, "③", C.ORANGE, { size: 7.5 });

  // ── 돈의 흐름 ──
  const yMoneyLabel = yBody + hBody + 0.03;
  const yMoney = yMoneyLabel + 0.2;
  T.arrow(s, colX[0] + 0.05, yMoney, right(6) - colX[0] - 0.1, C.ORANGE, { reverse: true, width: 1.75, name: "돈의 흐름" });
  const money = ["원사 대금", "원단 대금", "부자재 대금", "생산비 · 공임", "브랜드 매출 → 로열티 · 생산비", "유통 수수료 23~28% 차감", "소비자 결제"];
  money.forEach((m, i) => {
    T.text(s, m, { x: colX[i], y: yMoneyLabel, w: colW[i], h: 0.17 }, { size: 6.8, bold: true, color: C.ORANGE, align: "center", valign: "middle", ls: 0.9, name: `돈 ${i + 1}` });
  });

  // ── 지원 기능(같은 판 안의 아래 줄) ──
  const yS1 = yMoney + 0.08;
  const hS = 0.3;
  const yS2 = yS1 + hS + 0.05;
  T.text(s, ["지원", "기능"], { x: colX[0], y: yS1, w: colW[0], h: hS }, { size: 8, bold: true, color: C.NAVY, align: "center", valign: "middle", ls: 0.9, name: "지원 기능 표시" });
  const bar = (i0, i1, y, head, body, star, name) => {
    const x = colX[i0];
    const w = right(i1) - colX[i0];
    const lines = [[{ t: head + "  ", b: true, c: C.NAVY }, body, ...(star ? [{ t: "  ★ 서비스관 참가", b: true, c: C.TEAL }] : [])]];
    T.text(s, lines, { x, y, w, h: hS }, { fill: star ? C.TINT : C.GRAY_TINT, size: 7, pad: 0.08, valign: "middle", ls: 0.9, name });
  };
  bar(1, 3, yS1, "시험 · 인증", "FITI시험연구원 · 한국섬유개발연구원 · bluesign · RDS 인증", true, "지원 시험 인증");
  bar(4, 5, yS1, "물류 · 풀필먼트", "CJ대한통운(더 풀필) · 무신사 로지스틱스(700여 브랜드)", true, "지원 물류");
  T.text(s, [[{ t: "미디어", b: true, c: C.NAVY }], "GO OUT KOREA 외"], { x: colX[6], y: yS1, w: colW[6], h: hS }, { fill: C.GRAY_TINT, size: 6.8, align: "center", valign: "middle", ls: 0.85, name: "지원 미디어" });
  bar(0, 6, yS2, "정책 · 협회", "산업통상부(All in Korea 230억) · KOTRA(해외 바이어) · 한국패션협회 · 한국섬유산업연합회(프리뷰 인 서울) · 한국아웃도어스포츠산업협회 · 산림청", false, "지원 정책");

  // ── 범위 선정 이유 ──
  const yR = 5.78;
  T.text(s, ["전시회가 다룰", "범위와 선정 이유"], { x: X0, y: yR, w: 2.0, h: 0.5 }, { size: 10, bold: true, color: C.NAVY, ls: 1, name: "범위 이유 제목" });
  const O = (t) => ({ t, b: true, c: C.ORANGE });
  const B = (t, c) => ({ t, b: true, c: c || C.NAVY });
  T.text(s, [
    [O("①  "), B("소재·제조 ↔ 브랜드 단절 → 소재관·제조관  "), "원단 최소주문량·심실링 공정·PFAS 전환(2027·2028) 문제를 브랜드와 공급사의 사전 매칭으로 푼다."],
    [O("②  "), B("고비용 국내 유통 → 트레이드 데이(국내)  "), "수수료 27.8%·특약매입 구조 대신, 플랫폼·백화점·편집숍 바이어와 직거래로 잇는다."],
    [O("③  "), B("해외 접점 부재 → 트레이드 데이(해외)  "), "수출 이력이 없어도 KOTRA 초청 바이어와 1:1로 만나 코오롱스포츠-안타형 파트너십을 만든다."],
    [B("부분 포함  ", C.TEAL), "시험·인증과 물류는 브랜드 수출에 필요한 서비스라 서비스관으로 들이고, ⑦ 소비자는 퍼블릭 랩 데이로 기능 신뢰를 만든다."],
    [B("제외  ", C.MUTED), "① 원사·원료는 K-브랜드와 직접 거래하지 않고, 원사·원단 B2B는 프리뷰 인 서울(섬산련)이 이미 다룬다."],
  ], { x: X0 + 2.1, y: yR, w: W - 2.1, h: 1.12 }, { size: 8, para: 2, ls: 0.92, name: "범위 이유" });
};
