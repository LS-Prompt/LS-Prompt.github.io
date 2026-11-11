---
name: game-design-doc
description: concept.md를 바탕으로 게임 디자인 문서(GDD)를 작성하거나 갱신한다. "GDD", "기획서", "디자인 문서" 요청에 사용.
---
# 게임 디자인 문서 (GDD)

1. 대상 게임 슬러그를 확인하고 `studio/games/<slug>/concept.md`를 읽는다. 없으면 `/game-concept`부터 안내.
2. `studio/templates/gdd.md`를 복사해 `studio/games/<slug>/gdd.md`를 만든다(이미 있으면 갱신).
3. 섹션별 담당 관점으로 채운다. 병렬로 할 수 있으면 에이전트에게 나눠 맡긴다:
   - 코어 루프·규칙·진행·수치 표 → `game-designer`
   - 아트 방향 → `art-director`
   - UI 화면 흐름 → `ui-ux-designer`
   - 사운드 표 → `audio-designer`
   - 기술 메모 → `lead-programmer`
4. 수치 표의 모든 항목은 `CONFIG` 키 이름(camelCase)·값·단위·의도를 가진다.
5. 범위 섹션에 P0/P1/P2를 나누고, 하지 않을 것(Non-goals)을 적는다.
6. 완성 후 `creative-director` 관점으로 비전과 어긋나는 부분을 점검하고 사용자에게 요약을 보여 준다.
다음 단계: `/sprint-plan`.
