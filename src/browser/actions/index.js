export const LIST_REQUEST = 'LIST_REQUEST'
export const LIST_REQUEST_SUCCESS = 'LIST_REQUEST_SUCCESS'
export const LIST_REQUEST_FAILED = 'LIST_REQUEST_FAILED'

export const requestList = (price, type) => {
  return dispatch => {
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