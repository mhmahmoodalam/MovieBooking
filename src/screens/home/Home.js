import React from "react";
import './Home.css';
import UpComingMovies from "./UpComingMovies";
import ReleasedMovies from "./ReleasedMovies";

const Home = (props) => {

  return (
      <div>
          <UpComingMovies { ...props }/>
          <ReleasedMovies { ...props }/>
      </div>
  )
}
export default Home