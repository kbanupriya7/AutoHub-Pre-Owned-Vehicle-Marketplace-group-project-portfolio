
(function () {
    var type = document.body.getAttribute("data-type");
    var vehicles = type === "car" ? carsData : bikesData;

    //Theme toggle
    var html = document.documentElement;
    var darkIcon = document.getElementById("theme-toggle-dark-icon");
    var lightIcon = document.getElementById("theme-toggle-light-icon");

    function applyTheme(isDark) {
        html.classList.toggle("dark", isDark);
        darkIcon.classList.toggle("hidden", isDark);
        lightIcon.classList.toggle("hidden", !isDark);
    }
    var saved = null;
    try { saved = localStorage.getItem("autohub-theme"); } catch (e) { }
    applyTheme(saved === "dark");

    document.getElementById("theme-toggle").addEventListener("click", function () {
        var goDark = !html.classList.contains("dark");
        applyTheme(goDark);
        try { localStorage.setItem("autohub-theme", goDark ? "dark" : "light"); } catch (e) { }
    });

    //Side navbar
    var sidenav = document.getElementById("sidenav");
    document.getElementById("viewBox").addEventListener("click", function () { sidenav.style.right = "0%"; });
    document.getElementById("exit").addEventListener("click", function () { sidenav.style.right = "-50%"; });

    //Elements
    var grid = document.getElementById("vehicle-grid");
    var emptyBox = document.getElementById("empty-state");
    var countEl = document.getElementById("result-count");
    var searchInput = document.getElementById("search-input");
    var sortSelect = document.getElementById("sort-select");
    var minInput = document.getElementById("budget-min");
    var maxInput = document.getElementById("budget-max");
    var budgetError = document.getElementById("budget-error");
    var filterPanel = document.getElementById("filter-panel");

    //Helpers 
    function unique(key) {
        var list = [];
        vehicles.forEach(function (v) { if (list.indexOf(v[key]) === -1) list.push(v[key]); });
        return list.sort();
    }

    function formatPrice(rupees) {
        if (rupees >= 100000) {
            return "₹" + (rupees / 100000).toFixed(2).replace(/\.?0+$/, "") + " Lakh";
        }
        return "₹" + rupees.toLocaleString("en-IN");
    }

    // Checkbox
    function buildCheckboxes(containerId, key) {
        var box = document.getElementById(containerId);
        unique(key).forEach(function (value) {
            var count = vehicles.filter(function (v) { return v[key] === value; }).length;
            var label = document.createElement("label");
            label.className = "flex items-center gap-2 cursor-pointer py-1 text-sm";
            label.innerHTML =
                '<input type="checkbox" class="filter-check w-4 h-4 accent-blue-600" data-key="' + key + '" value="' + value + '">' +
                '<span class="flex-1">' + value + '</span>' +
                '<span class="text-xs text-gray-400">' + count + '</span>';
            box.appendChild(label);
        });
    }

    function getChecked(key) {
        var checked = [];
        document.querySelectorAll('.filter-check[data-key="' + key + '"]:checked').forEach(function (c) {
            checked.push(c.value);
        });
        return checked;
    }

    // Render
    function cardHTML(v) {
        var fuelColor = v.fuel === "Electric" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : v.fuel === "Diesel" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
        return '' +
            '<div class="vehicle-card border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 flex flex-col">' +
            '<div class="relative">' +
            '<img src="' + v.img + '" alt="' + v.name + '" loading="lazy" class="w-full h-48 object-cover">' +
            '<span class="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ' + fuelColor + '">' + v.fuel + '</span>' +
            '</div>' +
            '<div class="p-5 flex-grow flex flex-col">' +
            '<p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">' + v.brand + '</p>' +
            '<h3 class="font-bold text-lg">' + v.name + '</h3>' +
            '<p class="text-2xl font-bold text-blue-600 dark:text-blue-400 my-2">' + formatPrice(v.price) + '</p>' +
            '<div class="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">' +
            '<p>' + v.km.toLocaleString("en-IN") + ' km</p>' +
            '<p>' + v.fuel + '</p>' +
            '<p>' + v.gear + '</p>' +
            '<p>' + v.year + '</p>' +
            '</div>' +
            '<div class="mt-auto grid grid-cols-2 gap-2">' +
            '<a href="vehicle-details.html?type=' + type + '&id=' + v.id + '" class="bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 hover:text-white text-center p-2 rounded text-sm">View Details</a>' +
            '<a href="enquiry.html" class="border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white text-center p-2 rounded text-sm">Enquire</a>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    function applyFilters() {
        var words = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        var brands = getChecked("brand");
        var fuels = getChecked("fuel");
        var gears = getChecked("gear");

        // Budget
        var min = minInput.value === "" ? 0 : Number(minInput.value) * 100000;
        var max = maxInput.value === "" ? Infinity : Number(maxInput.value) * 100000;

        if (min > max) {
            budgetError.textContent = "Minimum budget cannot be more than maximum.";
        } else {
            budgetError.textContent = "";
        }

        var result = vehicles.filter(function (v) {
            // Search
            var text = (v.name + " " + v.brand + " " + v.fuel + " " + v.gear + " " + v.year).toLowerCase();
            var matchSearch = words.every(function (w) { return text.indexOf(w) !== -1; });

            var matchBrand = brands.length === 0 || brands.indexOf(v.brand) !== -1;
            var matchFuel = fuels.length === 0 || fuels.indexOf(v.fuel) !== -1;
            var matchGear = gears.length === 0 || gears.indexOf(v.gear) !== -1;
            var matchBudget = v.price >= min && v.price <= max;

            return matchSearch && matchBrand && matchFuel && matchGear && matchBudget;
        });

        var sort = sortSelect.value;
        if (sort === "low") result.sort(function (a, b) { return a.price - b.price; });
        else if (sort === "high") result.sort(function (a, b) { return b.price - a.price; });
        else if (sort === "newest") result.sort(function (a, b) { return b.year - a.year; });
        else if (sort === "km") result.sort(function (a, b) { return a.km - b.km; });

        grid.innerHTML = result.map(cardHTML).join("");
        emptyBox.classList.toggle("hidden", result.length !== 0);
        countEl.textContent = result.length + " of " + vehicles.length + " " + (type === "car" ? "cars" : "bikes");
    }

    function clearAll() {
        searchInput.value = "";
        minInput.value = "";
        maxInput.value = "";
        sortSelect.value = "default";
        document.querySelectorAll(".filter-check").forEach(function (c) { c.checked = false; });
        applyFilters();
    }

    
    buildCheckboxes("brand-options", "brand");
    buildCheckboxes("fuel-options", "fuel");
    buildCheckboxes("gear-options", "gear");

    document.querySelectorAll(".filter-check").forEach(function (c) { c.addEventListener("change", applyFilters); });
    searchInput.addEventListener("input", applyFilters);
    minInput.addEventListener("input", applyFilters);
    maxInput.addEventListener("input", applyFilters);
    sortSelect.addEventListener("change", applyFilters);

  
    document.querySelectorAll(".budget-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
            minInput.value = chip.getAttribute("data-min");
            maxInput.value = chip.getAttribute("data-max");
            applyFilters();
        });
    });

    document.getElementById("clear-filters").addEventListener("click", clearAll);
    document.getElementById("empty-clear").addEventListener("click", clearAll);

    // Search form
    document.getElementById("search-form").addEventListener("submit", function (e) { e.preventDefault(); applyFilters(); });

   
    document.getElementById("filter-toggle").addEventListener("click", function () {
        filterPanel.classList.toggle("hidden");
    });

    
    var params = new URLSearchParams(window.location.search);
    if (params.get("q")) searchInput.value = params.get("q");

    applyFilters();
})();
