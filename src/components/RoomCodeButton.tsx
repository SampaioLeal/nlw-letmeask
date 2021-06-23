import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import FilterNoneRoundedIcon from "@material-ui/icons/FilterNoneRounded";
import appStore from "../stores/app";

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

  function copyToClipboard() {
    if (appStore.room) navigator.clipboard.writeText(appStore.room?.id);
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
