export default function Input({ handleCustomQuiz, title, selectOptions }) {
  const selectOptionElement = selectOptions.map((option) => (
    <option value={option}>{option}</option>
  ));

  return (
    <>
      <label htmlFor={title}>Select {title}</label>
      <select
        name={title}
        id={title}
        onChange={(event) => handleCustomQuiz(event)}
      >
        {selectOptionElement}
      </select>
    </>
  );
}
