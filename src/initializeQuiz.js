const catagories = [
    "General knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musical & Theaters",
    "Entertainment: Televsion",
    "Entertainment: Video Game",
    "Entertainment: Board Game",
    "Science & Nature",
    "Science: Computer",
    "Science: mathematics",
    "Mythology",
    "Sports",
    "Geogarapgy",
    "History",
    "Politics",
    "Arts",
    "Celebrities",
    "Animals",
]

export default async function initQuiz(urlObject, quizSetter, formDataSetter) {

    let url = `https://opentdb.com/api.php?`;

    for (let [key, value] of Object.entries(urlObject)) {
        if (!value) continue
        if (key == 'catagory') value = catagories.indexOf(value) + 9
        url += `${key}=${value}&`
    } //add query to url
    url = url.substring(0, url.length - 1);

    let getQuiz = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)

    // combine correct+incorrect in one options array
    getQuiz = await getQuiz.map(data => {
        return {
            ...data,
            options: [data.correct_answer, ...data.incorrect_answers].sort(() => Math.random() - 0.5)
        }
    })

    quizSetter(getQuiz); //init quiz state
    formDataSetter(
        //create empty form data
        getQuiz.map((item, index) => {
            return {
                id: "",
                name: `q${index + 1}`,
                selectedOption: "",
                correctAnswer: item.correct_answer
            };
        })
    );
}