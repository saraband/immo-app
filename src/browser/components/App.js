import React from 'react'
import { connect } from 'react-redux'
import ListComponent from './ListComponent'
import InputComponent from './InputComponent'
import './App.scss'
import reactIcon from './reactIcon.png'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id='app-container'>
        <h1 id='banner'><img src={reactIcon} />Immo-App</h1>
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