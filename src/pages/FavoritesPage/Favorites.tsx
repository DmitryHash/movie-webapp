import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeMovie, addMovie } from "../../store/favoritesSlice";
import { Link } from "react-router-dom";
import { IMovie } from "../../components/MainPageFilms/Movies/RecommendationsFilm";
import { TypographyText } from "../../components/Typography/TypographyText";
import { Logotype } from "../../assets/icons";



import { Header } from "../../components/Header/Header";
import "./Favorites.scss"
import { MovieListFilter } from "../../components/YearFilter/YearFilter";


interface FavoritesProps {
  handleFilterMovie: () => void;
  handleMoveMain: () => void;
}

export const Favorites: FC<FavoritesProps> = ({ handleFilterMovie, handleMoveMain }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const handleRemoveFromFavorites = (imdbID: string) => {
    dispatch(removeMovie(imdbID));
  };

  const handleAddToFavorites = (movie: IMovie) => {
    dispatch(addMovie(movie));
  };


  function handleTitleFilm(newValue: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="blog">
        <Logotype />
        <Header

          handleFilterMovie={handleFilterMovie}
          handleMoveMain={handleMoveMain}
          titleFilm={handleTitleFilm}
        />


      </div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <div className="container">
          <ul className="container--ul">
            {favorites.map((movie: IMovie) => (
              <li key={movie.imdbID}>
                <div className="movie-poster">
                  <button className="movie-poster--favorites" onClick={() => handleRemoveFromFavorites(movie.imdbID)}>
                  <TypographyText
                                    content="Remove Favorite"
                                    type='subline'
                                />
                  </button>
                  <button className="movie-poster--btn">
                    <TypographyText content={movie.imdbRating} type="subline" />
                  </button>
                  <img className="movie-poster--img" draggable="false" src={movie.Poster} alt={movie.Title} />
                  <Link to={`/movies/${movie.imdbID}`} className="movie-link">
                    <h3>{movie.Title} </h3>
                    <h2>{movie.Year}</h2>
                    <p>{movie.Genre.split(", ").join(" • ")}</p>
                  </Link>
                </div>

              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No favorite movies</p>
      )}
    </>
  );
};