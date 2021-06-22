import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import FilterNoneRoundedIcon from "@material-ui/icons/FilterNoneRounded";

const useStyles = makeStyles((theme) => ({
  code: {
    color: theme.palette.text.primary,
  },
}));

export default function RooomCodeButton() {
  const classes = useStyles();

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      size="small"
    >
      <Button variant="contained">
        <FilterNoneRoundedIcon />
      </Button>
      <Button className={classes.code}>Sala #5435464</Button>
    </ButtonGroup>
  );
}
