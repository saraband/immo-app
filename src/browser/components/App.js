import React from 'react'
import { connect } from 'react-redux'
import ListComponent from './ListComponent'
import InputComponent from './InputComponent'
import './App.scss'
import reactIcon from './reactIcon.png'
import ShowPropertyComponent from './ShowPropertyComponent'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isPropertyPanelOpen } = this.props
    return(
      <div id='app-container'>
        {isPropertyPanelOpen ? <ShowPropertyComponent /> : null}
        <h1 id='banner' ><img src={reactIcon} />Immo-App</h1>
        <InputComponent />
        <ListComponent />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isPropertyPanelOpen: state.isPropertyPanelOpen
  }
}

export default connect(mapStateToProps)(App);