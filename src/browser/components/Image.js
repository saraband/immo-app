import React from 'react'
import loading from './loading.png'

export default class Image extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  render() {
    const { isLoading } = this.state;
    const {
      alt,
      src
    } = this.props

    return (
      <React.Fragment>
        <img
          src={loading}
          style={{visibility: (isLoading ? 'visible' : 'hidden'), width: '50px'}}
          />
        <img
          src={src}
          alt={alt} 
          style={{visibility: (!isLoading ? 'visible' : 'hidden')}}
          onLoad={() => this.setState({isLoading: false})}
        />
      </React.Fragment>
    )
  }
}