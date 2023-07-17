import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { addMovie, removeMovie } from "../../../store/favoritesSlice";
import { API_KEY, FILM_URL } from '../../../api/urls';

import { TypographyText } from '../../Typography/TypographyText';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./RecommendationsFilm.scss";


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
                const response = await fetch(`${FILM_URL}?s=${genre}&apikey=${API_KEY}`);
                const data = await response.json();

                if (data.Search) {
                    const movieIds = data.Search.map((movie: any) => movie.imdbID);
                    const requests = movieIds.map((id: string) => fetch(`${FILM_URL}?i=${id}&apikey=${API_KEY}`));
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
                <TypographyText content='Recommendation' type='H1'/>
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
                {movies.map(({Genre, Poster, Title, Year, imdbID, imdbRating}) => (

                    <div className="movie-poster">
                        {favorites.some((favMovie) => favMovie.imdbID === imdbID) ? (
                            <button className='movie-poster--favorites'
                                onClick={() => handleRemoveFromFavorites(imdbID)}
                            >
                                <TypographyText
                                    content="Remove Favorite"
                                    type='subline'
                                />
                            </button>
                        ) : (
                            <button className='movie-poster--favorites'
                                onClick={() => handleAddToFavorites({Genre, Poster, Title, Year, imdbID, imdbRating})}
                            >
                                <TypographyText
                                    content="Add to Favorite"
                                    type='subline'
                                />
                            </button>
                        )}

                        <button className='movie-poster--btn'>
                            <TypographyText
                                content={imdbRating}
                                type='subline'
                            />
                        </button>

                        <img
                            className='movie-poster--img'
                            draggable="false"
                            src={Poster}
                            alt={Title}
                        />
                        <Link to={`/movies/${imdbID}`} className="movie-link">
                            <TypographyText content={Title} type='H2' onClick={() => handleCardClick(Genre)}/>
                            <TypographyText content={Year} type='H3' />
                            <TypographyText content={Genre.split(', ').join(' • ')} type='subline'/>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </>
    );
};