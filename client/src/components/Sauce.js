import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
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
  const mangaName = props.sauce.name;
  console.log(props.sauce);

  const routeAddress = "/detail/" + props.sauce.id;

  return (
    <>
      <Link to={routeAddress}>
        <Button
          variant='outlined'
          className={classes.white + " btn-sauce"}
          target='_blank'
          fullWidth
        >
          {mangaName}
        </Button>
      </Link>
    </>
  );
};

export default withStyles(styles)(Sauce);
