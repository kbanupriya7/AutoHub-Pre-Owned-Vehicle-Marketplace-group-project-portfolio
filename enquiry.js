const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get customer details
    const customerName = document.getElementById("name").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const email = document.getElementById("email").value.trim()
    const vehicle = document.getElementById("vehicle").value.trim()
    const message = document.getElementById("message").value.trim()


    // Name validation
    if (customerName === "") {
        alert("Please enter Name!")
        return
    }

    // Phone validation

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number!")
        return
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Vehicle validation
    if (vehicle === "") {
        alert("Please select a vehicle!")
        return
    }

    // Message validation
    if (message === "") {
        alert("Please enter your message!")
        return
    }

    // SuccessMessage v
    const successMessage = document.getElementById("successMessage")
    successMessage.classList.remove("hidden")

    // Rest Form
    enquiryForm.reset();


});