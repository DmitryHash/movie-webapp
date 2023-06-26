import { FC } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

interface ICard {
  key: string;
  image: string;
  titleFilm: string;
  yearFilm: string;
  genreFIlm: string;
  link: string;
}


export const Card: FC<ICard> = ({
  key,
  image,
  titleFilm,
  yearFilm,
  genreFIlm,
  link,
}) => {
  return (
    <Link to={link}>
      <div className="card" key={key}>
        <img src={image} alt={titleFilm} />
        <h3 className="card-title">{titleFilm}</h3>
        <div className="card-info">
          <p className="card-year">{yearFilm}</p>
          <p className="card-genre">{genreFIlm}</p>
        </div>
      </div>
    </Link>
  );
};