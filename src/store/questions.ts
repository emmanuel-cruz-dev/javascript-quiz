import { create } from "zustand";
import { type Question } from "../types/types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionID: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        loading: false,
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
          const questions = await getAllQuestions(limit);
          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          // structuredClone para clonar el objeto
          const newQuestions = structuredClone(questions);
          // Encontramos el índice de la pregunta
          const questionIndex = newQuestions.findIndex(
            (q) => q.id == questionId
          );
          // Obtenemos la información de la pregunta
          const questionInfo = newQuestions[questionIndex];
          // Averiguamos si el usuario ha seleccionado la respuesta correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) confetti();

          // Cambiar esta información en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          // Actualizamos el estado
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },

        reset: () => {
          set({ currentQuestion: 0, questions: [] });
        },
      };
    },
    {
      name: "questions",
    }
  )
);
