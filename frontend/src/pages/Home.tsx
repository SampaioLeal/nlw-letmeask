import { Typography, Button, Grid, Box } from "@material-ui/core";
import Logo from "../components/Logo";
import RoomInput from "../components/RoomInput";
import useHomeStyles from "../styles/home";
import SlideButton from "../components/SlideButton";
import { useState } from "react";

export default function Home() {
  const [slideState, setSlideState] = useState<"left" | "right">("left");
  const classes = useHomeStyles();

  const isCreating = slideState === "left";

  return (
    <Grid container spacing={0} className={classes.root}>
      <Box clone order={{ xs: 2, sm: 2, md: 1 }}>
        <Grid item xs={12} md={6} className={classes.presentation}>
          <img src="/images/presentation.png" alt="Presentation" />
          <Typography variant="h1" className={classes.title}>
            Toda pergunta tem uma resposta.
          </Typography>
          <Typography variant="h3" className={classes.description}>
            Aprenda e compartilhe conhecimento com outras pessoas.
          </Typography>
        </Grid>
      </Box>

      <Box clone order={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={12} item md={6} className={classes.joinRoom}>
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
