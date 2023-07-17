import { FC } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { TypographyText } from "../Typography/TypographyText";

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
        <TypographyText content={titleFilm} type="H2" />
        <div className="card-info">
        <TypographyText content={yearFilm} type="H3" />
        <TypographyText content={genreFIlm} type="subline" />
        </div>
      </div>
    </Link>
  );
};
