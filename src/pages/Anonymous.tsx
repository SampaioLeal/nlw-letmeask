import { Grid, Box, Button } from "@material-ui/core";
// import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
// import Divider from "../components/Divider";
import GoogleIcon from "../components/GoogleIcon";
import Logo from "../components/Logo";
// import RoomInput from "../components/RoomInput";
import useHomeStyles from "../styles/home";
import authStore from "../stores/auth";
import Presentation from "../components/Presentation";
// import { useState } from "react";
// import appStore from "../stores/app";
// import { useHistory } from "react-router-dom";

export default function Anonymous() {
  const classes = useHomeStyles();
  // const history = useHistory();
  // const [room, setRoom] = useState("");

  // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setRoom(event.target.value.trim());
  // }

  // async function handleJoin() {
  //   try {
  //     const roomData = await appStore.checkRoom(room);
  //     history.push(`/room/${roomData.code}`);
  //   } catch (e) {
  //     console.log(e);
  //     // TODO: disparar alerta
  //   }
  // }

  return (
    <Grid container spacing={0} className={classes.root}>
      <Box clone order={{ xs: 2, sm: 2, md: 1 }}>
        <Grid item xs={12} md={6} className={classes.presentation}>
          <Presentation />
        </Grid>
      </Box>

      <Box clone order={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={12} item md={6} className={classes.joinRoom}>
          <Logo verticalMargin />

          <Button
            onClick={authStore.signInWithGoogle}
            variant="outlined"
            fullWidth
          >
            <GoogleIcon />
            Entrar com o Google
          </Button>

          {/* <Divider title="ou entre em uma sala" />

          <RoomInput
            value={room}
            onChange={handleInputChange}
            placeholder="Digite o código da sala"
          />

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleJoin}
          >
            <QuestionAnswerRoundedIcon />
            Entrar na sala
          </Button> */}
        </Grid>
      </Box>
    </Grid>
  );
}
