import { FC } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { Typography } from "../Typography/Typography";

interface ICard {
  image: string;
  titleFilm: string;
  yearFilm: string;
  genreFIlm: string;
  link: string;
}


export const Card: FC<ICard> = ({
  image,
  titleFilm,
  yearFilm,
  genreFIlm,
  link,
}) => {
  return (
    <Link to={link}>
      <div className="card">
        <img src={image} alt={titleFilm} />
        <Typography content={titleFilm} type="H2" />
        <div className="card-info">
        <Typography content={yearFilm} type="H3" />
        <Typography content={genreFIlm} type="subline" />
        </div>
      </div>
    </Link>
  );
};
