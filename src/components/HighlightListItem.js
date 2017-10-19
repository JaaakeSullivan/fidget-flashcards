import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import { withStyles } from "material-ui/styles";

HighlightListItem.propTypes = {
  openHighlight: PropTypes.func,
  colorCode: PropTypes.string,
  highlightText: PropTypes.string,
  highlightNote: PropTypes.string,
  classes: PropTypes.object
};

const styles = {
  root: {
    textAlign: "left"
  }
};

function HighlightListItem(props) {
  let {
    openHighlight,
    colorCode,
    highlightText,
    highlightNote,
    classes
  } = props;
  return (
    <div>
      <ListItem button onClick={openHighlight} className={classes.root}>
        <Avatar
          style={{
            margin: "10px",
            minWidth: "40px",
            backgroundColor: colorCode,
            color: "#FFF"
          }}
        >
          <ModeEditIcon />
        </Avatar>
        <ListItemText
          primary={highlightText}
          secondary={highlightNote}
          style={{ justifyContent: "left" }}
        />
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(HighlightListItem);
