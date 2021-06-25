import { IconButton } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import appStore from "../stores/app";

function ThemeSwitcher() {
  return (
    <IconButton onClick={appStore.toggleTheme}>
      {appStore.theme === "light" ? (
        <Brightness3Icon />
      ) : (
        <BrightnessHighIcon />
      )}
    </IconButton>
  );
}

export default observer(ThemeSwitcher);
