import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';
import { ShowMore } from './ShowMore/ShowMore';
import { Card } from '../Card/Card';

interface IMovies {}

interface IMovie {
  title: string;
  from: number;
  to: number;
}



export const Movies: FC<IMovies> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies] = useState<IMovie[]>([
    { title: 'Attack On Titan', from: 0, to: 1 },
    { title: 'Black Clover', from: 0, to: 1 },
    { title: 'Hunter x hunter', from: 0, to: 1 },
    { title: 'My Hero Academia', from: 1, to: 2 },
    { title: 'Initial D', from: 0, to: 1 },
    { title: 'FullMetal Alchemist', from: 0, to: 1 },
    { title: 'Jujutsu Kaisen', from: 1, to: 2 },
    { title: 'Demon Slayer', from: 1, to: 2 },
  ]);

  const handleCountShowFilms = () => {
    setIsOpen(!isOpen);
  };

  const renderedMovies = isOpen ? movies : movies.slice(0, 4);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMovies.map((movie) => (
          <Movie
            key={movie.title}
            titleMovie={movie.title}
            from={movie.from}
            to={movie.to}
            
          />
        ))}
      </div>
      <div className="movies-bottom">
        {movies.length > 5 && (
          <ShowMore
            content={isOpen ? 'show less' : 'show more'}
            handleClick={handleCountShowFilms}
            children={undefined}
          />
        )}
      </div>
  
      
    </div>
  );
}