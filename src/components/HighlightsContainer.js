import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import HighlightFilters from "./HighlightFilters";
import HighlightsList from "./HighlightsList";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    background: theme.palette.background.paper
  }
});

class HighlightsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedYellow: true,
      checkedGreen: true,
      checkedBlue: true,
      checkedPink: true,
      checkedPurple: true
    };
  }
  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  handleSelectAll = value => () => {
    this.setState({
      checkedYellow: value,
      checkedGreen: value,
      checkedBlue: value,
      checkedPink: value,
      checkedPurple: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <HighlightsList
          filters={this.state}
          yellow={this.state.checkedYellow}
          green={this.state.checkedGreen}
          blue={this.state.checkedBlue}
          pink={this.state.checkedPink}
          purple={this.state.checkedPurple}
          highlights={this.props.highlights}
          openHighlight={this.props.openHighlight}
        />
      </div>
    );
  }
}

HighlightsContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HighlightsContainer);
