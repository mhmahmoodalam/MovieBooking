import React from "react";
import './Home.css';
import UpComingMovies from "./UpComingMovies";
import ReleasedMovies from "./ReleasedMovies";
import {  withRouter } from 'react-router-dom';

const Home = (props) => {

  return (
      <div>
          <UpComingMovies { ...props }/>
          <ReleasedMovies { ...props }/>
      </div>
  )
}
export default withRouter(Home)