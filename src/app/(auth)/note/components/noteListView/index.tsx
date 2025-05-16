import { formatDate, truncateText } from '@/common/util'
import { TGetNoteResponse } from '@/service/note/type'
import { CNote } from '..'

export default function NoteListView({ data: notes }: { data: TGetNoteResponse | undefined }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Lista de Notas ({notes?.total})</h2>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted py-2 px-4 grid grid-cols-12 text-sm font-medium">
          <div className="col-span-5">Título</div>
          <div className="col-span-5">Conteúdo</div>
          <div className="col-span-1">Data</div>
          <div className="col-span-1">Ações</div>
        </div>

        {notes?.total === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Nenhuma nota encontrada. Clique em Nova Nota para criar uma.
          </div>
        ) : (
          <div className="divide-y">
            {notes?.data.map((note) => (
              <div
                key={note.id}
                className="grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50"
              >
                <div className="col-span-5 font-medium truncate">
                  <div
                    className={`w-3 h-3 rounded-full inline-block mr-2`}
                    style={{ backgroundColor: note.color || '#cbd5e1' }}
                  ></div>
                  {note.title}
                </div>
                <div className="col-span-5 text-sm text-muted-foreground truncate">
                  {truncateText(note.content.replace(/<[^>]*>?/gm, ''), 100)}
                </div>
                <div className="col-span-1 text-sm text-muted-foreground">
                  {formatDate(note.createdAt)}
                </div>
                <div className="col-span-1 flex gap-2">
                  <CNote.update data={note} />
                   <CNote.delete data={note} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
