import React, { Component } from "react";
import { findDOMNode } from "react-dom";

import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import { withStyles } from "material-ui/styles";
import grey from "material-ui/colors/grey";
import Hint from "./Hint";

import HelpOutline from "material-ui-icons/HelpOutline";

const styles = theme => ({
  button: {},
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class StudyListItem extends Component {
  /* Toggle active / inactive */
  handleToggle = id => {
    this.props.toggleActive(id);
  };

  render() {
    let { classes } = this.props;
    let { front, back, hint, isActive } = this.props.studyItem;
    console.log("is it active ?", this.props.studyItem.isActive);
    return [
      <ListItem
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isActive ? "white" : grey[100],
          opacity: isActive ? 1 : 0.4
        }}
      >
        <Checkbox
          checked={isActive}
          onClick={() => this.handleToggle(this.props.id)}
        />

        <ListItemText
          primary={front}
          secondary={back}
          onClick={() => this.handleToggle(this.props.id)}
        />
        <ListItemSecondaryAction>
          <Hint position="left" hint={hint} />
        </ListItemSecondaryAction>
      </ListItem>,

      <Divider />
    ];
  }
}

export default withStyles(styles)(StudyListItem);
