const createElements = (arr) => {
    const htmlElements = arr.map(element => `<span class="btn text-xl bg-[#1A91FF20]">${element}</span>`);
    return htmlElements.join(" ");
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data));
};

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => {
        btn.classList.remove("active");
    });
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url).then(res => res.json()).then(json => {
        const clickedBtn = document.getElementById(`lesson-btn-${id}`);
        removeActive();
        clickedBtn.classList.add("active");
        displayLevelWord(json.data)
    });
};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                <div class="space-y-2">
                    <h2 class="text-2xl font-bold">${word.word} <i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation}</h2>
                </div>

                <div class="space-y-2">
                    <h2 class="font-bold text-2xl">Meaning</h2>
                    <p class="bangla text-xl">${word.meaning}</p>
                </div>

                <div class="space-y-2">
                    <h2 class="font-bold text-2xl">Example</h2>
                    <p class="bangla text-xl">${word.sentence}</p>
                </div>

                <div class="space-y-2">
                    <h2 class="font-bold text-2xl">Synonyms</h2>
                    <div class="flex gap-2">   
                        ${createElements(word.synonyms)}
                    </div>
                </div>
    `;
    document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
    // get the word container and empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    
    // empty words array condition
    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center items-center mx-auto col-span-full space-y-3">
            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="bangla text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }

    words.forEach(word => {
        // create a word card
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
            <h2 class="font-bold text-3xl">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <h2 class="text-3xl bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</h2>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `

        // appending element in the container
        levelConatiner.append(btnDiv);
    });
};

loadLessons();