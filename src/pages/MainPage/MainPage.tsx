import { FC, useState } from "react";
import { Header } from "../../components/Header/Header";
import { MovieList } from "../../components/MovieList/MovieList";
import { Logotype } from "../../assets/icons";
import { Link } from "react-router-dom";
import "./MainPage.scss";


export const MainPage: FC = () => {

  const [titleMovie, setTitleMovie] = useState("");

  const handleTitleFilm = (newValue: string) => {
    setTitleMovie(newValue);
  };

  return (
    <div className="blog">
      <div className="mainLogo">
        <Link to={'/'}><Logotype /></Link>
      </div>
      <Header
        titleFilm={handleTitleFilm}
      />
      <MovieList titleMovie={titleMovie} />
    </div>
  );
};
