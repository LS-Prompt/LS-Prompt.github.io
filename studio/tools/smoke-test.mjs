#!/usr/bin/env node
// 게임 스모크 테스트: 빌드 로드, 콘솔 오류, 시작 입력, 스크린샷(데스크톱·모바일)
// 사용법: node studio/tools/smoke-test.mjs <slug> [--seconds 3]
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const slug = process.argv[2];
const secIdx = process.argv.indexOf('--seconds');
const seconds = secIdx > 0 ? Number(process.argv[secIdx + 1]) : 3;
if (!slug) { console.error('사용법: node studio/tools/smoke-test.mjs <slug>'); process.exit(2); }

const file = resolve(root, 'public/games', slug, 'index.html');
if (!existsSync(file)) { console.error(`빌드 없음: ${file}`); process.exit(1); }

let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = await import('playwright')); }

const shotDir = resolve(root, 'studio/games', slug, 'shots');
mkdirSync(shotDir, { recursive: true });

const viewports = [
  { name: 'desktop', viewport: { width: 1280, height: 720 } },
  { name: 'mobile', viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
];

const browser = await chromium.launch();
const failures = [];
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: vp.viewport, hasTouch: vp.hasTouch, isMobile: vp.isMobile });
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(shotDir, `${vp.name}-title.png`) });

  // 시작 입력: 키보드 + 탭 둘 다 시도
  await page.keyboard.press('Enter');
  if (vp.hasTouch) await page.touchscreen.tap(vp.viewport.width / 2, vp.viewport.height / 2);
  const before = await page.evaluate(() => window.__game?.state?.scene ?? null);
  // 몇 초간 좌우 입력
  for (let i = 0; i < seconds * 2; i++) {
    await page.keyboard.down(i % 2 ? 'ArrowLeft' : 'ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.up(i % 2 ? 'ArrowLeft' : 'ArrowRight');
  }
  const snap = await page.evaluate(() => {
    const s = window.__game?.state; if (!s) return null;
    return { scene: s.scene, score: s.score, time: Number(s.time?.toFixed?.(2) ?? 0) };
  });
  await page.screenshot({ path: resolve(shotDir, `${vp.name}-play.png`) });

  const ok = errors.length === 0 && (snap === null || before !== 'title');
  console.log(`[${vp.name}] ${ok ? 'PASS' : 'FAIL'} · 시작 후 씬=${before} · 상태=${JSON.stringify(snap)}`);
  if (snap === null) console.log(`  참고: window.__game 디버그 핸들이 없어 상태 검사를 건너뜀`);
  for (const e of errors) console.log(`  ${e}`);
  if (!ok) failures.push(vp.name);
  await page.close();
}
await browser.close();
console.log(`스크린샷: ${shotDir}`);
process.exit(failures.length ? 1 : 0);
