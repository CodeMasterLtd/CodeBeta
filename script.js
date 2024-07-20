document.addEventListener("DOMContentLoaded", function() {
    let validUsers = [
        {
            "name": "Kieran",
            "password": "Caitlin230124",
            "role": "Admin"
        },
        {
            "name": "user",
            "password": "user",
            "role": "Beta"
        }
    ];

    function addFontAndIconLinks() {
        const head = document.head;

        const iconLink = document.createElement('link');
        iconLink.type = 'image/png';
        iconLink.rel = 'icon';
        iconLink.href = 'img/logo.png';
        iconLink.sizes = '180x180 192x192 512x512';
        head.appendChild(iconLink);
    }

    addFontAndIconLinks();

    const loginForm = document.getElementById('login-form');
    const infoDiv = document.getElementById('info');
    const warningBox = document.getElementById('warning');
    const welcome = document.getElementById('welcome');
    const footer = document.getElementById('footer');
    const userrole = document.getElementById('user-role');

    warningBox.style.backgroundImage = "url('https://www.codemaster.ltd/cdn/shop/files/codemaster_1.jpg?v=1719057471&width=140')";

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const selectedRole = document.getElementById('role').value.trim();

            console.log(`Username: ${username}`);  // Debugging log
            console.log(`Password: ${password}`);  // Debugging log
            console.log(`Role: ${selectedRole}`);  // Debugging log

            let user = validUsers.find(user => user.name === username && user.password === password && user.role.toLowerCase() === selectedRole.toLowerCase());

            if (user) {
                welcome.innerHTML = 'Welcome, ' + username;
                warningBox.style.color = '#000';
                warningBox.style.backgroundImage = "";
                warningBox.style.backgroundColor = 'green';
                warningBox.innerHTML = '<h3>Success</h3>';

                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
                sendDiscordNotification1(username, 'has successfully logged in.');
                userrole.innerHTML = '<h3>User Role: ' + user.role + '</h3>';
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
                infoDiv.innerHTML = '<p>Invalid username, password, or role. Please try again.</p>';
            }
        });
    }

    function copyRight() {
        const currentYear = new Date().getFullYear();
        if (currentYear === 2025) {
            footer.innerHTML = " 2024";
        } else {
            footer.innerHTML = " 2024 - " + currentYear;
        }
    }

    const DISCORD_WEBHOOK_URL2 = 'https://discord.com/api/webhooks/1264315006854496288/JZz_aHj85UAm5aipAPkbV2eWtNj4IddhhwQ1SKNF5AcIPbpStWTa4BH1SSG_eUFmyZCD';
    function sendDiscordNotification1(username, action) {
        const message = {
            content: `User ${username} ${action}`,
            username: 'Code Master Beta Login'
        };

        fetch(DISCORD_WEBHOOK_URL2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (response.ok) {
                console.log('Discord notification sent successfully');
            } else {
                console.error('Failed to send Discord notification:', response.status, response.statusText);
            }
        })
        .catch(error => console.error('Error sending Discord notification:', error));
    }

    copyRight();
});
