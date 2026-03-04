const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data));
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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `

        // appending element in the container
        levelConatiner.append(btnDiv);
    });
};

loadLessons();