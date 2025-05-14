import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { cryptoApi } from './crypto/cryptoApi'


export const makeStore = () => {
  return configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      authApi.middleware,
      cryptoApi.middleware
    ),
  })
}