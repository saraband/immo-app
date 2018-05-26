import React from 'react'
import { connect } from 'react-redux'
import { timeSince } from 'Utils/index'
import Image from './Image'
import {
  requestPropertyData,
  SHOW_PROPERTY_PANEL
} from 'Actions/index'

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const {
      id,
      showPropertyPanel,
      requestPropertyData
    } = this.props

    requestPropertyData(id)
    showPropertyPanel()
  }

  render() {
    const {
      id,
      imgSrc,
      owner,
      title,
      price,
      date,
      area,
      description
    } = this.props

    return(
      <div class='list-item' onClick={this.handleClick} >
        <div class='list-item-image'>
          <Image src={imgSrc + '&id=' + id} alt={name} />
        </div>
        <div class='list-item-description'>
          <h3>{title}</h3>
          <h5>{price} € for {area} m² <span className='list-item-date'>{timeSince(date*1000)}</span></h5>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPropertyData: (id) => dispatch(requestPropertyData(id)),
    showPropertyPanel: () => dispatch({type: SHOW_PROPERTY_PANEL})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ListItem)