import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/common/util'
import { RichTextViewer } from '@/components/ui/rich-text-editor'
import { TGetNoteResponse } from '@/service/note/type'
import { CNote } from '..'

export default function NoteMasonryView({ data: notes }: { data: TGetNoteResponse | undefined }) {
  const getColumnNotes = (colIndex: number, totalColumns: number) => {
    return notes?.data.filter((_, index) => index % totalColumns === colIndex)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Painel de Notas</h2>
      </div>

      {notes?.total === 0 ? (
        <div className="p-8 text-center border rounded-lg text-muted-foreground">
          Nenhuma nota encontrada. Clique em Nova Nota para criar uma.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            {getColumnNotes(0, 3)?.map((note) => (
              <Card
                key={note.id}
                className="hover:shadow-md transition-shadow overflow-hidden"
                style={{ borderTopColor: note.color || '#cbd5e1', borderTopWidth: '4px' }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
                </CardHeader>
                <CardContent>
                  <RichTextViewer content={note.content} className="text-sm" />
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-end gap-2 pt-2 pb-2">
                  <CNote.update data={note} />
                  <CNote.delete data={note} />
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {getColumnNotes(1, 3)?.map((note) => (
              <Card
                key={note.id}
                className="hover:shadow-md transition-shadow overflow-hidden"
                style={{ borderTopColor: note.color || '#cbd5e1', borderTopWidth: '4px' }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
                </CardHeader>
                <CardContent>
                  <RichTextViewer content={note.content} className="text-sm" />
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-end gap-2 pt-2 pb-2">
                  <CNote.update data={note} />
                  <CNote.delete data={note} />
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-4  lg:block">
            {getColumnNotes(2, 3)?.map((note) => (
              <Card
                key={note.id}
                className="hover:shadow-md transition-shadow overflow-hidden"
                style={{ borderTopColor: note.color || '#cbd5e1', borderTopWidth: '4px' }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
                </CardHeader>
                <CardContent>
                  <RichTextViewer content={note.content} className="text-sm" />
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-end gap-2 pt-2 pb-2">
                  <CNote.update data={note} />
                  <CNote.delete data={note} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
