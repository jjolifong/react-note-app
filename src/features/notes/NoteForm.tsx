import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNote, selectAllNotes, selectNote, selectSelectedNoteId, updateNote } from './notesSlice'

type Mode = 'create' | 'edit'

function NoteForm() {
  const dispatch = useAppDispatch()
  const notes = useAppSelector(selectAllNotes)
  const selectedNoteId = useAppSelector(selectSelectedNoteId)

  const [mode, setMode] = useState<Mode>('create')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (mode !== 'edit' || editingNoteId === null) {
      return
    }

    const targetStillExists = notes.some((note) => note.id === editingNoteId)

    if (!targetStillExists) {
      setMode('create')
      setEditingNoteId(null)
      setTitle('')
      setContent('')
      setError('')
    }
  }, [mode, editingNoteId, notes])

  const handleStartCreate = () => {
    setMode('create')
    setEditingNoteId(null)
    setTitle('')
    setContent('')
    setError('')
  }

  const handleStartEdit = () => {
    const target = notes.find((note) => note.id === selectedNoteId)

    if (!target) {
      return
    }

    setMode('edit')
    setEditingNoteId(target.id)
    setTitle(target.title)
    setContent(target.content)
    setError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (title.trim() === '') {
      setError('제목을 입력해 주세요.')
      return
    }

    if (mode === 'create') {
      const action = addNote(title, content)
      dispatch(action)
      dispatch(selectNote(action.payload.id))
      setTitle('')
      setContent('')
      setError('')
      return
    }

    if (editingNoteId === null) {
      return
    }

    dispatch(updateNote(editingNoteId, title, content))
    setError('')
  }

  return (
    <section className="note-form" aria-labelledby="note-form-title">
      <div className="note-form-header">
        <h2 id="note-form-title">{mode === 'create' ? '새 노트' : '노트 수정'}</h2>
        <div className="note-form-mode-buttons">
          <button type="button" onClick={handleStartCreate}>
            새 노트
          </button>
          <button type="button" onClick={handleStartEdit} disabled={selectedNoteId === null}>
            수정
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="note-title">제목</label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="note-content">내용</label>
        <textarea
          id="note-content"
          rows={6}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        {error !== '' && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">{mode === 'create' ? '추가' : '저장'}</button>
      </form>
    </section>
  )
}

export default NoteForm
