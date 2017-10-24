import React, { Component } from "react";
import PropTypes from "prop-types";
import FlashCardContainer from "./FlashCardContainer";
import List, { ListSubheader } from "material-ui/List";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import blueGrey from "material-ui/colors/blueGrey";
import DeckSelector from "./DeckSelector";
import StudyListItem from "./StudyListItem";
import Grid from "material-ui/Grid";

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
    paddingRight: 35,
    background: blueGrey[500]
  },
  selectAll: {
    marginLeft: 10
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

  isAllActive = element => {
    return element.isActive;
  };

  toggleAll = () => {
    let value = this.state.studySet.every(this.isAllActive);
    console.log("value", value);
    let newStudySet = this.state.studySet.map(studyItem => {
      return { ...studyItem, isActive: !value };
    });
    this.setState({ studySet: newStudySet });
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
    console.log(studySet);

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
              <Avatar className={classes.selectAll}>
                <Checkbox
                  checked={this.state.studySet.every(this.isAllActive)}
                  onClick={() => this.toggleAll()}
                />
              </Avatar>
              <div>
                <div style={{ lineHeight: "18px" }}>{title}</div>
                <div style={{ lineHeight: "18px" }}>{`by ${author}`}</div>
              </div>

              <div>Hints</div>
            </ListSubheader>
          }
          className={classes.list}
        >
          <Grid container spacing={24}>
            {studySet.map((studyItem, i) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <StudyListItem
                    content={studyItem}
                    toggleActive={this.toggleActive}
                    key={i}
                    id={i}
                  />
                </Grid>
              );
            })}
          </Grid>
        </List>
      </div>
    );
  }
}

StudyList.propTypes = {};

export default withStyles(styles)(StudyList);
