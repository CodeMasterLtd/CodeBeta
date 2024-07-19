document.addEventListener("DOMContentLoaded", function() {
    // Using let for flexible object modification
    let validUsers = {
        'Kieran': 'Caitlin230124',
        'user2': 'password456'
    };

    const loginForm = document.getElementById('login-form');
    const infoDiv = document.getElementById('info');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log(`Username: ${username}`);  // Debugging log
        console.log(`Password: ${password}`);  // Debugging log

        if (validUsers[username] === password) {
            infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
            setTimeout(function() {
                window.location.href = 'https://www.codemaster.ltd/pages/beta'; // Redirect to the dashboard or another page
            }, 1000); // Delay for the message to be seen
        } else {
            infoDiv.innerHTML = '<p>Invalid username or password.</p>';
        }
    });
});