import { TextField, TextFieldProps } from "@material-ui/core";

export default function RoomInput(props: TextFieldProps) {
  return <TextField variant="outlined" fullWidth {...props} />;
}
