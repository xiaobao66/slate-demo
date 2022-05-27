import React, { useCallback, useMemo } from 'react'
import {
  createEditor,
  BaseEditor,
  Editor as SlateEditor,
  Transforms,
  Text,
} from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { DefaultElement, CodeElement, LeafElement } from './elements'

declare module 'slate/dist' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
  }
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

function Editor() {
  const editor = useMemo(() => withReact(createEditor()), [])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <LeafElement {...props} />
  }, [])

  const onKeyDown = useCallback(e => {
    if (!e.ctrlKey) {
      return
    }

    switch (e.key) {
      case '`': {
        e.preventDefault()
        const [match] = SlateEditor.nodes(editor, {
          match: n => n.type === 'code',
        })
        Transforms.setNodes(
          editor,
          { type: match ? 'paragraph' : 'code' },
          { match: n => SlateEditor.isBlock(editor, n) }
        )
        break
      }
      case 'b': {
        e.preventDefault()
        Transforms.setNodes(
          editor,
          { bold: true },
          { match: n => Text.isText(n), split: true }
        )
        break
      }
    }
  }, [])

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  )
}

export { Editor }
