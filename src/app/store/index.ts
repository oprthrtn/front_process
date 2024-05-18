import { configureStore } from '@reduxjs/toolkit'
import { apiMiddleware, apiReducers } from './api'

export const store = configureStore({
  reducer: {
    ...apiReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware),
})
