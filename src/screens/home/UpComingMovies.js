import React from "react";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const UpComingMovies = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = React.useState([]);
  React.useEffect(() => {

    fetch(props.baseUrl + "movies?page=1&limit=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      }
    })
      .then((response) => response.json())
      .then((response) => {
        setUpcomingMoviesList(response.movies)
      })
    },[])
  return (
    <div>
      <div className="home_upcoming_movies_heading">Upcoming Movies</div>
      <div className="home_upcoming_movies_grid_container">
        <GridList cellHeight={250} className="home_upcoming_movies_grid_list" cols={6}>
          {upcomingMoviesList.map((tile) => (
            <GridListTile key={tile.id} >
              <img src={tile.poster_url} alt={tile.title} />
              <GridListTileBar title={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}
export default UpComingMovies