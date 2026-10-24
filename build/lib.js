// 공통 레이아웃·텍스트 도구
// - 모든 텍스트는 "의미가 끝나는 단위"로 미리 끊은 줄 배열로 넣는다.
// - 각 줄의 실제 폭을 Noto Sans KR 글꼴 지표로 재서, 상자 폭을 넘으면 빌드를 멈춘다.
//   (PowerPoint가 문장 중간에서 자동 줄바꿈하는 일을 원천 차단)

const path = require("path");
const opentype = require("opentype.js");

const FONT = "Noto Sans KR";
// 글꼴 파일: FONT_DIR 환경변수 > npm 패키지(@expo-google-fonts/noto-sans-kr) > ~/.local/share/fonts
function fontPath(sub, file) {
  if (process.env.FONT_DIR) return path.join(process.env.FONT_DIR, file);
  try {
    return path.join(path.dirname(require.resolve("@expo-google-fonts/noto-sans-kr/package.json")), sub, file);
  } catch (e) {
    return path.join(require("os").homedir(), ".local/share/fonts", file);
  }
}
const FR = opentype.loadSync(fontPath("400Regular", "NotoSansKR_400Regular.ttf"));
const FB = opentype.loadSync(fontPath("700Bold", "NotoSansKR_700Bold.ttf"));
const LH = 1.448; // Noto Sans KR 줄 높이(em, 100% 간격)

const C = {
  NAVY: "182F48",
  TEAL: "267D86",
  MUTED: "64748B",
  BODY: "334155",
  LINE: "CBD5E1",
  TINT: "E6F2F3",
  LIGHT: "F1F5F9",
  ORANGE: "C2410C",
  ORANGE_TINT: "FDEDE3",
  WHITE: "FFFFFF",
  GRAY: "94A3B8",
  GRAY_TINT: "EEF0F3",
  SKY: "9FE0E6",
};

const problems = [];
const warnings = [];

function tw(text, pt, bold) {
  return (bold ? FB : FR).getAdvanceWidth(text, pt, { kerning: false }) / 72;
}

// 줄(line) = 문자열 | 세그먼트 배열 [{ t, b, c, s }]
function segs(line) {
  if (typeof line === "string") return [{ t: line }];
  return line.map((x) => (typeof x === "string" ? { t: x } : x));
}

// LibreOffice는 한글과 영문·숫자·ASCII 기호(·, ×, 괄호 등)가 바뀌는 지점마다 자동 간격을 넣는다
// (공백을 사이에 두어도 적용). 실측 보정값 0.234em. PowerPoint는 이 간격이 없어 더 좁게 그려지므로,
// 이 값을 더한 폭으로 검사하면 두 프로그램 모두에서 문장 중간 줄바꿈이 생기지 않는다.
const AUTO_EM = 0.234;
function charClass(ch) {
  const c = ch.codePointAt(0);
  if (c === 0x20 || c === 0xa0) return 0;
  if ((c >= 0x1100 && c <= 0x11ff) || (c >= 0x2000 && c <= 0x2bff) || (c >= 0x2e80 && c <= 0xa4cf) ||
    (c >= 0xac00 && c <= 0xd7af) || (c >= 0xf900 && c <= 0xfaff) || (c >= 0xfe30 && c <= 0xfe4f) || (c >= 0xff00 && c <= 0xffef)) return 2;
  return 1;
}

function lineWidth(line, base) {
  let w = 0;
  let last = 0;
  segs(line).forEach((x) => {
    const size = x.s || base.size;
    w += tw(x.t, size, x.b === undefined ? base.bold : x.b);
    for (const ch of x.t) {
      const k = charClass(ch);
      if (!k) continue;
      if (last && k !== last) w += (AUTO_EM * size) / 72;
      last = k;
    }
  });
  return w;
}

function lineHeight(line, base, ls) {
  const maxSize = Math.max(...segs(line).map((x) => x.s || base.size));
  return (maxSize * LH * ls) / 72;
}

function runsOf(lines, base) {
  const runs = [];
  lines.forEach((line, i) => {
    const sg = segs(line);
    sg.forEach((x, k) => {
      const o = {
        fontSize: x.s || base.size,
        bold: x.b === undefined ? base.bold : x.b,
        color: x.c || base.color,
      };
      if (k === sg.length - 1 && i < lines.length - 1) o.breakLine = true;
      runs.push({ text: x.t, options: o });
    });
  });
  return runs;
}

function check(name, lines, base, avail) {
  lines.forEach((line) => {
    const w = lineWidth(line, base);
    if (w > avail * 0.985) {
      problems.push(`[${name}] 폭 초과 ${w.toFixed(2)}in > ${avail.toFixed(2)}in : ${segs(line).map((x) => x.t).join("")}`);
    }
  });
}

function makeTools(pres) {
  // 텍스트 상자: box = {x, y, w, h}
  function text(s, lines, box, o = {}) {
    lines = [].concat(lines);
    const base = { size: o.size || 9, bold: !!o.bold, color: o.color || C.BODY };
    const ls = o.ls === undefined ? 0.92 : o.ls;
    const pad = o.pad || 0; // 좌우 여백(in)
    check(o.name || "text", lines, base, box.w - 2 * pad);
    let h = 0;
    lines.forEach((line, i) => {
      h += lineHeight(line, base, ls);
      if (i < lines.length - 1) h += (o.para || 0) / 72;
    });
    if (h > box.h * 1.04) warnings.push(`[${o.name || "text"}] 높이 ${h.toFixed(2)}in > ${box.h.toFixed(2)}in`);
    const opts = {
      x: box.x, y: box.y, w: box.w, h: box.h,
      fontFace: FONT, margin: [pad * 72, pad * 72, 0, 0], // pptxgenjs 텍스트 여백 순서: 왼쪽, 오른쪽, 아래, 위
      valign: o.valign || "top", align: o.align || "left",
      lineSpacingMultiple: ls, paraSpaceAfter: o.para || 0,
      isTextBox: true, objectName: o.name || "텍스트",
    };
    if (o.fill) {
      opts.shape = o.round === false ? pres.shapes.RECTANGLE : pres.shapes.ROUNDED_RECTANGLE;
      if (o.round !== false) opts.rectRadius = o.radius || 0.05;
      opts.fill = { color: o.fill };
      opts.line = o.line ? { color: o.line, width: o.lineW || 0.75, dashType: o.dash || "solid" } : { type: "none" };
    }
    s.addText(runsOf(lines, base), opts);
    return h;
  }

  function rect(s, box, fill, o = {}) {
    const opts = {
      x: box.x, y: box.y, w: box.w, h: box.h,
      fill: fill ? { color: fill, transparency: o.transparency || 0 } : { color: C.WHITE, transparency: 100 },
      line: o.line ? { color: o.line, width: o.lineW || 0.75, dashType: o.dash || "solid" } : { type: "none" },
      objectName: o.name || "도형",
    };
    if (o.round) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign(opts, { rectRadius: o.radius || 0.05 }));
    } else {
      s.addShape(pres.shapes.RECTANGLE, opts);
    }
  }

  function arrow(s, x, y, w, color, o = {}) {
    s.addShape(pres.shapes.LINE, {
      x, y, w, h: 0,
      line: Object.assign({ color, width: o.width || 1.25, dashType: o.dash || "solid" },
        o.reverse ? { beginArrowType: "triangle" } : { endArrowType: "triangle" }),
      objectName: o.name || "화살표",
    });
  }

  function vline(s, x, y, h, color, o = {}) {
    s.addShape(pres.shapes.LINE, {
      x, y, w: 0, h,
      line: Object.assign({ color, width: o.width || 1, dashType: o.dash || "solid" }, o.end ? { endArrowType: "triangle" } : {}),
      objectName: o.name || "세로선",
    });
  }

  function circleNum(s, x, y, d, label, fill, o = {}) {
    s.addText(label, {
      x, y, w: d, h: d, shape: pres.shapes.OVAL, fill: { color: fill }, line: { color: C.WHITE, width: 1 },
      fontFace: FONT, fontSize: o.size || 8, bold: true, color: C.WHITE, align: "center", valign: "middle", margin: 0,
      objectName: o.name || `표시 ${label}`,
    });
  }

  // 회사·기관 배지(로고 대신 이름 배지로 통일)
  const KIND = {
    kr: { fill: C.TINT, color: C.NAVY, line: null },
    gl: { fill: C.GRAY_TINT, color: "475569", line: null },
    ip: { fill: C.ORANGE_TINT, color: "9A3412", line: null },
    out: { fill: C.WHITE, color: C.GRAY, line: C.LINE },
    plain: { fill: C.WHITE, color: C.BODY, line: C.LINE },
  };
  function badgeWidth(t, size) {
    return lineWidth(t, { size, bold: false }) + 0.1;
  }
  function badges(s, items, x0, y0, maxW, o = {}) {
    const size = o.size || 7.5;
    const h = o.h || 0.19;
    const gx = o.gx || 0.045;
    const gy = o.gy || 0.04;
    let x = x0;
    let y = y0;
    items.forEach((it, i) => {
      const item = typeof it === "string" ? { t: it, k: o.kind || "kr" } : it;
      const w = badgeWidth(item.t, size);
      if (w > maxW + 1e-6) problems.push(`[배지] 폭 초과 ${w.toFixed(2)} > ${maxW.toFixed(2)} : ${item.t}`);
      if (x > x0 && x + w > x0 + maxW + 1e-6) {
        x = x0;
        y += h + gy;
      }
      const k = KIND[item.k || o.kind || "kr"];
      if (o.dry) {
        x += w + gx;
        return;
      }
      s.addText(item.t, {
        x, y, w, h, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.04,
        fill: { color: k.fill }, line: k.line ? { color: k.line, width: 0.5 } : { type: "none" },
        fontFace: FONT, fontSize: size, color: k.color, align: "center", valign: "middle", margin: 0,
        objectName: `배지 ${item.t}`,
      });
      x += w + gx;
    });
    return { bottom: y + h, lastRight: x - gx, lastY: y, rowH: h };
  }

  // 표: rows = [[cell, ...], ...]; cell = 문자열 | {lines, b, c, fill, align, size, rowspan}
  // rowspan 칸 아래 행에서는 그 열의 칸을 생략한다(pptxgenjs 방식).
  function table(s, rows, o) {
    const m = o.margin || [2, 4, 2, 4]; // pt: 위 오른쪽 아래 왼쪽
    const padIn = (m[1] + m[3]) / 72;
    const size = o.size || 7.5;
    const ls = o.ls === undefined ? 0.92 : o.ls;
    const rowH = [];
    const spans = [];
    let busy = o.colW.map(() => 0);
    const data = rows.map((r, ri) => {
      const occupied = busy.map((b) => b > 0);
      let maxH = 0;
      let col = 0;
      const cells = r.map((cell) => {
        while (occupied[col]) col++;
        const c = typeof cell === "string" ? { lines: [cell] } : Array.isArray(cell) ? { lines: cell } : cell;
        const header = ri === 0 && o.header;
        const base = {
          size: c.size || size,
          bold: c.b === undefined ? header : c.b,
          color: c.c || (header ? C.WHITE : C.BODY),
        };
        check(`${o.name || "표"} ${ri + 1}행 ${col + 1}열`, c.lines, base, o.colW[col] - padIn);
        let h = (m[0] + m[2]) / 72;
        c.lines.forEach((line) => (h += lineHeight(line, base, ls)));
        const opt = { valign: c.valign || "middle", align: c.align || "left" };
        if (header) opt.fill = { color: o.headFill || C.NAVY };
        if (c.fill) opt.fill = { color: c.fill };
        if (c.rowspan > 1) {
          opt.rowspan = c.rowspan;
          busy[col] = c.rowspan;
          spans.push({ ri, n: c.rowspan, h });
        } else {
          maxH = Math.max(maxH, h);
        }
        col++;
        return { text: runsOf(c.lines, base), options: opt };
      });
      busy = busy.map((b) => (b > 0 ? b - 1 : 0));
      const minH = ri === 0 && o.header ? o.headMinH || Math.min(o.minRowH || 0.2, 0.22) : o.minRowH || 0.2;
      rowH.push(Math.max(minH, maxH + 0.02));
      return cells;
    });
    // rowspan 칸이 차지하는 행 높이의 합이 모자라면 마지막 행을 늘린다
    spans.forEach(({ ri, n, h }) => {
      const sum = rowH.slice(ri, ri + n).reduce((a, b) => a + b, 0);
      if (sum < h + 0.02) rowH[ri + n - 1] += h + 0.02 - sum;
    });
    const total = rowH.reduce((a, b) => a + b, 0);
    if (o.maxH && total > o.maxH * 1.01) warnings.push(`[${o.name || "표"}] 높이 ${total.toFixed(2)}in > ${o.maxH.toFixed(2)}in`);
    s.addTable(data, {
      x: o.x, y: o.y, w: o.colW.reduce((a, b) => a + b, 0), colW: o.colW, rowH,
      fontFace: FONT, fontSize: size, margin: m, lineSpacingMultiple: ls,
      border: { type: "solid", pt: 0.5, color: C.LINE }, objectName: o.name || "표",
    });
    return total;
  }

  return { text, rect, arrow, vline, circleNum, badges, badgeWidth, table };
}

function report() {
  warnings.forEach((w) => console.warn("경고 " + w));
  if (problems.length) {
    problems.forEach((p) => console.error("오류 " + p));
    throw new Error(`줄 폭 초과 ${problems.length}건 — 문장을 의미 단위로 다시 끊어야 함`);
  }
}

module.exports = { C, FONT, tw, makeTools, report, lineWidth };
