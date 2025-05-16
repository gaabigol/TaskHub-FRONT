import { TGetNoteResponse } from '@/service/note/type'
import { CNote } from '..'

export default function NoteViewContainer({
  viewMode,
  data
}: {
  viewMode: 'list' | 'grid' | 'kanban'
  data: TGetNoteResponse | undefined
}) {
  switch (viewMode) {
    case 'grid':
      return <CNote.noteGridView data={data} />
    case 'kanban':
      return <CNote.noteMasonryView data={data} />
    case 'list':
    default:
      return <CNote.noteListView data={data} />
  }
}
