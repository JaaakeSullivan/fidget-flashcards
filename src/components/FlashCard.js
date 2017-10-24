// https://github.com/AaronCCWong/react-card-flip

import React from "react";
import PropTypes from "prop-types";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { Motion, spring, presets } from "react-motion";
import FlipToFront from "material-ui-icons/FlipToFront";
import FlipToBack from "material-ui-icons/FlipToBack";

import CardPicture from "../TEMPLATES/CardPicture";

const styles = theme => ({
  root: {
    // maxWidth: 600,
    // margin: "0 auto"
  },
  containerContainer: {
    display: "flex",
    justifyContent: "space-around"
  },
  cardContainer: {
    position: "relative",
    perspective: "2000px",
    width: "90%",
    maxWidth: "600px"

    // backgroundColor: "red"
  },
  card: {
    position: "absolute",
    backfaceVisibility: "hidden",
    width: "100%",
    height: "400px",
    marginTop: "20px",
    borderRadius: 10
  },
  cardContentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
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
  media: {
    height: 300,
    width: 400,
    borderRadius: 2,
    boxShadow: "inset 0px 3px 16px 3px rgba(0,0,0,0.75)"
  },
  center: {
    display: "flex",
    alignItems: "center"
  },
  flipButton: {
    width: "100%"
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
});

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleTouchStart = e => {
    e.preventDefault();
    this.handleMouseDown();
  };

  handleFlip = e => {
    e.preventDefault();
    //this.setState({ isFlipped: !this.state.isFlipped });
    this.props.flipCard();
  };

  resetCardFlip = () => {
    // console.log(this.props.data);
    if (this.props.cardContent.position !== "center") {
      this.setState({ isFlipped: false });
      // console.log("I'm reset now", this.state);
    } else {
      // console.log("I'm the center", this.state);
    }
  };

  /*** Adding spacebar functionality ***/
  handleKeyPress = e => {
    if (
      this.props.cardContent.position === "center" &&
      (e.code === "Space" || e.code === "ArrowUp" || e.code === "ArrowDown")
    ) {
      this.setState({ isFlipped: !this.state.isFlipped });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const { cardContent, classes } = this.props;

    let cardInfo = {
      heading: cardContent.front,
      subHeading: cardContent.back,
      image: cardContent.image
    };

    return (
      <div className={classes.root}>
        <div>
          <Motion
            style={{
              x: spring(cardContent.isFlipped ? 180 : 0),
              y: spring(
                cardContent.position === "right"
                  ? 200
                  : cardContent.position === "left" ? -200 : 0,
                presets.gentle
              ),
              z: spring(cardContent.isFlipped ? -100 : 0)
            }}
          >
            {({ x, y, z }) => (
              // children is a callback which should accept the current value of
              // `style`
              <div className={classes.containerContainer}>
                <div className={classes.cardContainer}>
                  {/*===== BEGIN FRONT OF CARD =====*/}
                  <Card
                    className={classes.card}
                    key="front"
                    style={{
                      WebkitTransform: `rotateX(${x}deg)`,
                      transform: `rotateX(${x}deg)`,
                      right: `${y}%`
                    }}
                    elevation={10}
                  >
                    {/*<transform: `rotate(${y}deg)`*/}
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
                        {cardContent.frontPrimary.endsWith(".jpg") |
                        cardContent.frontPrimary.endsWith(".jpeg") |
                        cardContent.frontPrimary.endsWith(".png") ? (
                          <CardMedia
                            className={classes.media}
                            image={require(`../images/${cardContent.frontPrimary}`)}
                            title={cardContent.frontPrimary}
                          />
                        ) : (
                          <Typography type="" component="h2">
                            {cardContent.frontPrimary}
                          </Typography>
                        )}

                        {/*<Typography type="" component="h2">
                          {cardContent.frontPrimary}
                        </Typography>*/}

                        <Typography type="body1" className={classes.pos}>
                          {cardContent.frontSub}
                        </Typography>

                        <div>{cardContent.frontSecondary}</div>
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

                    {/*<CardPicture content={cardContent} />*/}
                  </Card>

                  {/*===== BEGIN BACK OF CARD =====*/}
                  <Card
                    className={classes.card}
                    key="back"
                    style={{
                      WebkitTransform: `rotateX(${180 + x}deg) `,
                      transform: `rotateX(${180 + x}deg)`,
                      right: `${y}%`
                    }}
                    elevation={10}
                  >
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
                        <Typography type="" component="h2">
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
                  </Card>
                </div>
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}

FlashCard.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(FlashCard);
