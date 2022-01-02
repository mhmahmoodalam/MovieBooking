import React from "react";
import './Home.css';
import UpComingMovies from "./UpComingMovies";
import ReleasedMovies from "./ReleasedMovies";

const Home = () => {

  return (
      <div>
          
          <div>Home page</div>
          <UpComingMovies/>
          <ReleasedMovies/>

      </div>
  )
}
export default Home