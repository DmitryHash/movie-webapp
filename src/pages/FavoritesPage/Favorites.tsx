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


  function handleTitleFilm(newValue: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="blog">
        <div className="mainLogo">
          <Link to={'/'}><Logotype /></Link>
        </div>
        <Header

          handleFilterMovie={handleFilterMovie}
          handleMoveMain={handleMoveMain}
          titleFilm={handleTitleFilm}
        />


      </div>
      <TypographyText content="Favorites" type="H1"/>
      {favorites.length > 0 ? (
        <div className="container">
          <ul className="container--ul">
            {favorites.map(({Genre, Poster, Title, Year, imdbID, imdbRating}: IMovie) => (
              <li key={imdbID}>
                <div className="movie-poster">
                  <button className="movie-poster--favorites" onClick={() => handleRemoveFromFavorites(imdbID)}>
                    <TypographyText
                      content="Remove Favorite"
                      type='subline'
                    />
                  </button>
                  <button className="movie-poster--btn">
                    <TypographyText content={imdbRating} type="subline" />
                  </button>
                  <img className="movie-poster--img" draggable="false" src={Poster} alt={Title} />
                  <Link to={`/movies/${imdbID}`} className="movie-link">
                    <TypographyText content={Title} type="H2" />
                    <TypographyText content={Year} type="H2" />
                    <TypographyText content={Genre.split(", ").join(" • ")} type="subline" />
                  </Link>
                </div>

              </li>
            ))}
          </ul>
        </div>
      ) : (
        <TypographyText content="No movie found" type="subline"/>
      )}
    </>
  );
};