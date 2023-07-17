import { FC, useEffect, useState } from "react";
import { FILM_URL } from "../../../api/urls";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../Header/Header";
import "./MovieInfo.scss";
import { TypographyText } from "../../Typography/TypographyText";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { addMovie, removeMovie } from "../../../store/favoritesSlice";
import { Button } from "../../Button/Button";
import { Logotype } from "../../../assets/icons";
import { RecommendationsFilm } from "./RecommendationsFilm";
import { API_KEY } from "../../../api/urls";

interface IMovieInfo {
  match: {
    params: { id: string };
  };
}

export const MovieInfo: FC<IMovieInfo> = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const URL = `${FILM_URL}?i=${id}&apikey=${API_KEY}`;
        const response = await fetch(URL);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const handleRemoveFromFavorites = (imdbID: string): void => {
    dispatch(removeMovie(imdbID));
  };

  const handleAddToFavorites = (movie: any): void => {
    dispatch(addMovie(movie));
  };

  if (!movie) {
    return (
      <div className="ui-loader loader-blk">
        <svg viewBox="22 22 44 44" className="multiColor-loader">
          <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" className="loader-circle loader-circle-animation"></circle>
        </svg>
      </div>
    );
  }

  const genreArray = movie.Genre.split(","); // Преобразование строки в массив
  const genreString = genreArray.join(` • `);

  return (
    <>
      <div className="mainLogo">
        <Link to={"/"}>
          <Logotype />
        </Link>
      </div>
      <Header handleFilterMovie={() => { }} handleMoveMain={() => { }} titleFilm={() => { }} />
      <div className="movie-details">
        <div className="movie-poster">
          {movie.Poster !== "N/A" ? (
            <>
              <img className="movie-poster--img" src={movie.Poster} alt={movie.Title} />
              {favorites.some((favMovie: { imdbID: any; }) => favMovie.imdbID === movie.imdbID) ? (
                <Button
                  type={"primary"}
                  content={"Remove from Favorites"}
                  onClick={() => handleRemoveFromFavorites(movie.imdbID)}
                />
              ) : (
                <Button type={"primary"} content={"Add to Favorites"} onClick={() => handleAddToFavorites(movie)} />
              )}
            </>
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
              draggable="false"
              alt={movie.Title}
            />
          )}
        </div>
        <div className="movie-info">
          <TypographyText content={genreString} type="subline" />
          <TypographyText content={movie.Title} type="H1" />
          <p className="movie-rating">
            <span className="movie-rating--green">{movie.imdbRating}</span>
            <span>IMDb {movie.imdbRating}</span>
            <span>{movie.Runtime}</span>
          </p>
          <p className="movie-info--plot">{movie.Plot}</p>
          <div className="movie-info--genres">
            <ul>
              <li>
                <span className="movie-info--list">Year:</span>
              </li>
              <li>
                <span className="movie-info--list">Released:</span>
              </li>
              <li>
                <span className="movie-info--list">BoxOffice:</span>
              </li>
              <li>
                <span className="movie-info--list">Country:</span>
              </li>
              <li>
                <span className="movie-info--list">Actors:</span>
              </li>
              <li>
                <span className="movie-info--list">Director:</span>
              </li>
              <li>
                <span className="movie-info--list">Writer:</span>
              </li>
              <li>
                <span className="movie-info--list">Stars:</span>
              </li>
            </ul>
            <ul>
              <li>{movie.Year}</li>
              <li>{movie.Released}</li>
              <li>{movie.BoxOffice}</li>
              <li>{movie.Country}</li>
              <li>{movie.Actors}</li>
              <li>{movie.Director}</li>
              <li>{movie.Writer}</li>
              <li>{movie.Actors}</li>
            </ul>
          </div>
        </div>
      </div>
      <RecommendationsFilm genre={genreArray[0]} />
    </>
  );
};
