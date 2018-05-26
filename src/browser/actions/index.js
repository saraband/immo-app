export const LIST_REQUEST = 'LIST_REQUEST'
export const LIST_REQUEST_SUCCESS = 'LIST_REQUEST_SUCCESS'
export const LIST_REQUEST_FAILED = 'LIST_REQUEST_FAILED'
export const PROPERTY_DATA_REQUEST = 'PROPERTY_DATA_REQUEST'
export const PROPERTY_DATA_SUCCESS = 'PROPERTY_DATA_SUCCESS'
export const PROPERTY_DATA_FAILED = 'PROPERTY_DATA_FAILED'
export const SHOW_PROPERTY_PANEL = 'SHOW_PROPERTY_PANEL'
export const HIDE_PROPERTY_PANEL = 'HIDE_PROPERTY_PANEL'

export const requestList = (price, type) => {
  return (dispatch) => {
    dispatch({type: LIST_REQUEST})

    fetch('/list', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        price,
        type
      })
    })
    .then(data => data.json(),
      error => {
        console.error(error)
        dispatch({type: LIST_REQUEST_FAILED})
    })
    .then(list => {
      dispatch({
        type: LIST_REQUEST_SUCCESS,
        list
      })
    })
  }
}

export const requestPropertyData = (id) => {
  return (dispatch) => {
    dispatch({type: PROPERTY_DATA_REQUEST})

    fetch('/property', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        id
      })
    })
    .then(data => data.json(),
      error => {
        console.error(error)
        dispatch({type: PROPERTY_DATA_FAILED})
    })
    .then(data => {
      console.log(data)
      dispatch({
        type: PROPERTY_DATA_SUCCESS,
        data
      })
    })
  }
}