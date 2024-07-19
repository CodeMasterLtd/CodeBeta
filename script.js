document.addEventListener("DOMContentLoaded", function() {
    // Using let for flexible object modification
    let validUsers = {
        'Kieran': 'Caitlin230124',
        'user2': 'password456'
    };

    function addFontAndIconLinks() {
        const head = document.head;

        const iconLink = document.createElement('link');
        iconLink.type = 'image/jpeg' && 'image/png';
        iconLink.rel = 'apple-touch-icon' && 'icon';
        iconLink.href = 'img/logo.png';
        iconLink.size = '180x180' && '192x192' && '512x512';
        head.appendChild(iconLink);
    }

    addFontAndIconLinks();

    const loginForm = document.getElementById('login-form');
    const infoDiv = document.getElementById('info');
    const warningBox = document.getElementById('warning');
    const welcome = document.getElementById('welcome');

    warningBox.style.backgroundImage = "url('https://www.codemaster.ltd/cdn/shop/files/codemaster_1.jpg?v=1719057471&width=140')";

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log(`Username: ${username}`);  // Debugging log
        console.log(`Password: ${password}`);  // Debugging log

        if (validUsers[username] === password) {
            welcome.innerHTML = 'Welcome, ' + (validUsers[username] ? '' + username : '');
            warningBox.style.color = '#000';
            warningBox.style.backgroundImage = "";
            warningBox.style.backgroundColor = 'green';
            warningBox.innerHTML = '<h3>Success</h3>';

            infoDiv.style.fontSize = '1.2em';
            infoDiv.style.color = 'green';
            infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
            setTimeout(function() {
                window.location.href = 'https://codemaster.ltd/pages/beta'; // Redirect to the dashboard or another page
            }, 3000); // Delay for the message to be seen
        } else {
            welcome.innerHTML = '';
            warningBox.style.color = '#000';
            warningBox.style.backgroundImage = "";
            warningBox.style.backgroundColor = 'red';
            warningBox.innerHTML = '<h3>Error</h3>';
            warningBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

            infoDiv.style.fontSize = '1.2em';
            infoDiv.style.color = 'red';
            infoDiv.innerHTML = '<p>Invalid username or password, Please try again.</p>';
        }
    });
});