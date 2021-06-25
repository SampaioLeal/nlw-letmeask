import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import FilterNoneRoundedIcon from "@material-ui/icons/FilterNoneRounded";
import roomStore from "../stores/room";

interface RoomCodeButtonProps {
  code: string;
}

const useStyles = makeStyles((theme) => ({
  code: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
  },
}));

export default function RooomCodeButton({ code }: RoomCodeButtonProps) {
  const classes = useStyles();

  function copyToClipboard() {
    if (roomStore.room) navigator.clipboard.writeText(roomStore.room?.code);
  }

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      size="small"
    >
      <Button onClick={copyToClipboard} variant="contained">
        <FilterNoneRoundedIcon />
      </Button>
      <Button className={classes.code}>Sala #{code}</Button>
    </ButtonGroup>
  );
}
