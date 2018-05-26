import React from 'react'
import './Carousel.scss'
import Animated from 'animated/lib/targets/react-dom'

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentSlide: 0,
      marginLeft: new Animated.Value(0)
    }

    this.numSlides = props.children.length
  }

  renderComputedChildren = (children) => {
    const {
      width, 
      height
    } = this.props

    return children.map(c => {
      const style = {
        ...c.props.style,
        display: 'inline-block',
        backgroundColor: 'purple',
        width: width + 'px',
        height: height + 'px'
      }

      return React.cloneElement(c, {style})
    })
  }

  handleClick = () => {
    Animated.timing(this.state.marginLeft, {toValue: 800}).start()
  }

  render() {
    const {
      children,
      width,
      height
    } = this.props
    const { marginLeft } = this.state

    return(
      <div className='carousel-container'>
        <div className='carousel-arrows'>
          <button onClick={this.handleClick}>right</button>
        </div>
        <div className='slides-container'
          style={{
            width: (width * this.numSlides) + 'px',
            height: height + 'px',
            left: marginLeft
          }} >
          {this.renderComputedChildren(children)}
        </div>
      </div>
    )
  }
}