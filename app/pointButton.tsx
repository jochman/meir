import { Button, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
interface Props {
  point: string;
  setPoint: Dispatch<SetStateAction<string>>;
}
export default function PointButton({ point, setPoint }: Props) {
  const [input, setChange] = useState<string>(point);
  return (
    <div style={{ backgroundColor: "white" }}>
      <TextField
        id="outlined-basic"
        label="נקודה"
        variant="outlined"
        onChange={(e) => setChange(e.target.value)}
        helperText="נקודה לבדוק תוכניות אליה"
        defaultValue={point}
      ></TextField>
      <Button onClick={() => setPoint(input)}>שלח</Button>
    </div>
  );
}
