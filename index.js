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
var carCards = document.querySelectorAll('.cars');
var bikeCards = document.querySelectorAll('.bikes');

carsTab.addEventListener("click", function () {
    carsTab.classList.add("tab-active");
    carsTab.classList.remove("text-gray-500", "dark:text-gray-400");
    bikesTab.classList.remove("tab-active");
    bikesTab.classList.add("text-gray-500", "dark:text-gray-400");

    for (var i = 0; i < carCards.length; i++) {
        carCards[i].classList.remove("hidden");
    }
    for (var j = 0; j < bikeCards.length; j++) {
        bikeCards[j].classList.add("hidden");
    }
});

bikesTab.addEventListener("click", function () {
    bikesTab.classList.add("tab-active");
    bikesTab.classList.remove("text-gray-500", "dark:text-gray-400");
    carsTab.classList.remove("tab-active");
    carsTab.classList.add("text-gray-500", "dark:text-gray-400");

    for (var i = 0; i < bikeCards.length; i++) {
        bikeCards[i].classList.remove("hidden");
    }
    for (var j = 0; j < carCards.length; j++) {
        carCards[j].classList.add("hidden");
    }
});

// 3. Side Navbar
        var exit = document.getElementById("exit");
        var sidenav = document.getElementById("sidenav");
        var viewBox = document.getElementById("viewBox");

        viewBox.addEventListener("click",function() {
            sidenav.style.right="0%";
        })

        exit.addEventListener("click",function() {
            sidenav.style.right="-50%";
        })