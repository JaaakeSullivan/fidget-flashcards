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
  header: {
    backgroundColor: blueGrey[900],
    //height: "100px",
    padding: "20px",
    color: "white"
  },
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
        <header className={classes.header}>
          <h1 className="App-title">
            <img src={fidget} className="App-logo" alt="logo" />
            <span>Fidget Flashcards 9000</span>
            <img src={fidget} className="App-logo-two" alt="logo" />
          </h1>
        </header>
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
