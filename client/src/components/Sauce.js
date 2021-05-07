import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = {
  white: {
    color: "white",
    borderColor: "white",
    "&:hover": {
      background: "#fff",
      color: "black",
    },
  },
};

const Sauce = (props) => {
  const { classes } = props;
  const codeSauce = props.sauce.code;

  return (
    <>
      <Button
        variant="outlined"
        className={classes.white + " btn-sauce"}
        href={"https://nhentai.net/g/" + codeSauce}
        target="_blank"
        fullWidth
      >
        {codeSauce}
      </Button>
    </>
  );
};

export default withStyles(styles)(Sauce);
