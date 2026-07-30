import NoteDetail from './features/notes/NoteDetail'
import NoteForm from './features/notes/NoteForm'
import NoteList from './features/notes/NoteList'

function App() {
  return (
    <main className="app-shell">
      <section className="notes-app" aria-labelledby="app-title">
        <h1 id="app-title">노트</h1>

        <div className="notes-layout">
          <NoteList />

          <div className="notes-main">
            <NoteDetail />
            <NoteForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
