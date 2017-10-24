import React from "react";
import PropTypes from "prop-types";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { Motion, spring, presets } from "react-motion";
import FlipToFront from "material-ui-icons/FlipToFront";
import FlipToBack from "material-ui-icons/FlipToBack";

let styles = {
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  titleInfo: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  titleBottom: {
    marginBottom: 24,
    fontSize: 14,
    display: "flex",
    justifyContent: "space-around"
  },
  titleBottomText: {
    color: theme.palette.text.secondary
  },
  center: {
    display: "flex",
    alignItems: "center"
  }
};

class FlashCardContainer extends React.Component {
  render() {
    let { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary">
              Share
            </Button>
            <Button dense color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

FlashCardContent.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(FlashCardContent);



    <CardContent className={classes.cardContentContainer}>
      <div className={classes.titleInfo}>
        <Typography type="body1" className={classes.title}>
          {cardContent.frontCategory}
        </Typography>
        <Typography type="body1" className={classes.title}>
          {`${cardContent.number + 1}/${cardContent.deckSize}`}
        </Typography>
      </div>

      <div className={classes.cardContent}>
        <Typography type="headline" component="h2">
          {cardContent.frontPrimary}
        </Typography>
        <Typography type="body1" className={classes.pos}>
          {cardContent.frontSub}
        </Typography>

        {cardContent.frontSecondary}
      </div>
      <div className={classes.titleBottom}>
        <Button
          onClick={this.handleFlip}
          className={classes.flipButton}
        >
          <div className={classes.center}>
            <Typography
              type="body1"
              className={classes.titleBottomText}
            >
              Flip to Back
            </Typography>
            <Typography
              type="body1"
              className={classes.titleBottomText}
            >
              <FlipToBack />
            </Typography>
          </div>
        </Button>
      </div>
    </CardContent>


  
    <CardContent className={classes.cardContentContainer}>
      <div className={classes.titleInfo}>
        <Typography type="body1" className={classes.title}>
          {cardContent.frontCategory}
        </Typography>
        <Typography type="body1" className={classes.title}>
          {`${cardContent.number + 1}/${cardContent.deckSize}`}
        </Typography>
      </div>
      <div className={classes.cardContent}>
        <Typography type="headline" component="h2">
          {cardContent.backPrimary}
        </Typography>
        <Typography type="body1" className={classes.pos}>
          {cardContent.backSub}
        </Typography>
        <Typography component="p">
          {cardContent.backSecondary}
        </Typography>
      </div>
      <div className={classes.titleBottom}>
        <Button
          onClick={this.handleFlip}
          className={classes.flipButton}
        >
          <div className={classes.center}>
            <Typography
              type="body1"
              className={classes.titleBottomText}
            >
              Flip to Front
            </Typography>
            <Typography
              type="body1"
              className={classes.titleBottomText}
            >
              <FlipToFront />
            </Typography>
          </div>
        </Button>
      </div>
    </CardContent>
