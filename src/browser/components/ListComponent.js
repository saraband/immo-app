import React from 'react';
import { connect } from 'react-redux';
import { requestList } from 'Actions/index'
import Image from './Image'

const ListItem = ({
  id,
  imgSrc,
  name,
  price,
  area,
  description
}) => (
  <div class='list-item'>
    <div class='list-item-image'>
      <Image src={imgSrc + '&id=' + id} alt={name} />
    </div>
    <div class='list-item-description'>
      <h3>{name}</h3>
      <h5>{price} €</h5>
      <h5>{area} m²</h5>
      <p>{description}</p>
    </div>
  </div>
)

class ListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      requestList,
      isRetrievingData,
      list
    } = this.props

    if(!list.length) {
      return (
        <div id='list-container'>
          <p>No results yet, time to hit the form !</p>
        </div>
      )
    }

    if(isRetrievingData) {
      return(
        <div id='list-container'>
          <p>Retrieving data from API...</p>
        </div>
      )
    }

    return(
      <div id='list-container'>
        {list.map(item => <ListItem key={item.id} {...item} />)}
      </div>
    )
  }

  componentDidMount() {
    this.props.requestList({from: 0, to: 100000}, 'house')
  }
}

const mapStateToProps = state => {
  return {
    isRetrievingData: state.isRetrievingData,
    list: state.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestList: (price, type) => dispatch(requestList(price, type))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ListComponent)