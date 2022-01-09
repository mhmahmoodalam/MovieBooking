import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root:{
    maxWidth: theme.spacing.unit * 38,
  },
  cardelement: {
    minWidth: theme.spacing.unit * 30,
    maxWidth: theme.spacing.unit * 30,
    margin: theme.spacing.unit,
    
  },
  header: {
    color : theme.palette.primary.light
  }
})

const ReleasedMoviesFilter = (props) => {
  const { setFilter, filter, classes, genresList, artistsList  } = props

  const [ movieName, setMovieName ] = React.useState(filter.title||'')
  const [ genresSelected, setGenresSelected ] = React.useState(filter.genre||[])
  const [ artistsSelected, setArtistsSelected ] = React.useState(filter.artists|| [])
  const [ releaseDateStart, setReleaseDateStart ] = React.useState(filter.start_date||'')
  const [ releaseDateEnd, setReleaseDateEnd ] = React.useState(filter.end_date || '')
  
  

  const genresOptions =  genresList.map((gen) => {
    return gen.genre
  })
  const artistsOptions =  artistsList.map((artist) => {
      return `${artist.first_name} ${artist.last_name}`
  })

  const handleApplyFilters = (e) => {
    e.preventDefault()
    const filter = { status: 'RELEASED' }
    if(movieName !== ''){
      filter["title"] = movieName
    }
    if(genresSelected.length > 0){
      filter["genre"] = genresSelected.join(",")
    }
    if(artistsSelected.length > 0){
      filter["artists"] = artistsSelected.join(",")
    }
    if(releaseDateStart !== ''){
      filter["start_date"] = releaseDateStart
    }
    if(releaseDateEnd !== ''){
      filter["end_date"] = releaseDateEnd
    }
    
    setFilter(filter)

  }
  return (
    <div className="released__movie_filter">
      <Card className={classes.root}>
        <CardContent  >
          <Typography variant="subtitle1" className={`${classes.header} ${classes.cardelement}`}>
            FIND MOVIES BY:
          </Typography>
            <div className={classes.cardelement}>
              <FormControl fullWidth >
                <InputLabel htmlFor="moviename" >
                  <Typography color="textSecondary" >Movie Name</Typography>
                </InputLabel>
                <Input
                  id="moviename"
                  name="title"
                  defaultValue={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </FormControl>
            </div>
            <div className={classes.cardelement}>
              <FormControl fullWidth>
                <InputLabel htmlFor="genres" >
                  <Typography color="textSecondary">Genres</Typography>
                </InputLabel>
                <Select
                  id="genres"
                  name="genre"
                  value={genresSelected}
                  onChange={(e) => setGenresSelected(e.target.value)}
                  renderValue={selected => selected.join(', ')}
                  multiple
                >
                  {genresOptions && genresOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={genresSelected.indexOf(option) > -1 } color="default" />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.cardelement}>
              <FormControl fullWidth>
                <InputLabel htmlFor="artists" >
                  <Typography color="textSecondary">Artists</Typography>
                </InputLabel>
                <Select
                  id="artists"
                  name="artists"
                  value={artistsSelected}
                  onChange={(e) => setArtistsSelected(e.target.value)}
                  renderValue={selected => selected.join(', ')}
                  multiple
                >
                  {artistsOptions && artistsOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={artistsSelected.indexOf(option) > -1 } color="default"  />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.cardelement}>
              <FormControl fullWidth>                
                <TextField                
                  id="release-date-start"
                  name="start_date"
                  label="Release Date Start"
                  type="date"
                  defaultValue={releaseDateStart}
                  pattern="\d{4}-\d{2}-\d{2}"
                  color="textSecondary"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setReleaseDateStart(e.target.value)}
                />
              </FormControl>
            </div>
            <div className={classes.cardelement}>
              <FormControl fullWidth>                
                <TextField                
                  id="release-date-end"
                  label="Release Date End"
                  name="end_date"
                  type="date"
                  pattern="\d{4}-\d{2}-\d{2}"
                  defaultValue={releaseDateEnd}
                  color="textSecondary"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setReleaseDateEnd(e.target.value)}
                />
              </FormControl>
            </div>
            <br />
            <div className={classes.cardelement}>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                color="primary"
                fullWidth
              >
                Apply
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default withStyles(styles)(ReleasedMoviesFilter)