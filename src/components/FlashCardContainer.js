import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import annyang from "annyang";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import FlashCard from "./FlashCard";
import FlashCardStepper from "../components/FlashCardStepper";
import { spring } from "react-motion";
import Shuffle from "material-ui-icons/Shuffle";
import Hint from "./Hint";
import blueGrey from "material-ui/colors/blueGrey";

const styles = {
  root: {
    backgroundColor: blueGrey[500]
  },
  appBar: {
    position: "relative",
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  background: {
    backgroundColor: blueGrey[500]
  },
  toolBarStyle: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "960px"
  },
  stepperStyles: {
    display: "absolute",
    width: "80%"
  }
};

class FlashCardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeStep: 0,
      flashcardStudySet: []
    };
  }

  // open flashcard container
  handleClickOpen = () => {
    this.setState({ open: true, flashcardStudySet: this.props.studySet });
  };

  // close flashcard container
  handleRequestClose = () => {
    this.setState({ open: false });
  };

  // >> next >> flashcard
  handleNext = () => {
    if (this.state.activeStep < this.props.studySet.length - 1) {
      this.unFlipCard(this.state.activeStep);
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    }
  };

  // << back << flashcard
  handleBack = () => {
    if (this.state.activeStep > 0) {
      this.unFlipCard(this.state.activeStep);
      this.setState({
        activeStep: this.state.activeStep - 1
      });
    }
  };

  // flip the activeStep flashcard
  flipCard = () => {
    let newflashcardStudySet = this.state.flashcardStudySet;
    newflashcardStudySet[
      this.state.activeStep
    ].isFlipped = !newflashcardStudySet[this.state.activeStep].isFlipped;
    this.setState({ flashcardStudySet: newflashcardStudySet });
  };

  // unflip activeStep card after next or back actions
  unFlipCard = currentIndex => {
    let newflashcardStudySet = this.state.flashcardStudySet;
    newflashcardStudySet[currentIndex].isFlipped = false;

    this.setState({ flashcardStudySet: newflashcardStudySet });
  };

  // random flashcard
  handleShuffle = () => {
    let random = Math.random();
    let randomStep = Math.floor(random * this.props.studySet.length);
    randomStep === this.state.activeStep
      ? this.handleShuffle()
      : this.setState({
          activeStep: randomStep
        });
  };

  displayFlashcards = () => {
    if (this.props.studySet !== undefined) {
      let studySet = this.props.studySet;

      // let studyItem = studySet ? studySet[this.state.activeStep] : false;

      return studySet.map((studyItem, i) => {
        let cardContent = {
          frontPrimary: studyItem.front,
          backPrimary: studyItem.back,
          frontCategory: this.props.title,
          backCategory: this.props.title,
          frontSecondary: <Hint hint={studyItem.hint} position="center" />,
          backSecondary: studyItem.hint,
          deckSize: studySet.length,
          number: i,
          isFlipped: studyItem.isFlipped,
          position:
            i < this.state.activeStep
              ? "left"
              : i > this.state.activeStep ? "right" : "center"
        };

        return (
          <div key={i}>
            <FlashCard cardContent={cardContent} flipCard={this.flipCard} />
          </div>
        );
      });
    }
  };

  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return { width: spring(0), height: spring(0) };
  }

  render() {
    if (annyang) {
      // Let's define a command.
      var commands = {
        "open flashcards": () => {
          this.handleClickOpen();
        },
        "close flashcards": () => {
          this.handleRequestClose();
        },

        next: () => {
          this.handleNext();
        },
        back: () => {
          this.handleBack();
        },
        shuffle: () => {
          this.handleShuffle();
        },
        flip: () => {
          this.flipCard();
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();
    }

    const { classes } = this.props;

    /*** BUILD THE CARDCONTENT (FROM STUDYSET) HERE ***/

    return (
      <div>
        <Button raised onClick={this.handleClickOpen}>
          Open Flashcards
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" className={classes.background} />}
        >
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBarStyle}>
              <IconButton
                color="contrast"
                onClick={this.handleRequestClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>

              <Typography
                type="title"
                color="inherit"
                className={classes.flex}
                onClick={this.handleRequestClose}
              >
                STUDY MODE
              </Typography>
              <div>
                <Button color="contrast" onClick={this.handleShuffle}>
                  shuffle<Shuffle />
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          {this.displayFlashcards()}
          <FlashCardStepper
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={this.state.activeStep}
            length={this.props.studySet ? this.props.studySet.length : 0}
            className={classes.stepperStyles}
          />
        </Dialog>
      </div>
    );
  }
}

FlashCardContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FlashCardContainer);
