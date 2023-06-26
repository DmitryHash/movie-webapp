import { PageTemplate } from "./components/PageTemplate/PageTemplate";
import { Router } from "./routes/Router";
// import { Switch, Route } from "react-router-dom";
// import { MovieList } from "./components/MovieList/MovieList";
// import { MovieInfo } from "./components/MainPageFilms/Movies/MovieInfo";

export const App = () => {
  return (
    <PageTemplate>
      <Router />
    </PageTemplate>
  );
};
