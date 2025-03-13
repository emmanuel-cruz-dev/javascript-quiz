import { Button } from "@mui/material";

export const Start = () => {
  return (
    <Button onClick={() => console.log("Start")} variant="contained">
      ¡Empezar!
    </Button>
  );
};
