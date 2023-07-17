import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import './FilteredMoviePage.scss';
import { Logotype } from '../../assets/icons';
import { Header } from '../../components/Header/Header';
import { TypographyText } from '../../components/Typography/TypographyText';
import { API_KEY, FILM_URL } from '../../api/urls';

interface Movie {
  Genre: string;
  Poster: string;
  imdbID: string;
  Title: string;
  Year: string;
}

export const FilteredMoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('searchQuery') || '';
  const yearStart = searchParams.get('yearStart') || '';
  const yearEnd = searchParams.get('yearEnd') || '';

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        const response = await axios.get(FILM_URL, {
          params: {
            apikey: `${API_KEY}`,
            s: searchQuery,
          },
        });
        const allMovies: Movie[] = response.data.Search || [];
        const filteredMovies = allMovies.filter(
          (movie) => {
            const movieYear = parseInt(movie.Year);
            return movieYear >= parseInt(yearStart) && movieYear <= parseInt(yearEnd);
          }
        );
        setFilteredMovies(filteredMovies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredMovies();
  }, [searchQuery, yearStart, yearEnd]);

  const renderMovieCard = ({ Genre, Poster, Title, Year, imdbID }: Movie) => {
    return (
      <Card
        image={Poster}
        titleFilm={Title}
        yearFilm={Year}
        genreFIlm={Genre}
        link={`/movies/${imdbID}`}
      />
    );
  };

  return (
    <div>
      <div className="mainLogo">
        <Link to={'/'}><Logotype /></Link>
      </div>
      <Header handleFilterMovie={() => { }} handleMoveMain={() => { }} titleFilm={() => { }} />
      <TypographyText content='Filtered Movies' type='H1' />
      {filteredMovies.length > 0 ? (
        <div className="movie-card-container">
          {filteredMovies.map((movie) => renderMovieCard(movie))}
        </div>
      ) : (
        <TypographyText content='No movies found.' type='subline' />
      )}
    </div>
  );
};
