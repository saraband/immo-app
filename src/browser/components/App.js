import React from 'react'
import { connect } from 'react-redux'
import ListComponent from './ListComponent'
import InputComponent from './InputComponent'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id='app-container'>
        <h1>Immo-App</h1>
        <InputComponent />
        <ListComponent />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    
  }
}

export default connect(mapStateToProps)(App);