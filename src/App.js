import React, { Component } from "react";
import logo from "./logo.svg";
import fidget from "./images/fidget.png";
import "./App.css";
import { testData } from "./data/testData";
import StudyList from "./components/StudyList";
import { withStyles } from "material-ui/styles";
import blueGrey from "material-ui/colors/blueGrey";
import "typeface-orbitron";
import Grid from "material-ui/Grid";
import Hidden from "material-ui/Hidden";

const styles = {
  root: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: blueGrey[500]
  },
  headerContainer: {
    backgroundColor: blueGrey[900]
  },
  header: {
    //height: "100px",
    padding: "20px",
    color: "white",
    fontFamily: "Orbitron",
    maxWidth: 960,
    margin: "0 auto"
  },
  appTitle: {},
  content: {
    height: "100%"
    //padding: 10
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSetOptions: ["Keyboard Shortcuts", "EMC Trivia"],
      dataSet: "Keyboard Shortcuts"
    };
  }

  switchDeck = deckIndex => {
    this.setState({ dataSet: this.state.dataSetOptions[deckIndex] });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <Grid container spacing={8} className={classes.header}>
            <Hidden only={["xs", "sm"]}>
              <Grid item md={3}>
                <img src={fidget} className="App-logo" alt="logo" />
              </Grid>
              <Grid item md={6}>
                <h1 className={classes.appTitle}>Fidget Flashcards 9000</h1>
              </Grid>
              <Grid item md={3}>
                <img src={fidget} className="App-logo-two" alt="logo" />
              </Grid>
            </Hidden>

            <Hidden only={["md", "lg", "xl"]}>
              <Grid item xs={12}>
                <h1 className={classes.appTitle}>Fidget Flashcards</h1>
              </Grid>
              <Grid item xs={4}>
                <img src={fidget} className="App-logo" alt="logo" />
              </Grid>
              <Grid item xs={4}>
                <h1 className={classes.appTitle}>9000</h1>
              </Grid>
              <Grid item xs={4}>
                <img src={fidget} className="App-logo-two" alt="logo" />
              </Grid>
            </Hidden>
          </Grid>
        </div>

        <div className={classes.content}>
          <StudyList
            data={testData[this.state.dataSet]}
            dataSet={this.state.dataSet}
            dataSetOptions={this.state.dataSetOptions}
            switchDeck={this.switchDeck}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
