import React, { Component } from "react";
import PropTypes from "prop-types";
import FlashCardContainer from "./FlashCardContainer";
import StudyListItem from "./StudyListItem";
import List, { ListSubheader } from "material-ui/List";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import Checkbox from "material-ui/Checkbox";

const styles = {
  list: {
    maxWidth: 960,
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
    console.log(this.props.data);

    this.setState({
      studySet: this.props.data.studySet.map(studyItem => {
        return { ...studyItem, isActive: true, isFlipped: false };
      })
    });
  }

  toggleAll = () => {
    console.log("Feature coming soon!");
  };

  toggleActive = id => {
    console.log(id);
    let newStudySet = this.state.studySet;
    newStudySet[id].isActive = !newStudySet[id].isActive;
    this.setState({ studySet: newStudySet });
  };

  render() {
    let { title, author } = this.props.data;
    let { studySet } = this.state;
    let { classes } = this.props;
    return (
      <div>
        <FlashCardContainer
          title={title}
          studySet={this.state.studySet.filter(item => {
            return item.isActive;
          })}
        />
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
            console.log(i);
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
