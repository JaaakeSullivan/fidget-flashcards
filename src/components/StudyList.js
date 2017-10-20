import React, { Component } from "react";
import PropTypes from "prop-types";
import FlashCardContainer from "./FlashCardContainer";
import StudyListItem from "./StudyListItem";
import List, { ListSubheader } from "material-ui/List";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import Checkbox from "material-ui/Checkbox";
import blueGrey from "material-ui/colors/blueGrey";
import DeckSelector from "./DeckSelector";

const styles = {
  root: {},
  list: {
    maxWidth: 960,
    padding: 20,
    margin: "0 auto"
  },
  controlsContainer: {
    backgroundColor: blueGrey[900],
    padding: "0px 20px"
  },
  controls: {
    maxWidth: 960,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0 auto"
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingRight: 35
  }
};

class StudyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studySet: []
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.setState({
      studySet: this.props.data.studySet.map(studyItem => {
        return { ...studyItem, isActive: true, isFlipped: false };
      })
    });
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({
      studySet: newProps.data.studySet.map(studyItem => {
        return { ...studyItem, isActive: true, isFlipped: false };
      })
    });
  }

  toggleAll = () => {
    console.log("Feature coming soon!");
  };

  toggleActive = id => {
    let newStudySet = this.state.studySet;
    newStudySet[id].isActive = !newStudySet[id].isActive;
    this.setState({ studySet: newStudySet });
  };

  render() {
    let { title, author } = this.props.data;
    let { studySet } = this.state;
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.controlsContainer}>
          <div className={classes.controls}>
            <DeckSelector
              dataSet={this.props.dataSet}
              dataSetOptions={this.props.dataSetOptions}
              switchDeck={this.props.switchDeck}
            />
            <FlashCardContainer
              title={title}
              studySet={this.state.studySet.filter(item => {
                return item.isActive;
              })}
            />
          </div>
        </div>
        <List
          subheader={
            <ListSubheader className={classes.listHeader}>
              <Checkbox checked={true} onClick={() => this.toggleAll()} />
              <div>
                <div style={{ lineHeight: "18px" }}>{title}</div>
                <div style={{ lineHeight: "18px" }}>{`by ${author}`}</div>
              </div>

              <div>Hints</div>
            </ListSubheader>
          }
          className={classes.list}
        >
          <Divider />
          {studySet.map((studyItem, i) => {
            return (
              <StudyListItem
                studyItem={studyItem}
                toggleActive={this.toggleActive}
                key={i}
                id={i}
              />
            );
          })}
        </List>
      </div>
    );
  }
}

StudyList.propTypes = {};

export default withStyles(styles)(StudyList);
