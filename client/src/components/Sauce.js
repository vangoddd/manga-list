import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = {
  white: {
    color: "white",
    borderColor: "white",
    margin: "5px",
    "&:hover": {
      background: "#fff",
      color: "black",
    },
    minWidth: "100px",
  },
};

const Sauce = (props) => {
  const { classes } = props;
  const codeSauce = props.sauce.code;

  console.log(props);
  return (
    <>
      <Button
        variant="outlined"
        className={classes.white + " btn-sauce"}
        href={"https://nhentai.net/g/" + codeSauce}
        target="_blank"
      >
        {codeSauce}
      </Button>
    </>
  );
};

export default withStyles(styles)(Sauce);
