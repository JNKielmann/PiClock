import * as React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ClockPanel from './ClockPanel'





export default class App extends React.Component {
  render() {
    return (
      <ClockPanel />
    );
  }
}