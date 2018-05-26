import React from 'react'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import { requestList } from 'Actions/index'

class InputComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      priceFrom: '',
      priceTo: '',
      type: 'all'
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {
      priceFrom,
      priceTo,
      type
    } = this.state

    if(isNaN(priceFrom)
    || isNaN(priceTo)
    || !priceTo
    || !priceFrom)
      return

    console.log({
      price: {to: priceTo, from: priceFrom},
      type
    })

    this.props.requestList({to: parseInt(priceTo), from: parseInt(priceFrom)}, type);
  }

  render() {
    const {
      priceFrom,
      priceTo,
      type
    } = this.state

    const { isRetrievingData } = this.props

    return(
      <div id='input-container' class='form-group'>
        <ReactTooltip effect='solid' />
        <p>input-container</p>
        <form onSubmit={this.handleSubmit} >
          <input type='text' name='priceFrom' placeholder='From'
            value={priceFrom} onChange={this.handleChange}
            class='form-control-plaintext' />
          <input type='text' name='priceTo' placeholder='To'
            value={priceTo} onChange={this.handleChange} />
          <select name='type' onChange={this.handleChange}
            value={type} >
            <option value='all'>All</option>
            <option value='appartment'>Appartment</option>
            <option value='house'>House</option>
          </select>
          <button disabled={isRetrievingData}
            class='btn btn-primary mb-2'
            data-tip='Redux' >Search</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isRetrievingData: state.isRetrievingData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestList: (price, type) => dispatch(requestList(price, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputComponent)