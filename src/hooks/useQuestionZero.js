import { useCallback, useEffect, useState } from "react";
import { getCurrentQuestion } from "../services/questionZeroService";

export default function useQuestionZero() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuestion = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCurrentQuestion();

      if (!data) {
        setError("No active Question Zero.");
        setQuestion(null);
      } else {
        setQuestion(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load Question Zero.");
      setQuestion(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  return {
    question,
    loading,
    error,
    refresh: loadQuestion,
  };
}