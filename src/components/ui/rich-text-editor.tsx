'use client'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, List, ListOrdered, Link, X } from 'lucide-react'

interface SimpleRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  readOnly?: boolean
  minHeight?: string
  maxHeight?: string
}

export function RichTextEditor({
  value,
  onChange,
  className,
  placeholder = 'Comece a escrever...',
  readOnly = false,
  minHeight = '200px',
  maxHeight = '500px'
}: SimpleRichTextEditorProps) {
  const [mounted, setMounted] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const executeCommand = (command: string, value?: string) => {
    if (readOnly) return

    if (editorRef.current) {
      editorRef.current.focus()
    }

    document.execCommand(command, false, value)

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus()
      }
      updateContent()
    }, 0)
  }

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      if (content !== value) {
        onChange(content)
      }
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value || ''
      setIsInitialized(true)
    }
  }, [mounted, value, isInitialized])

  useEffect(() => {
    if (mounted && editorRef.current && isInitialized) {
      if (editorRef.current.innerHTML !== value) {
        const selection = window.getSelection()
        const range = selection?.getRangeAt(0)
        const savedSelection = range
          ? { startOffset: range.startOffset, endOffset: range.endOffset }
          : null

        editorRef.current.innerHTML = value || ''
        if (savedSelection && selection && editorRef.current.firstChild) {
          const newRange = document.createRange()
          newRange.setStart(editorRef.current.firstChild, savedSelection.startOffset)
          newRange.setEnd(editorRef.current.firstChild, savedSelection.endOffset)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
      }
    }
  }, [value, mounted, isInitialized])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;')
      updateContent()
    }
  }

  if (!mounted) {
    return (
      <div
        className={cn('border rounded-md w-full relative min-h-[200px] bg-background', className)}
        style={{ minHeight }}
      >
        <div className="p-3 text-muted-foreground absolute inset-0">{value || placeholder}</div>
      </div>
    )
  }

  return (
    <div className={cn('simple-rich-editor w-full border rounded-md overflow-hidden', className)}>
      <style jsx global>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: var(--muted-foreground, #9ca3af);
          position: absolute;
          pointer-events: none;
        }

        .editor-content {
          direction: ltr; /* Força a direção do texto */
          unicode-bidi: isolate; /* Isola o comportamento bidirecional */
          text-align: start; /* Garante o alinhamento adequado */
        }
      `}</style>

      {!readOnly && (
        <div className="toolbar flex items-center gap-1 p-2 bg-muted border-b">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => executeCommand('bold')}
            title="Negrito"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => executeCommand('italic')}
            title="Itálico"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => executeCommand('underline')}
            title="Sublinhado"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <div className="h-4 border-l mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => executeCommand('insertUnorderedList')}
            title="Lista não ordenada"
            onMouseDown={(e) => e.preventDefault()}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => executeCommand('insertOrderedList')}
            title="Lista ordenada"
            onMouseDown={(e) => e.preventDefault()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="h-4 border-l mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              const url = prompt('Insira o URL do link:')
              if (url) executeCommand('createLink', url)
            }}
            title="Inserir link"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => executeCommand('removeFormat')}
            title="Remover formatação"
            onMouseDown={(e) => e.preventDefault()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        className={cn(
          'editor-content p-3 outline-none relative',
          readOnly ? 'cursor-default' : 'cursor-text'
        )}
        style={{
          minHeight,
          maxHeight,
          overflowY: 'auto',
          direction: 'ltr',
          textAlign: 'left'
        }}
        onInput={updateContent}
        onBlur={updateContent}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        dir="ltr"
        spellCheck="true"
      />
    </div>
  )
}

export function RichTextViewer({ content, className }: { content: string; className?: string }) {
  return (
    <div
      className={cn('prose dark:prose-invert max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  )
}
