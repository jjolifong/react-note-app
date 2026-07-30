import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAllNotes, selectSelectedNoteId, selectNote } from './notesSlice'

function NoteList() {
  const notes = useAppSelector(selectAllNotes)
  const selectedNoteId = useAppSelector(selectSelectedNoteId)
  const dispatch = useAppDispatch()

  if (notes.length === 0) {
    return (
      <p className="empty-state" role="status">
        아직 작성된 노트가 없습니다. 새 노트를 작성해 보세요.
      </p>
    )
  }

  return (
    <ul className="note-list">
      {notes.map((note) => {
        const isSelected = note.id === selectedNoteId
        const itemClassName = isSelected
          ? 'note-list-item note-list-item--selected'
          : 'note-list-item'

        return (
          <li key={note.id}>
            <button
              type="button"
              className={itemClassName}
              aria-current={isSelected}
              onClick={() => dispatch(selectNote(note.id))}
            >
              <span className="note-list-item-title">{note.title}</span>
              <span className="note-list-item-date">
                {new Date(note.updatedAt).toLocaleString()}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default NoteList
