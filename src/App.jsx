import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Home from "../components/Home";
import Quiz from "../components/Quiz";
import initQuiz from "./initializeQuiz";

export default function App() {
  const [currentPage, setCurrentPage] = useState("homepage");
  const [quiz, setQuiz] = useState([]);
  const [quizElements, setQuizElements] = useState([]);
  const [formData, setFormData] = useState([]);
  const [score, setScore] = useState(-1);
  const [resetQuiz, setResetQuiz] = useState(false);
  const [isChangeAllow, setIsChangeAllow] = useState(true);
  const [customizedQuiz, setCustomizedQuiz] = useState({
    amount: 5,
    catagory: "",
    difficulty: "",
    type: "",
  });

  useEffect(() => {
    initQuiz(customizedQuiz, setQuiz, setFormData);
  }, [resetQuiz, customizedQuiz]);

  useEffect(() => {
    setQuizElements(
      quiz.map((item, index) => (
        <Quiz
          key={nanoid()}
          isChangeAllowed={isChangeAllow}
          questionNumber={index + 1}
          title={item.question}
          options={item.options}
          correctOption={item.correct_answer}
          value={formData[index].selectedOption}
          selectedOptionId={formData[index].id}
          isOptionCorrect={formData[index].isOptionCorrect}
          handleChange={handleChange}
        />
      ))
    );
  }, [quiz, score]);

  function switchPage() {
    currentPage == "homepage" && setCurrentPage("quizpage");
  }

  function handleCustomQuiz(event) {
    const { name, value } = event.target;
    setCustomizedQuiz((prevCustomization) => {
      return {
        ...prevCustomization,
        [name]:
          value == "true/false"
            ? "boolean"
            : value == "Any difficulty" || value == "Any Catagory"
            ? ""
            : value,
      };
    });
  }

  function handleChange(event, id) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return prevFormData.map((data) => {
        return data.name == name
          ? { ...data, id, selectedOption: value }
          : data;
      });
    });
  }

  function handleQuizSubmit(event) {
    event.preventDefault();
    setIsChangeAllow(false);

    let currentScore = 0;

    formData.forEach(({ selectedOption, correctAnswer }) => {
      if (selectedOption == correctAnswer) currentScore++;
    });
    setScore(currentScore);

    setFormData((prevFormData) => {
      return prevFormData.map((data) => {
        if (data.selectedOption == data.correctAnswer) {
          return { ...data, isOptionCorrect: true };
        } else return { ...data, isOptionCorrect: false };
      });
    });
  }

  function resetPage(event) {
    event.preventDefault();
    setScore(0);
    setCurrentPage("homepage");
    setQuizElements([]);
    setIsChangeAllow(true);
    setResetQuiz((prevReset) => !prevReset);
  }

  return (
    <>
      {currentPage == "homepage" && (
        <Home
          switchPage={switchPage}
          quizAmount={customizedQuiz.amount}
          handleCustomQuiz={handleCustomQuiz}
        />
      )}
      {currentPage == "quizpage" && (
        <form className="quiz-form">
          <div>
            {quizElements}
            <div className="quiz-form--submission">
              {score > -1 && (
                <span className="quiz-form--submission--score">
                  You score {score}/{quiz.length}
                </span>
              )}
              <button
                className="quiz-form--submission--submit-btn"
                onClick={handleQuizSubmit}
              >
                Submit
              </button>
              <button
                className="quiz-form--submission--reset-btn"
                onClick={resetPage}
              >
                <FontAwesomeIcon icon={faRepeat} /> Play Again
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
