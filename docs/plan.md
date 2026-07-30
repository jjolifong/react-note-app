# React 노트 앱 구현 계획

상태 표기: `[ ]` 시작 전 · `[-]` 진행 중 · `[x]` 완료 · `[!]` 문제

## 시작 상태

- npm install: 정상 완료 (스타터 기본 의존성만, 추가 패키지 설치 없음)
- npm run dev: 정상 실행, Starter 안내 카드 렌더링 확인
- npm run build: 성공 (Starter 상태 기준)
- 브라우저 콘솔: 오류 없음
- 현재 구현 기능: 없음 (Starter 안내 카드만 표시, CRUD·store 미구성)
- 발견한 문제: 없음. 단, 최초 업로드된 스타터 압축 해제 과정에서
  파일명과 내용이 한 칸씩 밀리는 문제가 있었으나 재추출로 해결하고 시작함

## 마일스톤 1. 기반 구조

- [x] `Note` 타입 정의
- [x] Redux store 구성
- [x] Provider 연결
- [x] 빈 상태 화면

예상 변경 파일:
`src/features/notes/types.ts`, `src/features/notes/notesSlice.ts`(초기 상태·`selectNote`만),
`src/app/store.ts`, `src/app/hooks.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

검증 방법:
`npm run build` 성공 확인, 브라우저에서 빈 상태 문구 렌더링 확인,
`git status`로 변경 파일 목록이 계획과 일치하는지 대조

실제 결과:
7개 파일 모두 계획대로만 변경됨. build 성공(27 modules, 114ms).
브라우저에 "아직 작성된 노트가 없습니다" 빈 상태 정상 표시, 콘솔 오류 0건.
커밋 완료.

## 마일스톤 2. 핵심 기능

- [x] 노트 목록
- [x] 노트 작성
- [x] 노트 선택·확인
- [x] 노트 수정
- [x] 노트 삭제

예상 변경 파일:
`notesSlice.ts`(reducer 전체: `addNote`·`updateNote`·`deleteNote`),
`NoteList.tsx`, `NoteForm.tsx`, `NoteDetail.tsx`, `App.tsx`, `index.css`

검증 방법:
reducer 단계는 화면으로 확인이 불가능하므로 코드를 직접 읽어 검증.
컴포넌트 단계는 10개 시나리오(빈/공백 제목 차단, 정상 추가, 선택, 모드 분리,
수정 시 다른 노트 불변, 편집 중 목록 클릭, 편집 중 삭제, 선택 노트 삭제,
전체 삭제, 콘솔 확인)를 브라우저에서 직접 실행해 검증.

실제 결과:
10개 시나리오 전부 통과. build 성공, lint 0건. 커밋·push 완료.
자세한 시나리오별 결과는 `WORK_LOG.md`, `README.md` 참고.

## 마일스톤 3. 검증과 문서화

- [x] 빈 제목·공백 제목 처리
- [x] 삭제 후 선택 상태 확인
- [x] `npm run build` 성공
- [x] 브라우저 콘솔 오류 확인
- [x] 최종 diff 검토
- [x] README 완성

검증 결과:
위 항목은 마일스톤 2 검증 단계에서 함께 확인됨.
`WORK_LOG.md`, `README.md` 작성 완료. 본 문서와 `AGENT_GUIDE.md` 마무리 진행 중.

## 계획과 달라진 점

| 기존 계획 | 실제 변경 | 변경 이유 | 사람 확인 |
|---|---|---|---|
| 마일스톤 2를 한 번에 구현 | 2-A(reducer 단계)와 2-B(컴포넌트 단계)로 분리 진행 | reducer와 UI를 함께 받으면 diff가 커져 로직 오류를 검토하기 어려움. reducer 단계는 화면 확인이 불가능해 코드를 직접 읽어야 함 | 승인 |
| `updateNote`의 `updatedAt` 갱신 방식 미정 | `prepare` 콜백에서 시각을 생성하고 reducer는 payload만 사용하도록 확정 | reducer 내부에서 `new Date()`를 호출하면 같은 입력에 다른 결과가 나와 순수성이 깨짐 | 승인 |
| 편집 중인 노트가 삭제되는 경우의 동작 미정 | 편집 대상 id가 store에 없으면 `mode`를 `'create'`로 되돌리고 입력값을 초기화하도록 확정 | 편집 대상 스냅샷 설계로 인해, 편집 중 노트가 삭제되면 저장 시 조용히 실패하는 빈틈이 있었음 | 승인 |
| 원본 프롬프트만 사용 예정 | 워크스페이스 범위 제약, 문서 8개 변경 제외, tsconfig 코딩 규칙, 폼 모드 정책을 프롬프트에 추가 | 최초 Plan 검토 중 워크스페이스가 프로젝트 루트가 아닌 상위 폴더로 잡혀 있는 등 4가지 문제가 발견됨 | 승인 |

## 다음 작업

- 다음 작은 목표: `AGENT_GUIDE.md`를 프로젝트 전용으로 재작성, 화면 캡처 확보, 최종 제출
- 예상 변경 파일: `AGENT_GUIDE.md`
- 검증 방법: 최종 `npm run build` 재확인 후 push, 저장소 URL 제출
- 승인 상태: 승인 전