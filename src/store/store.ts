import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./theme/reducer";
import { postsReducer } from "./posts/reducer";
import { confirmEmailReducer } from "./confirmEmail/reducer";
import favoritesReducer  from ".//favoritesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        posts: postsReducer,
        confirmEmail: confirmEmailReducer,
        favorites: favoritesReducer,
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;