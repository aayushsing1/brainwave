document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    const email = document.getElementById("login-email").value; // Get the email value from the input field
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://eb-flask-dev.ap-southeast-2.elasticbeanstalk.com/forgot-password", requestOptions)
        .then((response) => {
            if (response.ok) {
                // If response status is OK, show success message
                document.getElementById("notification").innerText = "Password reset link has been sent to your email.";
            } else {
                // If response status is not OK, show error message
                document.getElementById("notification").innerText = "An error occurred while processing your request. Please try again later.";
            }
        })
        .catch((error) => {
            console.error(error);
            // Show error message if fetch fails
            document.getElementById("notification").innerText = "An error occurred while processing your request. Please try again later.";
        });
});
