import * as React from "react";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  padding: {
    padding: "5px",
  },
});

const SauceDetail = (props) => {
  const mangaId = props.match.params.id;
  return <>{mangaId}</>;
};

export default withStyles(styles)(SauceDetail);
