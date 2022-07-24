import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { scrollApi } from "../services/infiniteScrollAPI"

export const store = configureStore({
	reducer: {
		[scrollApi.reducerPath]: scrollApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(scrollApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
