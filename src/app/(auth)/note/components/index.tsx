import { ViewModeToggle } from '@/components/viewModeToggle'
import NewNoteDialog from './newNoteDialog'
import NoteExportDropdown from './noteExportDropdown'
import { NoteGridView } from './noteGridView'
import NoteListView from './noteListView'
import NoteMasonryView from './noteMasoryView'
import NoteViewContainer from './noteViewContainer'
import NoteCardSkeleton from './skeleton/noteCardSkeleton'
import UpdateNote from './updateNote'
import DeleteNote from './deleteNote'

export const CNote = {
  exportNote: NoteExportDropdown,
  noteCardSkeleton: NoteCardSkeleton,
  newNote: NewNoteDialog,
  noteListView: NoteListView,
  noteGridView: NoteGridView,
  noteMasonryView: NoteMasonryView,
  noteViewContainer: NoteViewContainer,
  viewModeToggle: ViewModeToggle,
  update: UpdateNote,
  delete: DeleteNote
}
