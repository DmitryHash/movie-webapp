import { FC, useState, useEffect } from "react";
import { FILM_URL } from "../../../api/urls";
import { Card } from "../../Card/Card";
import "./Movie.scss";

interface IMovie {
  titleMovie: string;
  from: number;
  to: number;
}

export const Movie: FC<IMovie> = ({ titleMovie, from, to }) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${FILM_URL}?s=${titleMovie}&apikey=797d76c8`
        );
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchMovie();
  }, [titleMovie]);

  const moviesToShow = movies.slice(from, to);

  return (
    <div className="movie-card">
      {moviesToShow.map((movie) => (
        <Card
          key={movie.imdbID}
          image={movie.Poster}
          titleFilm={movie.Title}
          yearFilm={movie.Year}
          genreFIlm={movie.Genre}
          link={`movies/${movie.imdbID}`} 
        />
      ))}
    </div>
  );
};