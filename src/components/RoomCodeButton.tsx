import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import FilterNoneRoundedIcon from "@material-ui/icons/FilterNoneRounded";

interface RoomCodeButtonProps {
  code: string;
}

const useStyles = makeStyles((theme) => ({
  code: {
    color: theme.palette.text.primary,
  },
}));

export default function RooomCodeButton({ code }: RoomCodeButtonProps) {
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
      <Button className={classes.code}>Sala #{code}</Button>
    </ButtonGroup>
  );
}
