import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { Start } from "./components/Start";
import { JavaScriptLogo } from "./components/JavaScriptLogo";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./components/Game";

function App() {
  const questions = useQuestionsStore((store) => store.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          marginBottom="8px"
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
