import React, { Component } from "react";
import PropTypes from "prop-types";
import HelpOutline from "material-ui-icons/HelpOutline";
import Button from "material-ui/Button";
import Popover from "material-ui/Popover";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { findDOMNode } from "react-dom";

const styles = theme => ({
  button: {},
  typography: {
    margin: theme.spacing.unit * 2
  },
  hintIcon: {
    color: theme.palette.text.secondary
  }
});

class Hint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintOpen: false,
      anchorEl: null
    };
  }

  static propTypes = {};
  /* Open popover hint */
  handleClickButton = () => {
    this.setState({
      hintOpen: true,
      anchorEl: findDOMNode(this.button)
    });
  };

  /* Close popover hint */
  handleRequestClose = () => {
    this.setState({
      hintOpen: false
    });
  };

  render() {
    const { classes, hint } = this.props;
    return (
      <div>
        <Button
          ref={node => {
            this.button = node;
          }}
          className={classes.button}
          onClick={this.handleClickButton}
        >
          <HelpOutline className={classes.hintIcon} />
        </Button>
        <Popover
          open={this.state.hintOpen}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: this.props.position === "center" ? "center" : "left"
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: this.props.position === "center" ? "center" : "right"
          }}
        >
          <Typography className={classes.typography}>{hint}</Typography>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(Hint);
