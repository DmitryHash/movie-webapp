import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./MainPage.scss";
// import { getPostsAction } from "../../store/posts/actions";
import { Header } from "../../components/Header/Header";
import { MovieList } from "../../components/MovieList/MovieList";
import { Logotype } from "../../assets/icons";
import { Link } from "react-router-dom";

interface IMainPage {
  handleFilterMovie: () => void;
  handleMoveMain: () => void;
}

export const MainPage: FC<IMainPage> = ({ handleFilterMovie, handleMoveMain }) => {
  const dispatch = useAppDispatch();

  
  const [titleMovie, setTitleMovie] = useState("");
  const handleTitleFilm = (newValue: string) => {
    setTitleMovie(newValue);
  };

  return (
    <div className="blog">
      <div className="mainLogo">
        <Link to={'/'}><Logotype/></Link>
      </div>
      <Header
      
        handleFilterMovie={handleFilterMovie}
        handleMoveMain={handleMoveMain}
        titleFilm={handleTitleFilm}
      />
      <MovieList titleMovie={titleMovie} />
    </div>
  );
};
