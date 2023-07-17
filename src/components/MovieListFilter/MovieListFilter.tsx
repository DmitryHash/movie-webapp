import { useState, useEffect, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from '../Button/Button';
import { YearInput } from '../Input/YearInput';
import './MovieListFilter.scss'
import { API_KEY, FILM_URL } from '../../api/urls';

interface IMovie {
  Title: string;
  Year: string;
}

export const MovieListFilter = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  const fetchMoviesByYearRange = async (start: string, end: string) => {
    try {
      const response = await axios.get(FILM_URL, {
        params: {
          apikey: `${API_KEY}`,
          s: searchQuery,
          y: `${start}-${end}`,
        },
      });
      const allMovies = response.data.Search || [];
      const filteredMovies = allMovies.filter(
        ({Title, Year}: IMovie) => Year >= start && Year <= end
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
    </div>
  );
};

