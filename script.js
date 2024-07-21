import { getUsers, getWebhook } from './users.js';
const overrideTime = false;

document.addEventListener("DOMContentLoaded", function() {
    const validUsers = getUsers();
    const webhook = getWebhook();

    function addFontAndIconLinks() {
        const head = document.head;

        const iconLink = document.createElement('link');
        iconLink.type = 'image/png';
        iconLink.rel = 'icon' || 'shortcut icon' || 'apple-touch-icon';
        iconLink.href = 'img/logo.png';
        iconLink.sizes = '180x180' || '192x192' || '512x512';
        head.appendChild(iconLink);
    }

    addFontAndIconLinks();

    const loginForm = document.getElementById('login-form');
    const infoDiv = document.getElementById('info');
    const welcome = document.getElementById('welcome');
    const userrole = document.getElementById('user-role');
    const footer = document.getElementById('footer');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const selectedRole = document.getElementById('role').value.trim();
    
            console.log(`Username: ${username}`);  // Debugging log
            console.log(`Password: ${password}`);  // Debugging log
            console.log(`Role: ${selectedRole}`);  // Debugging log
    
            let user = validUsers.find(user => 
                user.name === username && 
                user.password === password && 
                user.role.toLowerCase() === selectedRole.toLowerCase()
            );
    
            if (user) {
                welcome.innerHTML = 'Welcome, ' + username;
    
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
                sendDiscordNotification1(user.discordID, 'has successfully logged in.');
                userrole.innerHTML = '<h3>User Role: ' + user.role + '</h3>';
                setTimeout(function() {
                    window.location.href = './beta.html'; // Redirect to the dashboard or another page
                }, 3000); // Delay for the message to be seen
            } else {
                // Check for specific errors
                const validUser = validUsers.find(user => 
                    user.name === username || 
                    user.password === password || 
                    user.role.toLowerCase() === selectedRole.toLowerCase()
                );
    
                if (!validUser) {
                    // All credentials are wrong
                    infoDiv.style.fontSize = '1.2em';
                    infoDiv.style.color = 'red';
                    infoDiv.innerHTML = '<p>Invalid username, password, or role. Please try again.</p>';
                    timeOut();
                } else {
                    // Specific errors
                    if (validUser.name !== username) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'red';
                        infoDiv.innerHTML = '<p>Invalid username.</p>';
                        timeOut();
                    } else if (validUser.password !== password) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'red';
                        infoDiv.innerHTML = '<p>Invalid password.</p>';
                        timeOut();
                    } else if (validUser.role.toLowerCase() !== selectedRole.toLowerCase()) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'red';
                        infoDiv.innerHTML = '<p>Invalid role.</p>';
                        timeOut();
                    } else if (validUser.name !== username && validUser.password !== password && validUser.role.toLowerCase() !== selectedRole.toLowerCase()) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'amber';
                        infoDiv.innerHTML = `<p>You don't have an account!.</p>`;
                        timeOut();
                    }
                }
    
                welcome.innerHTML = '';
            }
        });
    }    

    function timeOut() {
        setTimeout(function() {
            infoDiv.style.fontSize = '14px';
            infoDiv.style.color = 'white';
            infoDiv.innerHTML = `
                <p>Welcome to Code Master Beta.</p>
                <p>If you encounter any issues, or you want to reset password - please <a href="https://www.codemaster.ltd/pages/contact">contact us</a>.</p>
            `;
        }, 2000);
    }

    function copyRight() {
        if (footer) {
            const currentYear = new Date().getFullYear();
            if (currentYear === 2024) {
                footer.innerHTML = " 2024";
            } else {
                footer.innerHTML = ` 2024 - ${currentYear}`;
            }
        }
    }

    function sendDiscordNotification1(discordID, action) {
        const now = new Date();
        const hours = now.getHours();
        const day = now.getDay();
    
        const allowedDays = [5, 6, 0];

        // Define the time window for sending notifications (9 AM to 10 PM)
        const startHour = 9;
        const endHour = 22;
    
        // Check if the current time is within the allowed time window
        if (allowedDays.includes(day) || (overrideTime === true || (hours >= startHour && hours < endHour))) {
            const message = {
                content: `User <@${discordID}> ${action}`,
                username: 'Beta Login | Code Master'
            };
    
            fetch(webhook, {
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
        } else {
            console.log('Notification not sent: Outside allowed time window.');
        }
    }    

    copyRight();
});
