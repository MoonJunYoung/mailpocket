import React from 'react'
import { UPDATE_CATEGORYS } from '../actions/categorys';


export const initialState = {
  id: 0,
  name: "",
  operating_status: false,
}

export const categorysReducers = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case UPDATE_CATEGORYS:
      return {
        ...state
      }
  }
  return {
    ...state
  }
}