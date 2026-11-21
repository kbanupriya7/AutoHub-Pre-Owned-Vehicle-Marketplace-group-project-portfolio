
// 1. Dark Mode Toggle

var themeToggleBtn = document.getElementById("theme-toggle");
var darkIcon = document.getElementById("theme-toggle-dark-icon");
var lightIcon = document.getElementById("theme-toggle-light-icon");
var htmlElement = document.documentElement;

themeToggleBtn.addEventListener("click", function () {

    if (htmlElement.classList.contains("dark")) {

        htmlElement.classList.remove("dark");

        darkIcon.classList.remove("hidden");
        lightIcon.classList.add("hidden");

    } else {

        htmlElement.classList.add("dark");

        darkIcon.classList.add("hidden");
        lightIcon.classList.remove("hidden");

    }

});


// 2. Category Tabs (Cars vs Bikes)

var carsTab = document.querySelector('[data-target="cars"]');
var bikesTab = document.querySelector('[data-target="bikes"]');

var carCards = document.querySelectorAll(".cars");
var bikeCards = document.querySelectorAll(".bikes");


// Search elements

var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
var vehicleType = document.getElementById("vehicleType");
var noResults = document.getElementById("noResults");

var vehicleCards = document.querySelectorAll(".vehicle-card");


// Function to filter vehicles

function filterVehicles() {

    var searchValue = searchInput.value.toLowerCase().trim();
    var selectedType = vehicleType.value;

    var found = 0;

    for (var i = 0; i < vehicleCards.length; i++) {

        var card = vehicleCards[i];

        var cardText = card.innerText.toLowerCase();

        var matchesSearch = cardText.includes(searchValue);

        var matchesType =
            selectedType === "all" ||
            card.classList.contains(selectedType);

        if (matchesSearch && matchesType) {

            card.classList.remove("hidden");

            found++;

        } else {

            card.classList.add("hidden");

        }

    }

    // Show or hide no results message

    if (found === 0) {

        noResults.classList.remove("hidden");

    } else {

        noResults.classList.add("hidden");

    }

}


// Search Form Submit Event

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    filterVehicles();

});


// Cars Tab Click Event

carsTab.addEventListener("click", function () {

    carsTab.classList.add("tab-active");
    carsTab.classList.remove("text-gray-500", "dark:text-gray-400");

    bikesTab.classList.remove("tab-active");
    bikesTab.classList.add("text-gray-500", "dark:text-gray-400");

    vehicleType.value = "cars";

    filterVehicles();

});


// Bikes Tab Click Event

bikesTab.addEventListener("click", function () {

    bikesTab.classList.add("tab-active");
    bikesTab.classList.remove("text-gray-500", "dark:text-gray-400");

    carsTab.classList.remove("tab-active");
    carsTab.classList.add("text-gray-500", "dark:text-gray-400");

    vehicleType.value = "bikes";

    filterVehicles();

});


// 3. Side Navbar

var exit = document.getElementById("exit");
var sidenav = document.getElementById("sidenav");
var viewBox = document.getElementById("viewBox");

viewBox.addEventListener("click", function () {

    sidenav.style.right = "0%";

});


exit.addEventListener("click", function () {

    sidenav.style.right = "-50%";

});
