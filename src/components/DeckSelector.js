import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import Menu, { MenuItem } from "material-ui/Menu";
import blueGrey from "material-ui/colors/blueGrey";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 250
    //background: theme.palette.background.paper
  },
  listDisplay: {
    color: "white",
    backgroundColor: blueGrey[100]
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space around"
  }
});

const options = ["Keyboard Shortcuts", "EMC Trivia"];

class DeckSelector extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ open: false });
    this.props.switchDeck(index);
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Deck selection"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Deck Selection"
              secondary={this.props.dataSet}
              className={classes.listDisplay}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {this.props.dataSetOptions.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

DeckSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeckSelector);
