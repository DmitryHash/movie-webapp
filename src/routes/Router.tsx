import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { SignInPage } from "../pages/SignInPage/SignInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { useAppSelector } from "../store/hooks";
import { ProtectedRoute } from "./ProtectedRoute";
import { Settings } from "../pages/Settings/Settings";
import { MovieInfo } from "../components/MainPageFilms/Movies/MovieInfo";
import { Favorites } from "../pages/FavoritesPage/Favorites";
import { MovieListFilter } from '../components/MovieListFilter/MovieListFilter';
import { FilteredMoviesPage } from '../pages/FilteredMovieList/FilteredMoviePage';

export const Router: FC = () => {
    // const { confirmEmail } = useAppSelector((state) => state.confirmEmail);

    return (
        <Routes>
            <Route path='/favorites' element={<Favorites handleFilterMovie={function (): void {
                throw new Error('Function not implemented.');
            }} handleMoveMain={function (): void {
                throw new Error('Function not implemented.');
            }} />} />

            {/* <Route path='/main' element={<MainPage/>}/> */}
            <Route path="/settings" element={<Settings />} />
            <Route
                path=""
                element={
                    <MainPage
                        handleFilterMovie={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        handleMoveMain={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                }
            />

            <Route
                path="/movies/:id"
                element={
                    <MovieInfo
                        match={{
                            params: {
                                id: "",
                            },
                        }}
                    />
                }
            />
            <Route path="/filtered-movies" element={<FilteredMoviesPage />} />
            <Route path="/" element={<MovieListFilter />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            {/* <Route element={<ProtectedRoute access={!!confirmEmail} />}>

            </Route> */}

            <Route path="*" element={<>Такой страницы не существует</>} />
        </Routes>
    );
};
