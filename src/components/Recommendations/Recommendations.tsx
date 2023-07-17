import { FC } from "react";
import { TypographyText } from "../Typography/TypographyText";

interface IRecommendations {
  recommendations: { Title: string; Year: string }[];
}

export const Recommendations: FC<IRecommendations> = ({ recommendations }) => {
  return (
    <div>
      <TypographyText content="Recommendation" type="H2" />
      <ul>
        {recommendations.map(({ Title, Year }) => (
          <li key={Title}>
            {Title} ({Year})
          </li>
        ))}
      </ul>
    </div>
  );
};