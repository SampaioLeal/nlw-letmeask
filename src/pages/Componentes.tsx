import { Button } from "@material-ui/core";
import LoginIcon from "../components/LoginIcon";
import GoogleIcon from "../components/GoogleIcon";
import RoomCodeButton from "../components/RoomCodeButton";

export default function Componentes() {
  return (
    <>
      <Button variant="contained" color="primary" fullWidth>
        <LoginIcon />
        Entrar na sala
      </Button>
      <br />
      <br />
      <Button variant="contained" color="primary" fullWidth>
        Criar sala
      </Button>
      <br />
      <br />
      <Button variant="outlined" fullWidth>
        <GoogleIcon />
        Entrar com o google
      </Button>
      <br />
      <br />
      <Button variant="contained" color="primary">
        Enviar pergunta
      </Button>
      <br />
      <br />
      <Button variant="contained" color="secondary">
        Encerrar sala
      </Button>
      <br />
      <br />
      <Button variant="contained">Cancelar</Button>
      <br />
      <br />
      <Button variant="outlined" color="primary" size="small">
        Encerrar sala
      </Button>
      <br />
      <br />
      <RoomCodeButton />
    </>
  );
}
