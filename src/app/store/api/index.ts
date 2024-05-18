import { appApi } from 'shared/api'

export const apiReducers = {
  [appApi.reducerPath]: appApi.reducer,
}

export const apiMiddleware = [appApi.middleware]
