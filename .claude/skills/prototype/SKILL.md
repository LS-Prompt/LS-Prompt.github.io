---
name: prototype
description: 현재 스프린트 항목을 구현해 public/games/<slug>/에 플레이 가능한 빌드를 만든다. "만들어줘", "구현", "프로토타입", "다음 작업 진행" 요청에 사용.
---
# 프로토타입 구현

1. `gdd.md`와 최신 `sprint-N.md`를 읽고 미완료 항목 중 우선순위가 가장 높은 것부터 고른다.
2. 빌드가 없으면 `public/games/_template/`를 `public/games/<slug>/`로 복사한다(템플릿 자체는 수정 금지). `<title>`과 `CONFIG.title`을 게임 이름으로 바꾼다.
3. 항목을 담당 에이전트에게 맡긴다(대부분 `gameplay-programmer`; 비주얼은 `art-director`, 화면/HUD는 `ui-ux-designer`, 사운드는 `audio-designer`).
4. 항목 하나가 끝날 때마다:
   - `node studio/tools/smoke-test.mjs <slug>` 실행 → 실패하면 고치고 다시 실행
   - 스프린트 문서의 해당 항목을 `[x]`로 바꾸고, 새 CONFIG 키를 GDD 수치 표에 반영
5. 스프린트 항목을 모두 마치면 `lead-programmer`에게 코드 리뷰를 맡기고 "반드시 수정" 항목을 처리한다.
6. 결과 보고: 구현한 항목, 스모크 테스트 결과, 스크린샷 경로, 로컬에서 보는 법(`npm run dev` 후 `http://localhost:3000/games/<slug>/`).
다음 단계: `/playtest`.
