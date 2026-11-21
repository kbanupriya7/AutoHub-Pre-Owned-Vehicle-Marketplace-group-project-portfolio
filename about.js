
// Select all FAQ questions
const faqQuestions = document.querySelectorAll(".faq-question");

// Add click event to each question
faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        // nextelementsibiling-answer below the question
        const answer = question.nextElementSibling;

        //select the + icon
        const icon = question.querySelector(".faq-icon");

        // Show or hide the answer
        answer.classList.toggle("hidden");

        // Change the icon
        if (answer.classList.contains("hidden")) {
            icon.textContent = "+";
        } else {
            icon.textContent = "-";
        }

    });

});
