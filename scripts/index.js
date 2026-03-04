const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url).then(res => res.json()).then(json => displayLevelWord(json.data));
};

const displayLevelWord = (words) => {
    // get the word container and empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        // create a word card
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
            <h2 class="font-bold text-3xl">${word.word}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <h2 class="text-3xl bangla">"${word.meaning} / ${word.pronunciation}"</h2>
        </div>
        `

        // appending in the container
        wordContainer.append(card);
    });
};

const displayLessons = (lessons) => {
    // get the container and empty
    const levelConatiner = document.getElementById("level-container")
    levelConatiner.innerHTML = "";

    // getting each lesson
    lessons.forEach(lesson => {
        // consoling all lessons
        // console.log(lesson);

        // create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `

        // appending element in the container
        levelConatiner.append(btnDiv);
    });
};

loadLessons();