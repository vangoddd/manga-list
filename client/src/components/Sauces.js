import * as React from "react";
import Sauce from "./Sauce";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  padding: {
    padding: "5px",
  },
});

const Sauces = ({ sauces, tags, classes }) => {
  return (
    <div>
      <div>
        <strong>{tags}</strong>
      </div>

      <div>
        <Grid container>
          {sauces.map((sauce) => (
            <Grid item xs={6} sm={4} key={sauce.id} className={classes.padding}>
              <Sauce sauce={sauce} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(Sauces);
