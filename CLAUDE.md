# LS-Prompt.github.io — 프로젝트 가이드

이 저장소에는 두 가지가 함께 있습니다.

1. **실습 프롬프트 사이트** — `src/` (React + Vite + Tailwind). 프롬프트 데이터는 `src/data/prompts.json`.
2. **Claude Code 게임 스튜디오** — Claude Code를 작은 게임 개발 스튜디오처럼 쓰는 설정.
   - 역할별 에이전트: `.claude/agents/`
   - 작업 단계별 스킬(슬래시 명령): `.claude/skills/`
   - 문서 템플릿·도구: `studio/templates/`, `studio/tools/`
   - 게임별 기획 문서: `studio/games/<slug>/`
   - 플레이 가능한 빌드: `public/games/<slug>/index.html` (Vite가 그대로 복사해 `/games/<slug>/`로 배포)

사이트 작업 요청에는 스튜디오 규칙을 적용하지 않습니다. 게임 관련 요청일 때만 아래 규칙을 따릅니다.

## 스튜디오 운영 규칙

### 조직도
```
            creative-director (비전·최종 승인)
                     │
        ┌────────────┼──────────────┬──────────────┐
  game-designer  lead-programmer  art-director   producer
        │            │                │             (일정·범위)
        │     gameplay-programmer  ui-ux-designer
        │                         audio-designer
        └──────────── qa-tester (모든 빌드 검증) ─────┘
```

### 작업 흐름 (스킬)
| 단계 | 스킬 | 산출물 |
|---|---|---|
| 0. 시작 | `/studio-start` | 현재 프로젝트 상태 요약, 다음 단계 제안 |
| 1. 콘셉트 | `/game-concept` | `studio/games/<slug>/concept.md` |
| 2. 기획 | `/game-design-doc` | `studio/games/<slug>/gdd.md` |
| 3. 계획 | `/sprint-plan` | `studio/games/<slug>/sprint-N.md` |
| 4. 구현 | `/prototype` | `public/games/<slug>/index.html` |
| 5. 검증 | `/playtest` | `studio/games/<slug>/playtest-N.md` + 스크린샷 |
| 6. 조정 | `/balance` | GDD의 수치 표 갱신 + 코드 반영 |
| 7. 출시 | `/release` | 게임 목록 등록, 빌드 확인 |
| 8. 회고 | `/postmortem` | `studio/games/<slug>/postmortem.md` |

### 원칙
- **문서가 먼저, 코드는 문서를 따른다.** 구현 중 기획이 바뀌면 GDD부터 고친다.
- **플레이 가능한 상태 유지.** 매 작업 후 게임은 열리고 조작 가능해야 한다. `node studio/tools/smoke-test.mjs <slug>`가 통과해야 완료.
- **오리지널 게임만.** 장르·메커니즘 참고는 자유지만, 특정 기존 게임의 이름·캐릭터·아트·음악·레벨을 재현하지 않는다.
- **외부 에셋 없이 시작.** 그래픽은 Canvas 도형/절차적 생성, 사운드는 WebAudio 합성. 외부 리소스를 쓰면 출처와 라이선스를 GDD에 기록.
- **단일 파일 우선.** 프로토타입은 `public/games/<slug>/index.html` 하나에 담고, 커지면 같은 폴더에 `.js` 모듈로 나눈다. 빌드 도구 불필요.
- **조정 가능한 수치는 한곳에.** 모든 밸런스 값은 코드 상단 `CONFIG` 객체에 두고 GDD 수치 표와 일치시킨다.
- **모바일 고려.** 키보드 + 터치(또는 포인터) 입력을 함께 지원한다.
- 응답과 문서는 한국어로 작성한다.

### 슬러그 규칙
게임 폴더 이름은 영문 소문자-하이픈 (`star-fox` X → 오리지널 이름 예: `neon-drift`). `_template`은 시작용 뼈대이므로 수정하지 않는다.
