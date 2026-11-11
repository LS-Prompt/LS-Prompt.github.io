---
name: release
description: 완성된 게임을 사이트 게임 목록에 등록하고 배포 가능한 상태인지 확인한다. "출시", "배포", "공개", "릴리스" 요청에 사용.
---
# 릴리스

1. 출시 조건 확인 — 하나라도 실패하면 멈추고 보고:
   - 최신 `playtest-*.md`에 치명/높음 미해결 이슈 없음
   - `node studio/tools/smoke-test.mjs <slug>` 통과 (데스크톱·모바일)
   - 타이틀·일시정지·게임오버·재시작·음소거 동작
   - GDD에 외부 에셋 출처·라이선스 기록(사용한 경우)
2. `public/games/index.html`의 `GAMES` 배열에 항목 추가: slug, 제목, 한 줄 설명, 조작법.
3. `npm run build`를 실행해 `dist/games/<slug>/index.html`이 생성되는지 확인한다(의존성이 없으면 `npm install` 먼저).
4. 사용자에게 배포 방법을 안내한다: `npm run deploy` (gh-pages) — 실제 배포 명령은 사용자 확인 후에만 실행.
5. 공개 URL 예상 경로: `/games/<slug>/`.
다음 단계: `/postmortem`.
