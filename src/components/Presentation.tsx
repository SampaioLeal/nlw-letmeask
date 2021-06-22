import { Typography } from "@material-ui/core";
import useHomeStyles from "../styles/home";

export default function Presentation() {
  const classes = useHomeStyles();

  return (
    <>
      <img src="/images/presentation.png" alt="Presentation" />
      <Typography variant="h1" className={classes.title}>
        Crie salas de Q&amp;A ao vivo.
      </Typography>
      <Typography variant="h3" className={classes.description}>
        Tire as dúvidas da sua audiência em tempo real.
      </Typography>
    </>
  );
}
