// Function to fetch profile data and populate form fields
function fetchProfileData() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const username = sessionStorage.getItem('username');

    fetch(`http://eb-flask-dev.ap-southeast-2.elasticbeanstalk.com/get_profile?username=${username}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.form-group:nth-child(1) input').value = data.username;
            document.querySelector('.form-group:nth-child(2) input').value = data.password;
            document.querySelector('.form-group:nth-child(3) input').value = data.email;

        })
        .catch((error) => console.error(error));
}
window.onload = fetchProfileData;



document.getElementById("change-password-btn").addEventListener("click", function() {
    const newPassword = document.getElementById("new-password").value;
    const repeatNewPassword = document.getElementById("repeat-new-password").value;

    // Check if passwords match
    if (newPassword !== repeatNewPassword) {
        alert("Passwords do not match.");
        return;
    }

    const username = sessionStorage.getItem('username');

    // Create FormData object and append data
    const formdata = new FormData();
    formdata.append("username", username); // Assuming username is obtained dynamically
    formdata.append("new_password", newPassword);

    // Configure fetch request options
    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    // Make fetch request to update password API
    fetch("http://eb-flask-dev.ap-southeast-2.elasticbeanstalk.com/update_password", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result); // Log the response
            alert("Password updated successfully."); // Show success message
        })
        .catch((error) => {
            console.error(error); // Log any errors
            alert("An error occurred while updating the password. Please try again later."); // Show error message
        });
});

