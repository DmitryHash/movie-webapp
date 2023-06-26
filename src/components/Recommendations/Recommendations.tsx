import { FC } from "react";

interface IRecommendations {
  recommendations: { Title: string; Year: string }[];
}

export const Recommendations: FC<IRecommendations> = ({ recommendations }) => {
  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.Title}>
            {movie.Title} ({movie.Year})
          </li>
        ))}
      </ul>
    </div>
  );
};