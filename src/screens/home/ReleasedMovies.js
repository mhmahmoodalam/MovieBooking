import React from "react";
import ReleasedMoviesFilter from "./ReleasedMoviesFilter";
import ReleasedMoviesList from "./ReleasedMoviesList";
const ReleasedMovies = (props) => {
  const [releasedMoviesList, setReleasedMoviesList] = React.useState([]);
  const [filter, setFilter] = React.useState({});
  
  React.useEffect(() => {
    const queryParams = Object.keys(filter).map(key => key + '=' + filter[key]).join('&')
    fetch(props.baseUrl + `movies?${queryParams}`, {
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
         <ReleasedMoviesFilter setFilter={setFilter} filter={filter} {...props}/>
      </div>
    </div>
  );
}
export default ReleasedMovies