import { combineReducers } from 'redux'
import {
  LIST_REQUEST,
  LIST_REQUEST_SUCCESS,
  LIST_REQUEST_FAILED
} from 'Actions/index'

function isRetrievingData(state = false, action) {
  switch(action.type) {
    case LIST_REQUEST:
      return true
    case LIST_REQUEST_SUCCESS:
    case LIST_REQUEST_FAILED:
      return false
    default:
      return state;
  }
}

function list(state = [], action) {
  switch(action.type) {
    case LIST_REQUEST_SUCCESS:
      return action.list
    default:
      return state
  }
}

export default combineReducers({
  isRetrievingData,
  list
})