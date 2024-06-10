import { appApi, diariesApi } from 'shared/api'

export const apiReducers = {
  [appApi.reducerPath]: appApi.reducer,
  [diariesApi.reducerPath]: diariesApi.reducer,
}

export const apiMiddleware = [appApi.middleware, diariesApi.middleware]
