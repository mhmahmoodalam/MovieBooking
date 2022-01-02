import React from "react";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
const ReleasedMoviesList = (props) => {
  const { releasedMoviesList }  = props
  return (
    <div>
      <div className="">
        <GridList cellHeight={350} className="" cols={4}>
          {releasedMoviesList.map((tile) => (
            <GridListTile key={tile.id}>
              <img src={tile.poster_url} alt={tile.title} />
              <GridListTileBar 
                title={tile.title} 
                subtitle={<span>by: {tile.author}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}
export default ReleasedMoviesList