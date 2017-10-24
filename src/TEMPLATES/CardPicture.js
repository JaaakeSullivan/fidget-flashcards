import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
};

function SimpleMediaCard(props) {
  const { classes, heading, subheading, image, actions } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={require(image)}
          title={heading}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {heading}
          </Typography>
          <Typography component="p">{subheading}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string
};

export default withStyles(styles)(SimpleMediaCard);
