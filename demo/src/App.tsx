import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Editor } from './routes/Editor'
import { Test } from './routes/Test'

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
