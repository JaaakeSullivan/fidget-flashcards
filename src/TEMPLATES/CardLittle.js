import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  card: {
    //height: 200
  },
  media: {
    height: 200,
    width: 200,
    margin: "0 auto"
  }
};

function CardLittle(props) {
  const { classes } = props;
  const imgRegex = /.jpg/;
  const { front, back } = props.content;
  console.log(front, back);

  console.log(front.endsWith(".jpg"));

  return (
    <div>
      <Card className={classes.card}>
        {front.endsWith(".jpg") ? (
          <div>
            <CardMedia
              className={classes.media}
              image={require(`../images/${front}`)}
              title={back}
            />
            <Typography type="headline" component="h2">
              {front}
            </Typography>
          </div>
        ) : (
          <CardContent>
            <Typography type="headline" component="h2">
              {front}
            </Typography>
            <Typography component="p">{back}</Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

CardLittle.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  image: PropTypes.string,
  actions: PropTypes.array
};

export default withStyles(styles)(CardLittle);
