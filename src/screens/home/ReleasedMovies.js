import React from "react";
import ReleasedMoviesFilter from "./ReleasedMoviesFilter";
import ReleasedMoviesList from "./ReleasedMoviesList";
const ReleasedMovies = (props) => {
  const [releasedMoviesList, setReleasedMoviesList] = React.useState([]);
  const [filter, setFilter] = React.useState({});
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
          setReleasedMoviesList(response.movies)
      })
    },[filter])

  const handleMovieGridClick = (movieId) => {
    props.history.push(`/movie/${movieId}`)

  }
  return (
    <div>
      <div className="released__movie_container">
         <ReleasedMoviesList releasedMoviesList={releasedMoviesList} handleMovieGridClick={handleMovieGridClick}/>
         <ReleasedMoviesFilter setFilter={setFilter} filter={filter}/>
      </div>
    </div>
  );
}
export default ReleasedMovies