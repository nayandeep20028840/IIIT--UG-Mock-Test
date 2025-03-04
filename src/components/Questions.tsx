import React, { useEffect, useState } from "react";
import { useQuestionStore } from "../store/questionStore";
import BottomNavigation from "../components/BottomNavigation";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const Questions: React.FC = () => {
  const { selected, setSelected } = useQuestionStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        const data = await response.json();
        console.log(data.questions.length);
        setQuestions(data.questions);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading questions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const question = questions?.find((q) => q.id === selected) || null;

  const handleNextQuestion = () => setSelected((selected % 120) + 1);
  const handleReviewNextQuestion = () => setSelected((selected % 120) + 1);
  const handleSubmitNextQuestion = () => setSelected((selected % 120) + 1);
  const handleSubmitMarkQuestion = () => setSelected((selected % 120) + 1);

  return (
    <div className="flex flex-col h-screen overflow-y-auto p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        IIITprep UGEE Mock 9 - SUPR Question {question?.id || "-"} of {120}{" "}
        <span className="font-bold">(SUPR PHYSICS)</span>
      </h2>

      <p className="text-gray-700 font-semibold">Ques:</p>
      <p className="ml-10 text-gray-700 leading-relaxed font-medium">
        {question?.question || "No question available"}
      </p>

      {question?.options?.length > 0 && (
        <div className="mt-3 ml-3">
          {question.options.map((option: string, index: number) => (
            <div key={index} className="flex items-center p-1">
              <input
                type="radio"
                name={`q${question.id}`}
                className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400"
              />
              <span className="text-gray-800 font-medium">{option}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation
        onNext={handleNextQuestion}
        onReviewNext={handleReviewNextQuestion}
        onSubmitNext={handleSubmitNextQuestion}
        onSubmitMark={handleSubmitMarkQuestion}
      />
    </div>
  );
};

export default Questions;
