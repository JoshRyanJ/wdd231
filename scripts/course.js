document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

const menuBtn = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    navigation.classList.toggle("open");
});

const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 2, completed: true },
    { subject: 'CSE', number: 310, title: 'Applied Programming', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const courseContainer = document.getElementById("course-display");
const totalCreditsSpan = document.getElementById("total-credits");

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.className = `course-badge ${course.completed ? 'completed' : 'incomplete'}`;
        card.innerHTML = `<strong>${course.subject} ${course.number}</strong>`;
        courseContainer.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

document.getElementById("all-btn").addEventListener("click", (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById("cse-btn").addEventListener("click", (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === "CSE"));
});

document.getElementById("wdd-btn").addEventListener("click", (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === "WDD"));
});

function setActiveButton(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

displayCourses(courses);