export default function FeatureShowcase() {
  return (
    <div className="hidden md:flex flex-1 bg-primary">
      <div className="flex flex-col justify-center p-12 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6 text-zinc-900">
          Bem-vindo ao TASK-HUB
        </h1>
        <p className="text-xl mb-8 text-zinc-800">
          Seu assistente pessoal para gerenciar tarefas diárias, listas de compras e anotações
          importantes.
        </p>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-primary-foreground/20 p-2 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-900"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Gestão de Tarefas</h3>
              <p className="text-zinc-800">Organize suas tarefas por prioridade e categoria</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-primary-foreground/20 p-2 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-900"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Lista de Compras</h3>
              <p className="text-zinc-800">Crie listas de compras organizadas por categorias</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-primary-foreground/20 p-2 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-900"
              >
                <path d="M12 11h1v5h-1" />
                <path d="M12 7h.01" />
                <path d="M20.3 15.7a9 9 0 1 1-12.6-12.6 9 9 0 0 1 12.6 12.6Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Anotações</h3>
              <p className="text-zinc-800">
                Salve informações importantes com editor de texto formatado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
