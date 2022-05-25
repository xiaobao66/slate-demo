import React, { useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

function App() {
  const [editor] = useState(() => withReact(createEditor()))

  return null
}

export { App }
