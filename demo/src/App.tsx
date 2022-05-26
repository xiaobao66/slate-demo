import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Editor } from './Editor'
import { Test } from './Test'

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/editor'}>
          <Editor />
        </Route>
        <Route path={'/test'}>
          <Test />
        </Route>
      </Switch>
    </Router>
  )
}

export { App }
