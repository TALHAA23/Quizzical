import popDownMenu from "../src/popDownMenu";
import Input from "./PullDownInput";
function inputElementsGenerator(handleCustomQuiz) {
  const inputElements = popDownMenu.map((item) => (
    <Input
      key={item.title}
      title={item.title}
      selectOptions={item.options}
      handleCustomQuiz={handleCustomQuiz}
    />
  ));

  return inputElements;
}

export default function Home(props) {
  return (
    <div className="home-page">
      <h3 className="home-page--heading">Quizzical</h3>
      <p>Quiz form Open trivia database </p>
      <button className="home-page--start-button" onClick={props.switchPage}>
        Start
      </button>

      <label className="popMenuButton" htmlFor="customeMenuPopper">
        Customize Quiz Here
      </label>
      <input type="checkbox" id="customeMenuPopper" />

      <section className="popDown-form">
        <label htmlFor="no.ofQs">Number of Questions</label>
        <input
          name="amount"
          id="no.ofQs"
          type="number"
          max={20}
          min={5}
          value={props.quizAmount}
          onChange={(event) => props.handleCustomQuiz(event)}
        />
        {inputElementsGenerator(props.handleCustomQuiz)}
        <button className="popDown-form--submit-btn" onClick={props.switchPage}>
          Procced
        </button>
      </section>
    </div>
  );
}
