import React from "react";
import { withStyles } from '@material-ui/core/styles';
import './Details.css';
import { GridList,GridListTile,GridListTileBar,  Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import YouTube from 'react-youtube';
import StarBorderIcon  from '@material-ui/icons/StarBorder'

const styles = theme => ({
  infotitle: {
    fontWeight: 'bold'
  },
  section: {
    marginTop: 16
  },
  loader: {
    margin: 10
  },
  ratedStar: {
    color: 'yellow',
    cursor: 'pointer'
  },
  unratedStar: {    
    cursor: 'pointer'
  },
  artistTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16
  }

})

const playerOpts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};

const Details = (props) => {
  const { classes } = props
  const [ movieDetails, setMovieDetails ] = React.useState({})
  const [ loading, setLoading ] = React.useState(true)
  const [ selfMovieRating, setSelfMovieRating ] = React.useState(0)
  React.useEffect(() => {
    fetch(props.baseUrl + `movies/${props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      }
    }).then((response) => response.json())
      .then((response) => {
        setMovieDetails(response)
        setLoading(false)
      })
  },[])
  
  return (
    <div>
      {loading && (
        <div className="details_loader">
          <CircularProgress
            color="secondary"
            size={40}
            thickness={5}
            className={classes.loader}
          />
          <Typography variant="headline" component="h2">
            {" "}
            Loading ...{" "}
          </Typography>
        </div>
      )}
      {!loading && (
        <div>
          <div className="details__back" onClick={() => props.history.push("/")}>
            <Typography variant="body2">&#xFF1C;Back To Home</Typography>
          </div>
          <div className="details_container">
            <div className="details_poster_container">
              <img src={movieDetails.poster_url} alt={movieDetails.title} />
            </div>
            <div className="details_info_container">
              <Typography variant="headline" component="h2">
                {movieDetails.title}
              </Typography>
              <div>
                <Typography>
                  <span className={classes.infotitle}>Genre: </span>
                  {movieDetails.genres.join(",")}
                </Typography>
                <Typography>
                  <span className={classes.infotitle}>Duration: </span>
                  {movieDetails.duration}
                </Typography>
                <Typography>
                  <span className={classes.infotitle}>Release Date: </span>
                  {new Date(movieDetails.release_date).toDateString()}
                </Typography>
                <Typography>
                  <span className={classes.infotitle}>Rating: </span>
                  {movieDetails.rating}
                </Typography>
                <Typography className={classes.section}>
                  <span className={classes.infotitle}>Plot: </span>
                  <a href={movieDetails.wiki_url}>(Wiki link)</a>
                  <span></span> {movieDetails.storyline}
                </Typography>
                <Typography className={classes.section}>
                  <span className={classes.infotitle}>Trailer: </span>
                </Typography>
                <YouTube
                  videoId={movieDetails.trailer_url.split("=")[1]}
                  opts={playerOpts}
                />
              </div>
            </div>
            <div className="details_rating_container">
              <div className="ratings">
                <Typography>
                  <span className={classes.infotitle}>Rate this movie: </span>
                </Typography>
                {[...Array(5)].map((x, i) => (
                  <StarBorderIcon
                    key={i + 1}
                    onClick={() => setSelfMovieRating(i + 1)}
                    className={
                      selfMovieRating >= i + 1
                        ? classes.ratedStar
                        : classes.unratedStar
                    }
                  />
                ))}
              </div>
              <div className="artists">
                <Typography className={classes.artistTitle}>
                  Artists:
                </Typography>
                <GridList cellHeight={150} cols={2}>
                {movieDetails.artists.map((artist) => (
                  <GridListTile key={artist.id} >
                    <img src={artist.profile_url}  alt={`${artist.first_name} ${artist.last_name}`} />
                    <GridListTileBar 
                      title={`${artist.first_name} ${artist.last_name}`} 
                    />
                  </GridListTile>
                ))}
                </GridList>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default withStyles(styles)(Details)