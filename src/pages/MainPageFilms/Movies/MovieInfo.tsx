import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { addMovie, removeMovie } from "../../../store/favoritesSlice";
import { Button } from "../../../components/Button/Button";
import { Logotype } from "../../../assets/icons";
import { RecommendationsFilm } from "./RecommendationsFilm";
import { API_KEY, FILM_URL } from "../../../api/urls";
import { Header } from "../../../components/Header/Header";
import "./MovieInfo.scss";
import { Typography } from "../../../components/Typography/Typography";

interface IMovieInfo {
  match: {
    params: { id: string };
  };
}

interface IMovie {
  imdbID: string;
  Title: string;
  Genre: string;
  Poster: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  Year: string;
  Released: string;
  BoxOffice: string;
  Country: string;
  Actors: string;
  Director: string;
  Writer: string;
}

export const MovieInfo: FC<IMovieInfo> = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);

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

  const handleAddToFavorites = (movie: IMovie): void => {
    dispatch(addMovie(movie));
  };

  if (!movie) {
    return (
      <div className="ui-loader loader-blk">
        <svg viewBox="22 22 44 44" className="multiColor-loader">
          <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" className="loader-circle loader-circle-animation"></circle>
        </svg>
      </div>
    );
  }

  const genreArray = movie.Genre.split(",");
  const genreString = genreArray.join(" • ");

  const isFavorite = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);

  return (
    <>
      <div className="mainLogo">
        <Link to={"/"}>
          <Logotype />
        </Link>
      </div>
      <Header titleFilm={() => { }} />
      <div className="movie-details">
        <div className="movie-poster">
          {movie.Poster !== "N/A" ? (
            <>
              <img className="movie-poster--img" src={movie.Poster} alt={movie.Title} />
              <Button
                type="primary"
                content={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                onClick={() => (isFavorite ? handleRemoveFromFavorites(movie.imdbID) : handleAddToFavorites(movie))}
              />
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
          <Typography content={genreString} type="subline" />
          <Typography content={movie.Title} type="H1" />
          <p className="movie-rating">
            <span className="movie-rating--green">{movie.imdbRating}</span>
            <span>IMDb {movie.imdbRating}</span>
            <span>{movie.Runtime}</span>
          </p>
          <div className="movie-info--plot">
            <Typography content={movie.Plot} type="subline" />
          </div>
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
      <RecommendationsFilm genre={movie.Title} />  {/* genre={genreArray[0]} */}
    </>
  );
};