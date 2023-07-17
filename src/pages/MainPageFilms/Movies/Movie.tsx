import { FC, useState, useEffect } from "react";
import { API_KEY, FILM_URL } from "../../../api/urls";
import { Card } from "../../../components/Card/Card";
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
          `${FILM_URL}?s=${titleMovie}&apikey=${API_KEY}`
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
      {moviesToShow.map(({ imdbID, Poster, Title, Year, Genre }) => (
        <Card
          image={Poster}
          titleFilm={Title}
          yearFilm={Year}
          genreFIlm={Genre}
          link={`movies/${imdbID}`}
        />
      ))}
    </div>
  );
};