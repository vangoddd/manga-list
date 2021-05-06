import Sauce from "./Sauce";
import Grid from "@material-ui/core/Grid";

const Sauces = ({ sauces, tags }) => {
  return (
    <div>
      <div className="cat">
        <strong>{tags}</strong>
      </div>

      <Grid container>
        {sauces.map((sauce) => (
          <Grid item xs={4} key={sauce.id}>
            <Sauce sauce={sauce} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Sauces;
