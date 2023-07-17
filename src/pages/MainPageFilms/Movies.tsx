import { FC, useState } from 'react';
import { Movie } from './Movies/Movie';
import './Movies.scss';
import { ShowMore } from './ShowMore/ShowMore';

interface IMovies { }

interface IMovie {
  title: string;
  from: number;
  to: number;
}

export const Movies: FC<IMovies> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies] = useState<IMovie[]>([
    { title: 'Snatch', from: 0, to: 1 },
    { title: 'Lock, Stock and Two Smoking Barrels', from: 0, to: 1 },
    { title: 'RocknRolla', from: 0, to: 1 },
    { title: 'Revolver', from: 0, to: 1 },
    { title: 'fast and furious', from: 0, to: 1 },
    { title: '2 Fast 2 Furious', from: 0, to: 1 },
    { title: 'The Fast and the Furious: Tokyo Drift', from: 0, to: 1 },
    { title: 'Superfast!', from: 0, to: 1 },
  ]);

  const handleCountShowFilms = () => {
    setIsOpen(!isOpen);
  };

  const renderedMovies = isOpen ? movies : movies.slice(0, 4);

  return (
    <div className="movies">
      <div className="movies-container">
        {renderedMovies.map(({ from, title, to }) => (
          <Movie
            titleMovie={title}
            from={from}
            to={to}
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