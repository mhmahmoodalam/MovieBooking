import React from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import { getArtists, getMovies, getGenres } from "../../utils/HttpConnector";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ReleasedMoviesFilter from "./ReleasedMoviesFilter";
import ReleasedMoviesList from "./ReleasedMoviesList";

/* Main component for movies list and upcoming movies */
const Home = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = React.useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = React.useState([]);
  const [filter, setFilter] = React.useState({ status: "RELEASED" });
  const [genresList, setGenresList] = React.useState([]);
  const [artistsList, setArtistsList] = React.useState([]);

  React.useEffect(() => {
    getMovies(filter).then((response) => {
      setReleasedMoviesList(response.movies);
    });
  }, [filter]);

  React.useEffect(() => {
    getArtists().then((response) => {
      setArtistsList(response.artists);
    });
    getGenres().then((response) => {
      setGenresList(response.genres);
    });

    getMovies({ status: "PUBLISHED" }).then((response) => {
      setUpcomingMoviesList(response.movies);
    });
  }, []);

  return (
    <div>
      <div className="upcoming_movies_container">
        <div className="home_upcoming_movies_heading">Upcoming Movies</div>
        <div className="home_upcoming_movies_grid_container">
          <GridList
            cellHeight={250}
            className="home_upcoming_movies_grid_list"
            cols={6}
          >
            {upcomingMoviesList.map((tile) => (
              <GridListTile key={tile.id}>
                <img src={tile.poster_url} alt={tile.title} />
                <GridListTileBar title={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
      <div className="released__movie_container">
        <ReleasedMoviesList releasedMoviesList={releasedMoviesList} />
        <ReleasedMoviesFilter
          {...props}
          setFilter={setFilter}
          filter={filter}
          genresList={genresList}
          artistsList={artistsList}
        />
      </div>
    </div>
  );
};

export default withRouter(Home);
