import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import questions from "./questions";

export default function LoveTrustTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (answer) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAnswers([...answers, answer]);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg text-center">
      {currentQuestion < questions.length ? (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold mb-4">Вопрос {currentQuestion + 1} из {questions.length}</h1>
          <p className="font-semibold mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={uuidv4()}
                onClick={() => handleAnswer(option)}
                className="w-full py-2 px-4 border rounded-lg hover:bg-gray-100 transition"
                disabled={isTransitioning}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold mb-4">Тест завершен!</h1>
          <p className="text-lg">Спасибо за прохождение теста. Твои ответы помогут тебе лучше понять себя и свои отношения!</p>
        </motion.div>
      )}
    </div>
  );
}
import LoveTrustTest from "./LoveTrustTest";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoveTrustTest />
    </div>
  );
}
{
  "name": "love-trust-test",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^13.0.0",
    "framer-motion": "^10.12.16",
    "uuid": "^9.0.1"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
