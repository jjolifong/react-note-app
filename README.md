# React 노트 앱

React·TypeScript·Redux Toolkit으로 만든 노트 관리 앱. 과제 7 결과물.

## 프로젝트 소개

노트를 작성·조회·수정·삭제할 수 있는 단일 페이지 앱.
노트 원본 데이터는 Redux store에서 전역으로 관리하고,
입력 중인 값과 폼 모드 등 UI 상태만 컴포넌트 로컬 state로 둠.

AI 에이전트에게 코드 작성을 맡기되,
계획 검토 → 승인 → 작은 단위 구현 → 사람의 검증 순서를 각 단계마다 반복하는 방식으로 진행함.
작업 과정의 상세 기록은 `WORK_LOG.md` 참고.

## 사용 기술

- React 19
- TypeScript 6
- Redux Toolkit
- React Redux
- Vite 8
- oxlint
- Cursor (Agent 모드)

## 설치와 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 타입 검사 + 프로덕션 빌드
npm run lint     # oxlint
```

## 구현 기능

- [x] 노트 목록
- [x] 노트 작성
- [x] 노트 선택·확인
- [x] 노트 수정
- [x] 노트 삭제
- [x] 빈 입력 처리

추가 구현

- [x] 노트가 없을 때 빈 상태 안내
- [x] 작성 모드와 수정 모드의 명시적 분리
- [x] 선택된 노트 삭제 시 선택 상태 자동 정리
- [x] 편집 중인 노트가 삭제되면 폼이 작성 모드로 복귀

## 상태관리 구조

### 전역 상태 (Redux store)

```ts
interface NotesState {
  notes: Note[]
  selectedNoteId: string | null
}
```

### 로컬 상태 (NoteForm 내부)

- 입력 중인 제목·내용
- `mode: 'create' | 'edit'`
- 편집 대상 노트 id 스냅샷
- 유효성 검사 에러 메시지

같은 노트 데이터를 store와 local state에 중복 저장하지 않음.
폼의 입력값은 store를 직접 수정하지 않고, 저장 시점에만 dispatch로 반영함.

### 액션

| 액션 | 동작 |
|---|---|
| `addNote` | `prepare`에서 `crypto.randomUUID()`로 id 생성, `createdAt`·`updatedAt`을 동일 시각으로 설정 |
| `updateNote` | id로 대상 노트만 찾아 제목·내용·`updatedAt` 갱신. `createdAt` 불변. 대상이 없으면 무동작 |
| `deleteNote` | 노트 제거. 삭제 대상이 `selectedNoteId`와 같으면 `null`로 정리 |
| `selectNote` | `selectedNoteId` 변경 |

`addNote`와 `updateNote` 모두 id 생성과 시각 계산을 `prepare` 콜백에서 처리함.
reducer가 `new Date()`를 직접 호출하면 같은 입력에 다른 결과가 나와 순수성이 깨지기 때문.

### 폼 모드 정책

`mode`는 `selectedNoteId`와 완전히 분리된 로컬 state로 관리함.

- `새 노트` 버튼: `mode`를 `'create'`로 전환, 입력값 초기화. `selectedNoteId`는 건드리지 않음
- `수정` 버튼: `mode`를 `'edit'`로 전환, 그 시점의 노트 id를 스냅샷으로 저장
- 목록 클릭: `selectNote`만 dispatch. 폼 상태에 영향 없음

선택 여부에 따라 모드가 자동으로 바뀌면 노트를 선택한 상태에서 새 노트를 만들 수 없게 됨.
편집 대상 id를 스냅샷으로 잡아두면, 편집 중에 다른 노트를 클릭해도 편집 대상이 흔들리지 않음.

## TypeScript 구조

```ts
export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
```

`tsconfig.app.json`에 활성화된 설정과 그에 따른 작성 규칙

| 설정 | 규칙 |
|---|---|
| `verbatimModuleSyntax` | 타입만 가져올 때는 `import type { Note } from './types'` 형태로 작성 |
| `erasableSyntaxOnly` | `enum`, `namespace`, 생성자 파라미터 프로퍼티 사용 금지 |
| `noUnusedLocals` / `noUnusedParameters` | 미사용 변수·인자를 남기지 않음 |

`any`와 `@ts-ignore`는 사용하지 않음.
store 타입은 `RootState`·`AppDispatch`로 추론하고,
`useDispatch.withTypes<AppDispatch>()` / `useSelector.withTypes<RootState>()`로
타입 지정 훅을 만들어 사용함.

## 컴포넌트 구조

```
src/
├── app/
│   ├── store.ts          # configureStore, RootState·AppDispatch 타입
│   └── hooks.ts          # 타입 지정 useAppDispatch·useAppSelector
├── features/notes/
│   ├── types.ts          # Note 인터페이스
│   ├── notesSlice.ts     # 전역 상태·reducer·selector
│   ├── NoteList.tsx      # 노트 목록
│   ├── NoteForm.tsx      # 작성·수정 폼
│   └── NoteDetail.tsx    # 선택된 노트 상세
├── App.tsx               # 레이아웃 조합
├── main.tsx              # Provider 연결
└── index.css
```

```
App
├── NoteList      — 목록 렌더링, 클릭 시 selectNote dispatch
├── NoteDetail    — 선택된 노트 표시, 수정 진입·삭제 버튼
└── NoteForm      — 작성·수정 폼, 유효성 검사
```

## AI 에이전트 활용 과정

### 작업 구조

구현은 Cursor Agent가 수행하고, 계획과 결과물의 검토는 별도 대화 창에서 진행함.
같은 에이전트가 자기 계획을 검토하면 스스로 전제한 조건은 검토 대상에서 빠지기 쉬움.
실제로 최초 Plan에서 워크스페이스 범위가 상위 폴더로 잡혀 있던 문제와
문서 파일을 에이전트가 작성하도록 계획된 문제는,
구현 맥락 밖에서 계획 문서를 읽었을 때 드러남.

계획을 도구 밖으로 꺼내는 것 자체가 검토 단계를 강제하는 효과도 있음.
한 창에서 진행하면 Plan을 확인한 직후 바로 구현을 시작할 수 있으나,
분리하면 그 사이에 사람이 판단하는 지점이 생김.

다만 이 구조에서도 최종 판정은 사람이 수행함.
검토 측은 실행 중인 코드와 화면을 직접 관찰하지 못하고
전달받은 내용만 볼 수 있으므로, 전달되지 않은 부분의 문제는 발견되지 않음.
브라우저에서 10개 시나리오를 직접 실행해 확인한 것,
특히 편집 대상 스냅샷이 dispatch까지 일관되게 적용되는지를
저장 후 갱신 시각으로 확인한 것은 사람만 할 수 있는 검증이었음.

### 최초 계획에서 확인하거나 수정한 내용

`START_HERE.md` 4항의 첫 대화 프롬프트를 그대로 사용해
문서 4개(`AGENT_GUIDE.md`, `docs/spec.md`, `docs/plan.md`, `.agents/rules/assignment7.md`)를
먼저 읽히고 Implementation Plan을 요청함.

받은 계획을 검토해 4가지를 수정 요청함.

- 작업 범위를 프로젝트 루트로 한정 (상위 폴더를 워크스페이스로 인식하고 있었음)
- 문서 8개를 에이전트 변경 대상에서 제외
- tsconfig 설정에 따른 코딩 규칙을 계획에 명시
- 폼의 작성·수정 모드 정책을 명시적으로 확정

이후 2가지를 추가로 확정함.

- `updateNote`의 `updatedAt` 갱신 및 `createdAt` 불변, 존재하지 않는 id면 무동작
- 편집 중인 노트가 삭제되면 `mode`를 `'create'`로 되돌리고 입력값 초기화

### AI 초안에서 발견한 문제

- `updateNote` reducer가 내부에서 `new Date()`를 호출해 순수하지 않았음.
  빌드와 린트는 이를 잡지 못했고 코드를 직접 읽어야만 발견됨
- 한글 폴더명의 유니코드 정규화 차이로 파일이 프로젝트 밖에 생성됨
- `AGENT_GUIDE.md` 5항이 승인 대상으로 규정한 폴더 삭제를 승인 없이 실행함

### 사람 검토 후 수정한 내용

- `updatedAt` 생성을 `prepare` 콜백으로 이동해 reducer 순수성 확보
- 이후 모든 파일 작업에 상대경로 사용을 지시
- 마일스톤 2를 reducer 단계(2-A)와 컴포넌트 단계(2-B)로 재분할.
  둘을 한 번에 받으면 diff가 커져 로직 오류를 눈으로 검토할 수 없기 때문

상세 내용은 `WORK_LOG.md` 참고.

## 오류 해결 기록

| 오류 | 원인 | 해결 |
|---|---|---|
| 파일 수정 실패 후 프로젝트 밖에 중복 폴더 생성 | 경로의 한글 폴더명이 NFC/NFD 두 방식으로 저장되어 절대경로가 실제 디스크 경로와 불일치 | 워크스페이스 기준 상대경로만 사용하도록 지시 |
| 계획 단계에서 파일이 수정될 가능성 | Plan Mode 전환 제안이 Skip됨 | 프롬프트에 수정 금지를 명시하고 `git status`로 무변경 확인 |

## 테스트 결과

| 테스트 | 기대 결과 | 실제 결과 | 통과 |
|---|---|---|---|
| 빈 상태 | 안내 표시 | "아직 작성된 노트가 없습니다" 표시 | ✅ |
| 정상 노트 추가 | 목록 반영 | 목록 추가, 자동 선택, 폼 초기화 | ✅ |
| 빈 제목 | 저장 차단 | "제목을 입력해 주세요." 표시, 저장 안 됨 | ✅ |
| 공백 제목 | 저장 차단 | 동일하게 차단 (`trim()` 동작) | ✅ |
| 노트 수정 | 해당 노트만 변경 | 대상 노트만 변경, `updatedAt` 갱신, 다른 노트 불변 | ✅ |
| 노트 삭제 | 목록·선택 상태 정리 | 목록 제거, 상세가 빈 상태로 전환 | ✅ |
| 편집 중 다른 노트 클릭 | 편집 대상 유지 | 상세만 전환, 폼은 편집 중 노트 유지 | ✅ |
| 편집 중 노트 삭제 | 폼 초기화 | 작성 모드 복귀, 입력값 초기화 | ✅ |
| 브라우저 콘솔 | 오류 없음 | 오류·경고 0건 | ✅ |
| build | 오류 없이 완료 | `npm run build` 성공, lint 0건 | ✅ |

## 한계와 추가 개선점

### 한계

- 새로고침하면 노트가 사라짐. 저장 기능은 과제의 선택 범위여서 구현하지 않음
- 삭제 확인 절차가 없어 실수로 지울 수 있음
- 노트가 많아졌을 때의 검색·정렬이 없음
- 자동화된 테스트 코드가 없어 검증이 수동 확인에 의존함

### 추가 개선점

- LocalStorage 연동
- 삭제 확인 다이얼로그
- 검색·정렬
- 테스트 코드 도입