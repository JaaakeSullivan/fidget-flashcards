import React, { Component } from "react";
import logo from "./logo.svg";
import fidget from "./images/fidget.png";
import "./App.css";
import { testData } from "./data/testData";
import StudyList from "./components/StudyList";
import { withStyles } from "material-ui/styles";
import blueGrey from "material-ui/colors/blueGrey";

const styles = {
  root: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: blueGrey[500]
  },
  content: {
    height: "100%",
    padding: 10
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <header className="App-header">
          <img src={fidget} className="App-logo" alt="logo" />
          <h1 className="App-title">Fidget Flashcards 9000</h1>
        </header>
        <div className={classes.content}>
          <StudyList data={testData.one} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
