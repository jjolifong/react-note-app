import { useAppSelector } from './app/hooks'
import { selectAllNotes } from './features/notes/notesSlice'

function App() {
  const notes = useAppSelector(selectAllNotes)

  return (
    <main className="app-shell">
      <section className="notes-app" aria-labelledby="app-title">
        <h1 id="app-title">노트</h1>

        {notes.length === 0 && (
          <p className="empty-state" role="status">
            아직 작성된 노트가 없습니다. 새 노트를 작성해 보세요.
          </p>
        )}
      </section>
    </main>
  )
}

export default App
