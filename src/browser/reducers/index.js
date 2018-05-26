import { combineReducers } from 'redux'
import {
  LIST_REQUEST,
  LIST_REQUEST_SUCCESS,
  LIST_REQUEST_FAILED,
  PROPERTY_DATA_REQUEST,
  PROPERTY_DATA_SUCCESS,
  PROPERTY_DATA_FAILED,
  SHOW_PROPERTY_PANEL,
  HIDE_PROPERTY_PANEL
} from 'Actions/index'

const isPropertyPanelOpen = (state = false, action) => {
  switch(action.type) {
    case SHOW_PROPERTY_PANEL:
      return true
    case HIDE_PROPERTY_PANEL:
      return false
    default:
      return state;
  }
}

const isRetrievingData = (state = false, action) => {
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

const isRetrievingPropertyData = (state = false, action) => {
  switch(action.type) {
    case PROPERTY_DATA_REQUEST:
      return true
    case PROPERTY_DATA_SUCCESS:
    case PROPERTY_DATA_FAILED:
      return false
    default:
      return state;
  }
}

const currentPropertyData = (state = {}, action) => {
  switch(action.type) {
    case PROPERTY_DATA_SUCCESS:
      return action.data
    default:
      return state;
  }
}

const list = (state = [], action) => {
  switch(action.type) {
    case LIST_REQUEST_SUCCESS:
      return action.list
    default:
      return state
  }
}

export default combineReducers({
  isRetrievingData,
  list,
  isRetrievingPropertyData,
  currentPropertyData,
  isPropertyPanelOpen
})