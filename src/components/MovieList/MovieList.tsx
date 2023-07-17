import { FC, useState, useEffect } from "react";
import { Card } from "../Card/Card";
import { FILM_URL } from "../../api/urls";
import { Movies } from "../MainPageFilms/Movies";
import "./MovieList.scss";
import { Button } from '../../components/Button/Button'

interface IMovieList {
  titleMovie: string;
}

export const MovieList: FC<IMovieList> = ({ titleMovie }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const search = encodeURIComponent(titleMovie);
        const URL = `${FILM_URL}?s=${search}&apikey=797d76c8&page=${currentPage}&r=json&plot=full&pageSize=${pageSize}`;
        const response = await fetch(URL);
        const data = await response.json();
        setMovies(prevMovies => [...prevMovies, ...data.Search || []]);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchMovies();
  }, [titleMovie, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [titleMovie]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  return (
    <div className="card-list">
      {movies.map((item) => (
        <Card
          key={item.imdbID}
          image={item["Poster"] !== "N/A" ? item["Poster"] : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
          titleFilm={item["Title"]}
          yearFilm={item["Year"]}
          genreFIlm={item["Genre"]}
          link={`/movies/${item.imdbID}`}
        />
      ))}
      {!movies.length && <Movies />}
      {totalResults > movies.length && (
        <Button content="Load More" onClick={handleLoadMore} type="primary" />
      )}
    </div>
  );
};