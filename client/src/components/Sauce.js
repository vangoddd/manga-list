import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = {
  white: {
    color: "white",
    borderColor: "white",
    margin: "5px",
  },
};

const Sauce = (props) => {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.white}
        href="https://nhentai.net/g/203511"
        target="_blank"
      >
        203511
      </Button>
    </div>
  );
};

export default withStyles(styles)(Sauce);
