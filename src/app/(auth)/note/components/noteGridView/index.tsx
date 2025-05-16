import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/common/util'
import { RichTextViewer } from '@/components/ui/rich-text-editor'
import { TGetNoteResponse, TNote } from '@/service/note/type'
import { CNote } from '..'

export function NoteGridView({ data: notes }: { data: TGetNoteResponse | undefined }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Notas ({notes?.total})</h2>
      </div>

      {notes?.total === 0 ? (
        <div className="p-8 text-center border rounded-lg text-muted-foreground">
          Nenhuma nota encontrada. Clique em Nova Nota para criar uma.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes?.data.map((note: TNote) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-2" style={{ backgroundColor: note.color || '#cbd5e1' }}></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
              </CardHeader>
              <CardContent className="h-32 overflow-hidden">
                <RichTextViewer content={note.content} className="text-sm line-clamp-5" />
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-end gap-2 pt-2 pb-2">
                <CNote.update data={note} />
                <CNote.delete data={note} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
