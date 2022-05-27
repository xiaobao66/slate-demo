import React from 'react'

function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>
}

export { DefaultElement }
