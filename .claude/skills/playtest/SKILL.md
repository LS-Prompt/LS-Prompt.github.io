---
name: playtest
description: 게임 빌드를 실제로 실행해 자동·수동 시나리오로 검증하고 플레이테스트 보고서를 만든다. "테스트", "플레이테스트", "버그 찾아줘", "검수" 요청에 사용.
---
# 플레이테스트

`qa-tester` 에이전트에게 맡기거나 그 절차를 직접 따른다.

1. `node studio/tools/smoke-test.mjs <slug>` — 데스크톱/모바일 뷰포트 스크린샷, 콘솔 오류 수집.
2. GDD의 코어 루프를 재현하는 Playwright 시나리오를 스크래치 폴더에 작성해 실행한다:
   타이틀 → 시작 입력 → 수 초간 조작(키 입력/탭) → 게임오버 유도 → 재시작.
   `window.__game`(템플릿이 노출하는 디버그 핸들)로 `state`를 읽어 점수·생명·씬 변화를 확인한다.
3. GDD 수치와 실제 동작을 대조한다(속도, 생성 간격, 난이도 상승).
4. `studio/templates/playtest-report.md`로 `studio/games/<slug>/playtest-N.md`를 작성한다. 스크린샷은 `studio/games/<slug>/shots/`에 저장.
5. 사용자에게 사람이 직접 확인해야 할 항목(손맛, 재미, 난이도 체감)을 3~5개 질문 형태로 제시한다.
치명/높음 이슈는 다음 `/sprint-plan`에 포함된다.
