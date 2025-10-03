import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { cryptoApi } from './crypto/cryptoApi'
import { chatApi } from './chat/chatApi'
import { favouritesApi } from './favourites/favouritesApi'
import { stripeApi } from './stripeApi/stripeApi'
import { cartApi } from './cart/cartApi'


export const makeStore = () => {
  return configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [favouritesApi.reducerPath]: favouritesApi.reducer,
        [stripeApi.reducerPath]: stripeApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      authApi.middleware,
      cryptoApi.middleware,
      chatApi.middleware,
      favouritesApi.middleware,
      stripeApi.middleware,
      cartApi.middleware,
    ),
  })
}