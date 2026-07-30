const starterChecklist = [
  'AGENT_GUIDE.md와 docs 문서를 읽습니다.',
  'Antigravity IDE에서 최초 Implementation Plan을 검토합니다.',
  'Note 타입과 Redux store 구조부터 설계합니다.',
  '노트 CRUD를 구현하고 npm run build로 검증합니다.',
  'diff와 실제 화면을 확인한 뒤 README를 완성합니다.',
]

function App() {
  return (
    <main className="app-shell">
      <section className="starter-card" aria-labelledby="starter-title">
        <p className="eyebrow">Assignment 07 · Starter</p>
        <h1 id="starter-title">React 노트 앱</h1>
        <p className="lead">
          React·TypeScript 실행 환경과 Redux Toolkit 의존성만 준비되어 있습니다.
          노트 기능과 store는 Antigravity IDE에서 직접 설계하고 구현하세요.
        </p>

        <div className="status-box" role="status">
          <strong>Starter 상태</strong>
          <span>실행 화면 정상 · CRUD 미구현 · store 미구성</span>
        </div>

        <h2>다음 작업</h2>
        <ol className="checklist">
          {starterChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <div className="commands" aria-label="실행 명령">
          <code>npm install</code>
          <code>npm run dev</code>
          <code>npm run build</code>
        </div>
      </section>
    </main>
  )
}

export default App
