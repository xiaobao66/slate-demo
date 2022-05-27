import React from 'react'

function CodeElement(props) {
  return <pre {...props.attributes}>{props.children}</pre>
}

export { CodeElement }
