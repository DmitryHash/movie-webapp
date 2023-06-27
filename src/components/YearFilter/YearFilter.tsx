import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, ChangeEvent, FC } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './YearFilter.scss'

interface IMovie {
  Title: string;
  Year: string;
}

interface IYearInput {
  title: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

export const YearInput: FC<IYearInput> = ({
  title,
  value,
  handleChange,
  placeholder,
  className,
}) => {
  return (
    <div>
      <label>{title}</label>
      <input type="text" value={value} onChange={handleChange} placeholder={placeholder} className={className}/>
    </div>
  );
};

export const MovieListFilter = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
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
        (movie: IMovie) => movie.Year >= start && movie.Year <= end
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

  const renderMovieCard = (movie: IMovie) => {
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
      <div>
        <label>Movie Title</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
          placeholder="Enter Movie Title"
          className='movieTitle-input'
        />
      </div>
      <YearInput
        title="From"
        value={yearStart}
        handleChange={handleChangeYearStart}
        placeholder="Start Year"
        className='year-input'
      />
      <YearInput
        title="To"
        value={yearEnd}
        handleChange={handleChangeYearEnd}
        placeholder="End Year"
        className='year-input'
      />
      <div className='apply-btn'>
        <Button onClick={handleApplyFilters} content='Apply filters' type='primary' />
      </div>
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

