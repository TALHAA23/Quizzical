import he from "he";

export default function Quiz(props) {
  const optionElements = props.options.map((option, index) => {
    const id = `q${props.questionNumber}option${index + 1}`;
    return (
      <>
        <input
          type="radio"
          id={id}
          value={option}
          name={`q${props.questionNumber}`}
          onChange={(event) =>
            props.isChangeAllowed && props.handleChange(event, id)
          }
        />
        <label
          id={
            id == props.selectedOptionId
              ? props.isOptionCorrect
                ? "correct-answer"
                : "incorrect-answer"
              : ""
          }
          className={
            !props.isChangeAllowed &&
            option == props.correctOption &&
            "was-correct"
          }
          htmlFor={id}
        >
          {he.decode(option)}
        </label>
      </>
    );
  });

  return (
    <div className="quiz-container">
      <h3 className="quiz--question">{he.decode(props.title)}</h3>

      <div className="quiz--options">{optionElements}</div>
      <hr />
    </div>
  );
}
