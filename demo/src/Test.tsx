import React, { useCallback } from 'react'

function Test() {
  const onKeyDown = useCallback(e => {
    console.log('xxx')
  }, [])

  const onBeforeInput = useCallback(e => {
    console.log('zzz', e.data)
  }, [])

  const onInput = useCallback(() => {
    console.log('yyy')
  }, [])

  return (
    <div
      onKeyDown={onKeyDown}
      onInput={onInput}
      onBeforeInput={onBeforeInput}
      contentEditable
    >
      hello world
    </div>
  )
}

export { Test }
