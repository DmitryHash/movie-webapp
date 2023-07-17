import { FC } from "react";
import { Typography } from "../Typography/Typography";

interface IRecommendations {
  recommendations: { Title: string; Year: string }[];
}

export const Recommendations: FC<IRecommendations> = ({ recommendations }) => {
  return (
    <div>
      <Typography content="Recommendation" type="H2" />
      <ul>
        {recommendations.map(({ Title, Year }) => (
          <li>
            {Title} ({Year})
          </li>
        ))}
      </ul>
    </div>
  );
};