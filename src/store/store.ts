import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./theme/reducer";
import favoritesReducer  from ".//favoritesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        favorites: favoritesReducer,
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;