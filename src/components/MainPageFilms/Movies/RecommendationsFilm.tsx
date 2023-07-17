import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { addMovie, removeMovie } from "../../../store/favoritesSlice";
import { API_KEY } from '../../../api/urls';
import "./RecommendationsFilm.scss";

import { TypographyText } from '../../Typography/TypographyText';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface IRecommendationsFilm {
    genre: string;
}

export interface IMovie {
    Genre: any;
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    imdbRating: string;
}

export const RecommendationsFilm: FC<IRecommendationsFilm> = ({ genre }) => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const navigate = useNavigate();


    const favorites = useSelector((state: RootState) => state.favorites.movies);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToFavorites = (movie: IMovie) => {
        dispatch(addMovie(movie));
    };

    const handleRemoveFromFavorites = (imdbID: string) => {
        dispatch(removeMovie(imdbID));
    };


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?s=${genre}&apikey=${API_KEY}`);
                const data = await response.json();

                if (data.Search) {
                    const movieIds = data.Search.map((movie: any) => movie.imdbID);
                    const requests = movieIds.map((id: string) => fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`));
                    const responses = await Promise.all(requests);
                    const moviesData = await Promise.all(responses.map((response) => response.json()));

                    setMovies(moviesData);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [genre]);

    const handleCardClick = (id: string) => {
        navigate(`/movies/${id}`);
    };



    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <div className="recommendations">
                <h1>Recommendations</h1>
                {movies.length > 1 ? (
                    <ul className='recommendations--ul'>
                    </ul>
                ) : (
                    <div className="loader triangle">
                        <svg viewBox="0 0 86 80">
                            <polygon points="43 8 79 72 7 72"></polygon>
                        </svg>
                    </div>
                )}
            </div>
            <Carousel
                responsive={responsive}
                renderButtonGroupOutside={true}
                arrows={true}
                autoPlay={true}
                transitionDuration={100}
                infinite={false}
            >
                {movies.map((movie) => (

                    <div className="movie-poster">
                        {favorites.some((favMovie) => favMovie.imdbID === movie.imdbID) ? (
                            <button className='movie-poster--favorites'
                                onClick={() => handleRemoveFromFavorites(movie.imdbID)}
                            >
                                <TypographyText
                                    content="Remove Favorite"
                                    type='subline'
                                />
                            </button>
                        ) : (
                            <button className='movie-poster--favorites'
                                onClick={() => handleAddToFavorites(movie)}
                            >
                                <TypographyText
                                    content="Add to Favorite"
                                    type='subline'
                                />
                            </button>
                        )}

                        <button className='movie-poster--btn'>
                            <TypographyText
                                content={movie.imdbRating}
                                type='subline'
                            />
                        </button>

                        <img
                            className='movie-poster--img'
                            draggable="false"
                            src={movie.Poster}
                            alt={movie.Title}
                        />
                        <Link to={`/movies/${movie.imdbID}`} className="movie-link">
                            <h3 onClick={() => handleCardClick(movie.Genre)}>{movie.Title} </h3>
                            <h2>{movie.Year}</h2>
                            <p>{movie.Genre.split(', ').join(' • ')}</p>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </>
    );
};