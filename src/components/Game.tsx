// import { IconButton, Stack } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

const Question = ({ info }) => {};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Question />
    </>
  );
};
