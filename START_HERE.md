# START HERE — Antigravity IDE

## 1. 압축 해제 후 프로젝트 열기

Antigravity IDE에서 이 폴더를 프로젝트 루트로 엽니다.

## 2. 의존성 설치와 기준 실행

```bash
npm install
npm run dev
npm run build
```

`npm install` 후 생성된 잠금 파일은 저장소에 포함합니다.

## 3. 권장 Antigravity 설정

- Review-driven development
- Planning Mode
- Artifact Review Policy: Request Review
- Terminal Command Auto Execution: Request Review
- Workspace 밖 파일 접근: 차단
- Plugin·MCP·다중 에이전트: 사용하지 않음

## 4. 첫 대화 프롬프트

```text
다음 문서를 먼저 읽어 주세요.

- AGENT_GUIDE.md
- docs/spec.md
- docs/plan.md
- .agents/rules/assignment7.md

아직 코드를 수정하지 마세요.

1. 현재 프로젝트 구조와 실행 방법
2. TypeScript와 상태관리 준비 상태
3. spec.md와 현재 코드의 차이
4. 3개 마일스톤 구현 계획
5. 예상 변경 파일
6. 필요한 패키지 또는 설정 변경
7. build와 기능 검증 방법

을 Implementation Plan으로 제시하고 승인을 기다려 주세요.
```

## 5. 계획 검토 후 구현

Implementation Plan에서 다음을 확인한 뒤 승인합니다.

- React·TypeScript·상태관리 요구사항을 지키는가
- 인증·DB·배포 등 범위 밖 기능이 없는가
- 노트 데이터가 store에서 관리되는가
- 검증 방법이 포함되어 있는가

## 6. 전체 초안 검토

```bash
npm run build
npm run dev
```

다음을 직접 확인합니다.

- 빈 상태
- 노트 작성
- 빈 제목 차단
- 노트 선택·수정·삭제
- 삭제 후 선택 상태
- 브라우저 콘솔
- Review Changes의 diff

## 7. 수정과 완료

발견한 중요한 문제 1~3개만 선택해 원인과 최소 수정 계획을 요청합니다.
수정 후 다시 build와 핵심 기능을 확인합니다.

마지막으로 `docs/plan.md`, `README.md`, `WORK_LOG.md`를 완성하고 GitHub 저장소 URL을 제출합니다.
