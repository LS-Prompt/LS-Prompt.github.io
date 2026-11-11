---
name: postmortem
description: 게임 프로젝트(또는 스프린트)를 돌아보고 잘된 점·문제·교훈을 정리한다. "회고", "포스트모템", "돌아보기" 요청에 사용.
---
# 포스트모템

1. 해당 게임의 concept, gdd, 모든 sprint/playtest 문서와 `git log -- public/games/<slug> studio/games/<slug>`를 읽는다.
2. `studio/templates/postmortem.md`를 채워 `studio/games/<slug>/postmortem.md`에 저장한다.
   - 처음 비전 대비 결과, 계획 대비 실제 스프린트 수, 빠진 기능과 이유
   - 잘된 점 3 / 문제 3 (근거가 되는 문서·커밋 인용)
   - 다음 게임에 적용할 규칙 변경 제안
3. 제안 중 스튜디오 전체 규칙(CLAUDE.md, 에이전트, 스킬)을 바꿀 만한 것은 사용자에게 적용 여부를 묻고, 승인 시 반영한다.
