import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { SignInPage } from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { Settings } from "../pages/Settings/Settings";
import { MovieInfo } from "../pages/MainPageFilms/Movies/MovieInfo";
import { Favorites } from "../pages/FavoritesPage/Favorites";
import { MovieListFilter } from '../components/MovieListFilter/MovieListFilter';
import { FilteredMoviesPage } from '../pages/FilteredMovieList/FilteredMoviePage';

export const Router: FC = () => {

    return (
        <Routes>
            <Route path='/favorites' element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="" element={<MainPage />} />
            <Route path="/movies/:id" element={<MovieInfo match={{params: {id: "",},}}/>} />
            <Route path="/filtered-movies" element={<FilteredMoviesPage />} />
            <Route path="/" element={<MovieListFilter />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<>Page is not found</>} />
        </Routes>
    );
};
