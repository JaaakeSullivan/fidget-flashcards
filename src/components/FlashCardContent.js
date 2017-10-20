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
          <Button onClick={this.handleFlip} className={classes.flipButton}>
            <div className={classes.center}>
              <Typography type="body1" className={classes.titleBottomText}>
                Flip to Back
              </Typography>
              <Typography type="body1" className={classes.titleBottomText}>
                <FlipToBack />
              </Typography>
            </div>
          </Button>
        </div>
      </CardContent>
    );
  }
}

FlashCardContent.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(FlashCardContent);
