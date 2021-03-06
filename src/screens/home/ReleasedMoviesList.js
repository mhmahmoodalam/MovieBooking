import React from "react";
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const ReleasedMoviesList = (props) => {
  const { releasedMoviesList } = props;
  return (
    <div className="released__movie_list">
      <GridList cellHeight={350} className="" cols={4}>
        {releasedMoviesList.map((tile) => (
          <GridListTile key={tile.id} className="released__movie_grid">
            <Link to={`/movie/${tile.id}`}>
              <img
                src={tile.poster_url}
                alt={tile.title}
                className="released__movie_grid_img"
              />
              <GridListTileBar
                title={tile.title}
                subtitle={
                  <span>
                    Release Date: {new Date(tile.release_date).toDateString()}
                  </span>
                }
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default ReleasedMoviesList;
