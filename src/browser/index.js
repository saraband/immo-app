import React from 'react'
import ReactDOM from 'react-dom'
import App from 'Components/App'
import rootReducer from 'Reducers/index'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Carousel from 'Components/Carousel'
import {
  createStore,
  applyMiddleware
} from 'redux'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
/*
const s = {
  width: '300px',
  height: '200px'
}

ReactDOM.render(
  <Carousel width='300' height='200'>
    <div style={{...s, backgroundColor: 'red'}}>Hello</div>
    <div style={{...s, backgroundColor: 'green'}}>les</div>
    <p style={{...s, backgroundColor: 'blue'}}>amis...</p>
  </Carousel>,
  document.getElementById('root')
)*/

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
