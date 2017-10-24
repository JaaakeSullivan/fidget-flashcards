import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import grey from "material-ui/colors/grey";
import Divider from "material-ui/Divider";
import Checkbox from "material-ui/Checkbox";
import Hint from "./Hint";
import { GridList, GridListTile, GridListTileBar } from "material-ui/GridList";

const styles = {
  card: {
    borderRadius: "10px"
    //height: 250
  },
  cardTopText: {
    minHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  media: {
    minHeight: 150,
    width: "100%",
    margin: "0 auto",
    borderRadius: "10px 10px 0 0"
  },
  flexActions: {
    display: "flex",
    justifyContent: "space-between"
    //padding: 10
  },
  backText: {
    paddingBottom: 0
  }
};

function StudyListItem(props) {
  const { classes } = props;
  const imgRegex = /.jpg/;
  const { front, back, hint, isActive } = props.content;
  console.log(front, back);

  let handleToggle = id => {
    props.toggleActive(id);
  };

  return (
    <div>
      <Card
        className={classes.card}
        style={{
          backgroundColor: isActive ? "white" : grey[100],
          opacity: isActive ? 1 : 0.4
        }}
        raised={isActive}
      >
        {front.endsWith(".jpg") |
        front.endsWith(".jpeg") |
        front.endsWith(".png") ? (
          <div>
            <CardMedia
              className={classes.media}
              image={require(`../images/${front}`)}
              title={back}
            />
          </div>
        ) : (
          <div>
            <Typography type="" component="h2" className={classes.cardTopText}>
              {front}
            </Typography>
            <Divider />
          </div>
        )}
        <CardContent className={classes.backText}>
          <Typography type="headline" component="h2">
            {back}
          </Typography>
        </CardContent>
        <CardActions className={classes.flexActions}>
          <Checkbox checked={isActive} onClick={() => handleToggle(props.id)} />

          <Hint hint={hint} position="left" />
        </CardActions>
      </Card>
    </div>
  );
}

StudyListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  image: PropTypes.string,
  actions: PropTypes.array
};

export default withStyles(styles)(StudyListItem);
