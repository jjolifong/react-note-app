import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteNote, selectSelectedNote } from './notesSlice'

function NoteDetail() {
  const dispatch = useAppDispatch()
  const selectedNote = useAppSelector(selectSelectedNote)

  if (!selectedNote) {
    return (
      <section className="note-detail" aria-labelledby="note-detail-title">
        <h2 id="note-detail-title">노트 내용</h2>
        <p className="empty-state" role="status">
          선택된 노트가 없습니다. 목록에서 노트를 선택해 주세요.
        </p>
      </section>
    )
  }

  return (
    <section className="note-detail" aria-labelledby="note-detail-title">
      <div className="note-detail-header">
        <h2 id="note-detail-title">{selectedNote.title}</h2>
        <button type="button" onClick={() => dispatch(deleteNote(selectedNote.id))}>
          삭제
        </button>
      </div>

      <p className="note-detail-content">{selectedNote.content}</p>

      <p className="note-detail-meta">
        마지막 수정: {new Date(selectedNote.updatedAt).toLocaleString()}
      </p>
    </section>
  )
}

export default NoteDetail
