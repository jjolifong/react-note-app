import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Note } from './types'

export interface NotesState {
  notes: Note[]
  selectedNoteId: string | null
}

const initialState: NotesState = {
  notes: [],
  selectedNoteId: null,
}

export interface UpdateNotePayload {
  id: string
  title: string
  content: string
  updatedAt: string
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer(state, action: PayloadAction<Note>) {
        state.notes.push(action.payload)
      },
      prepare(title: string, content: string) {
        const now = new Date().toISOString()
        const note: Note = {
          id: crypto.randomUUID(),
          title: title.trim(),
          content: content.trim(),
          createdAt: now,
          updatedAt: now,
        }
        return { payload: note }
      },
    },
    updateNote: {
      reducer(state, action: PayloadAction<UpdateNotePayload>) {
        const target = state.notes.find((note) => note.id === action.payload.id)

        if (!target) {
          return
        }

        target.title = action.payload.title
        target.content = action.payload.content
        target.updatedAt = action.payload.updatedAt
      },
      prepare(id: string, title: string, content: string) {
        return {
          payload: {
            id,
            title: title.trim(),
            content: content.trim(),
            updatedAt: new Date().toISOString(),
          },
        }
      },
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload)

      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null
      }
    },
    selectNote(state, action: PayloadAction<string | null>) {
      state.selectedNoteId = action.payload
    },
  },
})

export const { addNote, updateNote, deleteNote, selectNote } = notesSlice.actions

export default notesSlice.reducer

export const selectAllNotes = (state: { notes: NotesState }): Note[] => state.notes.notes

export const selectSelectedNoteId = (state: { notes: NotesState }): string | null =>
  state.notes.selectedNoteId

export const selectSelectedNote = (state: { notes: NotesState }): Note | null => {
  const { notes, selectedNoteId } = state.notes

  if (selectedNoteId === null) {
    return null
  }

  return notes.find((note) => note.id === selectedNoteId) ?? null
}
