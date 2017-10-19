import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { FormGroup } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";

// ===== MATERIAL-UI COLOR IMPORTS ===== //
import lightBlue from "material-ui/colors/lightBlue";
import lightGreen from "material-ui/colors/lightGreen";
import pink from "material-ui/colors/pink";
import purple from "material-ui/colors/purple";
import yellow from "material-ui/colors/yellow";

const marginAmt = "10px 3px";

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 5px"
  },

  selectAllContainer: {
    display: "flex",
    alignItems: "center",
    color: "black"
    // width: "80%"
  },
  selectAllText: {
    paddingRight: 10
  },
  selectAllAvatar: {
    color: "white",
    margin: marginAmt
  },
  checkedColor: {
    color: "white"
  }
});

function HighlightFilters(props) {
  // console.log(props);
  let { classes } = props;

  return (
    <div className={classes.root}>
      <FormGroup row>
        <div
          className={classes.selectAllContainer}
          onClick={props.handleSelectAll(!props.selectAll)}
        >
          <Typography className={classes.selectAllText}>Select All </Typography>

          <Avatar className={classes.selectAllAvatar}>
            <Checkbox
              checked={props.selectAll}
              onChange={props.handleSelectAll(!props.selectAll)}
              classes={{
                checked: classes.checkedColor
              }}
            />
          </Avatar>
        </div>
      </FormGroup>
    </div>
  );
}

HighlightFilters.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HighlightFilters);
