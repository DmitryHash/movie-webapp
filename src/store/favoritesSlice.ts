import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../components/MainPageFilms/Movies/RecommendationsFilm";


interface IFavoritesState {
  movies: IMovie[];
}

const initialState: IFavoritesState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<IMovie>) => {
      state.movies.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

export const { addMovie, removeMovie } = favoritesSlice.actions;
export default favoritesSlice.reducer;