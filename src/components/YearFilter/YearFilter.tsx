import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '../Input/Input';

interface Movie {
  Title: string;
  Year: string;
}

export const YearInput = ({
  title,
  value,
  handleChange,
  placeholder,
}: {
  title: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <div>
      <label>{title}</label>
      <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
    </div>
  );
};

export const MovieListFilter = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchMoviesByYearRange = async (start: string, end: string) => {
    try {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: '797d76c8',
          s: searchQuery,
          y: `${start}-${end}`,
        },
      });
      const allMovies = response.data.Search || [];
      const filteredMovies = allMovies.filter(
        (movie: Movie) => movie.Year >= start && movie.Year <= end
      );
      setFilteredMovies(filteredMovies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (yearStart && yearEnd) {
      fetchMoviesByYearRange(yearStart, yearEnd);
    } else {
      setFilteredMovies([]);
    }
  }, [yearStart, yearEnd, searchQuery]);

  const renderMovieCard = (movie: Movie) => {
    return (
      <div key={movie.Title} className="movie-card">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    );
  };

  const handleChangeYearStart = (event: ChangeEvent<HTMLInputElement>) => {
    setYearStart(event.target.value);
  };

  const handleChangeYearEnd = (event: ChangeEvent<HTMLInputElement>) => {
    setYearEnd(event.target.value);
  };

  const handleChangeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleApplyFilters = () => {
    fetchMoviesByYearRange(yearStart, yearEnd);
    navigate(`/filtered-movies?searchQuery=${searchQuery}&yearStart=${yearStart}&yearEnd=${yearEnd}`);
  };

  return (
    <div>
      <YearInput
        title="From"
        value={yearStart}
        handleChange={handleChangeYearStart}
        placeholder="Start Year"
      />
      <YearInput
        title="To"
        value={yearEnd}
        handleChange={handleChangeYearEnd}
        placeholder="End Year"
      />
      <div>
        <label>Movie Title</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
          placeholder="Enter Movie Title"
        />
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
      {/* <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => renderMovieCard(movie))
        ) : (
          <p>No movies found.</p>
        )}
      </ul> */}
    </div>
  );
};

