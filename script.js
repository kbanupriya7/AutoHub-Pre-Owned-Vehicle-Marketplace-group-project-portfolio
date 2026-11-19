
var sellform = document.getElementById("sell-form");

var category = document.getElementById("category");
var brand = document.getElementById("brand");
var model = document.getElementById("model");
var year = document.getElementById("year");
var price = document.getElementById("price");
var km = document.getElementById("km");

var sellername = document.getElementById("seller-name");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var sellerLocation = document.getElementById("location");

var imageInput = document.getElementById("vehicle-images");
var imagePreview = document.getElementById("image-preview");

var success = document.getElementById("success-message");


// Image Preview

imageInput.addEventListener("change", function () {

    imagePreview.innerHTML = "";
    document.getElementById("image-error").textContent = "";

    var files = imageInput.files;

    if (files.length > 5) {
        document.getElementById("image-error").textContent =
            "You can upload a maximum of 5 images.";

        imageInput.value = "";
        return;
    }

    for (var i = 0; i < files.length; i++) {

        if (!files[i].type.startsWith("image/")) {
            document.getElementById("image-error").textContent =
                "Please select only image files.";

            imageInput.value = "";
            imagePreview.innerHTML = "";
            return;
        }

        var imageurl = URL.createObjectURL(files[i]);

        var img = document.createElement("img");

        img.src = imageurl;
        img.className = "preview-image";

        imagePreview.appendChild(img);

    }

});


// Form Validation

sellform.addEventListener("submit", function (event) {

    event.preventDefault();

    var isValid = true;

    // Clear previous errors

    var errors = document.querySelectorAll(".error");

    errors.forEach(function (error) {
        error.textContent = "";
    });

    success.classList.add("hidden");


    // Category Validation

    if (category.value === "") {
        document.getElementById("category-error").textContent =
            "Please select a vehicle category.";

        isValid = false;
    }


    // Brand Validation

    if (brand.value.trim() === "") {
        document.getElementById("brand-error").textContent =
            "Please enter the vehicle brand.";

        isValid = false;
    }


    // Model Validation

    if (model.value.trim() === "") {
        document.getElementById("model-error").textContent =
            "Please enter the vehicle model.";

        isValid = false;
    }


    // Year Validation

    var currentYear = new Date().getFullYear();

    if (year.value.trim() === "" ||
        Number(year.value) < 1900 ||
        Number(year.value) > currentYear) {

        document.getElementById("year-error").textContent =
            "Please enter a valid manufacturing year.";

        isValid = false;
    }


    // Price Validation

    if (price.value.trim() === "" || Number(price.value) <= 0) {

        document.getElementById("price-error").textContent =
            "Please enter a valid selling price.";

        isValid = false;
    }


    // Kilometres Validation

    if (km.value.trim() === "" || Number(km.value) < 0) {

        document.getElementById("km-error").textContent =
            "Please enter valid kilometres driven.";

        isValid = false;
    }


    // Image Validation

    if (imageInput.files.length === 0) {

        document.getElementById("image-error").textContent =
            "Please upload at least one vehicle image.";

        isValid = false;
    }


    // Seller Name Validation

    if (sellername.value.trim() === "") {

        document.getElementById("name-error").textContent =
            "Please enter your name.";

        isValid = false;
    }


    // Phone Validation

    var phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone.value.trim())) {

        document.getElementById("phone-error").textContent =
            "Please enter a valid 10-digit mobile number.";

        isValid = false;
    }


    // Email Validation

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        document.getElementById("email-error").textContent =
            "Please enter a valid email address.";

        isValid = false;
    }




   // Location Validation

if (sellerLocation.value.trim() === "") {

    document.getElementById("location-error").textContent =
        "Please enter your location.";

    isValid = false;
}


    // Success Message

    if (isValid) {

        success.classList.remove("hidden");

        sellform.reset();

        imagePreview.innerHTML = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});
