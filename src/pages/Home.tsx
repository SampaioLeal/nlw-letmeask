import { Typography, Button, Grid, Box } from "@material-ui/core";
import Logo from "../components/Logo";
import RoomInput from "../components/RoomInput";
import useHomeStyles from "../styles/home";
import SlideButton from "../components/SlideButton";
import { useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import Presentation from "../components/Presentation";

export default function Home() {
  const [slideState, setSlideState] = useState<"left" | "right">("left");
  const classes = useHomeStyles();

  const isCreating = slideState === "left";

  return (
    <Grid container spacing={0} className={classes.root}>
      <Box clone order={{ xs: 2, sm: 2, md: 1 }}>
        <Grid item xs={12} md={6} className={classes.presentation}>
          <Presentation />
        </Grid>
      </Box>

      <Box clone order={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={12} item md={6} className={classes.joinRoom}>
          <ProfileMenu />

          <Logo verticalMargin />

          <SlideButton state={slideState} setState={setSlideState} />

          <Typography variant="h2" className={classes.action}>
            {isCreating ? "Crie uma nova sala" : "Entrar em uma sala"}
          </Typography>

          <RoomInput
            className={classes.input}
            placeholder={
              isCreating ? "Nome da sala" : "Digite o código da sala"
            }
          />

          <Button variant="contained" color="primary" fullWidth>
            {isCreating ? "Criar sala" : "Entrar na sala"}
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
