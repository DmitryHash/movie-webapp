import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeMovie } from "../../store/favoritesSlice";
import { Link } from "react-router-dom";
import { IMovie } from "../MainPageFilms/Movies/RecommendationsFilm";
import { Typography } from "../../components/Typography/Typography";
import { Logotype } from "../../assets/icons";
import { Header } from "../../components/Header/Header";
import "./Favorites.scss"



export const Favorites: FC = () => {
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
          titleFilm={handleTitleFilm}
        />
      </div>
      <Typography content="Favorites" type="H1" />
      {favorites.length > 0 ? (
        <div className="container">
          <ul className="container--ul">
            {favorites.map(({ Genre, Poster, Title, Year, imdbID, imdbRating }: IMovie) => (
              <li>
                <div className="movie-poster">
                  <button className="movie-poster--favorites" onClick={() => handleRemoveFromFavorites(imdbID)}>
                    <Typography
                      content="Remove Favorite"
                      type='subline'
                    />
                  </button>
                  <button className="movie-poster--btn">
                    <Typography content={imdbRating} type="subline" />
                  </button>
                  <img className="movie-poster--img" draggable="false" src={Poster} alt={Title} />
                  <Link to={`/movies/${imdbID}`} className="movie-link">
                    <Typography content={Title} type="H2" />
                    <Typography content={Year} type="H2" />
                    <Typography content={Genre.split(", ").join(" • ")} type="subline" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Typography content="No movie found" type="subline" />
      )}
    </>
  );
};