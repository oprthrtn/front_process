import { appApi, diariesApi } from 'shared/api'
import { internshipsApi } from 'shared/api/init/internshipsApi'

export const apiReducers = {
  [appApi.reducerPath]: appApi.reducer,
  [diariesApi.reducerPath]: diariesApi.reducer,
  [internshipsApi.reducerPath]: internshipsApi.reducer,
}

export const apiMiddleware = [appApi.middleware, diariesApi.middleware, internshipsApi.middleware]
