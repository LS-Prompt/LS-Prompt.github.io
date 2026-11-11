# Claude Code 게임 스튜디오

Claude Code를 **역할이 나뉜 작은 게임 개발 스튜디오**처럼 쓰기 위한 설정입니다.
저장소 루트에서 `claude`를 실행하면 자동으로 적용됩니다.

## 빠른 시작
```
/studio-start          # 현황 확인
/game-concept          # 아이디어 → 콘셉트 3안 → 1안 선택
/game-design-doc       # GDD 작성
/sprint-plan           # 작업 쪼개기
/prototype             # 구현 (public/games/<slug>/)
/playtest              # 자동 검증 + 보고서
/balance               # 난이도·수치 조정
/release               # 게임 목록 등록, 빌드 확인
/postmortem            # 회고
```
예: `/game-concept 한 손으로 하는 30초짜리 모바일 반사신경 게임`

## 구성
| 경로 | 내용 |
|---|---|
| `CLAUDE.md` | 스튜디오 조직도·작업 흐름·원칙 |
| `.claude/agents/` | 역할 에이전트 9종 (아래 표) |
| `.claude/skills/` | 단계별 스킬 9종 (위 명령) |
| `studio/templates/` | concept / gdd / sprint / playtest-report / postmortem 양식 |
| `studio/tools/smoke-test.mjs` | Playwright로 로드·입력·스크린샷 검사 |
| `studio/games/<slug>/` | 게임별 기획 문서 |
| `public/games/_template/` | 게임 시작 뼈대 (CONFIG·씬·입력·사운드·고정 루프) |
| `public/games/index.html` | 출시된 게임 목록 (`/games/`) |

## 역할 에이전트
| 에이전트 | 하는 일 |
|---|---|
| `creative-director` | 비전·핵심 재미, 최종 결정 |
| `game-designer` | 규칙·루프·난이도·수치 표 |
| `lead-programmer` | 코드 구조, 기술 표준, 코드 리뷰 |
| `gameplay-programmer` | 조작·충돌·게임 로직 구현 |
| `art-director` | 팔레트·도형 언어·절차적 그래픽·이펙트 |
| `ui-ux-designer` | HUD·메뉴·온보딩·접근성 |
| `audio-designer` | WebAudio 효과음·사운드 표 |
| `qa-tester` | 실행 검증·버그 보고 (코드 수정 안 함) |
| `producer` | 범위·우선순위·스프린트 |

직접 부를 수도 있습니다: "qa-tester로 neon-drift 검수해줘", "creative-director 관점에서 이 기능 넣을지 판단해줘".

## 게임 확인
```bash
npm install          # 처음 한 번
npm run dev          # http://localhost:3000/games/<slug>/
node studio/tools/smoke-test.mjs <slug>   # 자동 검사 (Playwright 필요: npm i -D playwright)
```
`npm run build` 시 `public/games/`가 그대로 `dist/games/`로 복사되어 사이트와 함께 배포됩니다.
