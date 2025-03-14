import { useQuestionsData } from "../hooks/useQuestionsData";

export function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData();

  return (
    <footer style={{ marginTop: "1rem" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ? ${unanswered} sin responder`}</strong>
    </footer>
  );
}
