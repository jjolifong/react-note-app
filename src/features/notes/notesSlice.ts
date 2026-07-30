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

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNote(state, action: PayloadAction<string | null>) {
      state.selectedNoteId = action.payload
    },
    // addNote, updateNote, deleteNote는 마일스톤 2에서 구현합니다.
  },
})

export const { selectNote } = notesSlice.actions

export default notesSlice.reducer

export const selectAllNotes = (state: { notes: NotesState }): Note[] => state.notes.notes

export const selectSelectedNoteId = (state: { notes: NotesState }): string | null =>
  state.notes.selectedNoteId
