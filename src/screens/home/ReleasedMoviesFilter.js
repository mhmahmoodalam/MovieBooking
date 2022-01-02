import React from "react";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
const ReleasedMoviesFilter = (props) => {
  const [releasedMoviesList, setReleasedMoviesList] = React.useState([]);
  React.useEffect(() => {

    // fetch(props.baseUrl + "movies?page=1&limit=10", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Cache-Control": "no-cache",
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //       setReleasedMoviesList(response.movies)
    //   })
    },[])
  return (
    <div>
      <div className="">
        ReleasedMoviesFilter
      </div>
    </div>
  );
}
export default ReleasedMoviesFilter