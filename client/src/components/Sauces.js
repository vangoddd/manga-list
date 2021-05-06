import Sauce from "./Sauce";
import Grid from "@material-ui/core/Grid";

const Sauces = ({ sauces }) => {
  return (
    <div>
      <div className="cat">
        <strong>Sauces lol</strong>
      </div>

      <Grid container>
        {sauces.map((sauce) => (
          <Grid item xs={4}>
            <Sauce sauce={sauce} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Sauces;
