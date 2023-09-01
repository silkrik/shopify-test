import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface GlobalState {
  userName: string
  token: string
  tenant: string
  user_id: string
  selectedMenuItems: Array<string>,
}

const initialState: GlobalState = {
  user_id: window.localStorage.getItem('d5-jwt-user_id') || '',
  userName: window.localStorage.getItem('d5-userName') || '',
  token: window.localStorage.getItem('d5-jwt-token') || '',
  tenant: window.localStorage.getItem('d5-jwt-tenant') || '',
  selectedMenuItems: [],
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      window.localStorage.setItem('d5-userName', state.userName)
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      window.localStorage.setItem('d5-jwt-token', state.token)
    },
    updateUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload
      window.localStorage.setItem('d5-jwt-user_id', state.user_id)
    },
    updateTenant: (state, action: PayloadAction<string>) => {
      state.tenant = action.payload
      window.localStorage.setItem('d5-jwt-tenant', state.tenant)
    },
    setSelectedMenuItems: (state, action: PayloadAction<string>) => {
      state.selectedMenuItems = [action.payload]
    },
  },
})

export const {
  updateUserName,
  updateUserId,
  updateToken,
  updateTenant,
  setSelectedMenuItems,
} = globalSlice.actions

export default globalSlice.reducer
