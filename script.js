import { getUsers, getWebhook, updateUserPassword, bugError, getWebhookBug } from './users.js';

const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('reset-form');
const resetPasswordButton = document.getElementById('reset-password-button');
const infoDiv = document.getElementById('info');
const footer = document.getElementById('footer');
const userrole = document.getElementById('user-role');
const profilePicture = document.getElementById('profile-picture');

resetPasswordButton.style.display = 'none';
let validUsers = getUsers();
const webhook = getWebhook();
const bugerror = bugError();
const bugwebhook = getWebhookBug();
const BugNotify = true;

function addFontAndIconLinks() {
    const head = document.head;
    const iconLink = document.createElement('link');
    iconLink.type = 'image/png';
    iconLink.rel = 'icon';
    iconLink.href = 'img/logo.png';
    iconLink.sizes = '180x180'; // Prefer single size; others can be added if needed
    head.appendChild(iconLink);
}

function copyRight() {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = (currentYear === 2024) ? "2024" : `2024 - ${currentYear}`;
}

function refreshUserData() {
    validUsers = getUsers();
}

function timeOut() {
    setTimeout(() => {
        infoDiv.style.fontSize = '14px';
        infoDiv.style.color = 'white';
        infoDiv.innerHTML = `
            <p>Welcome to Code Master Beta.</p>
            <p>If you encounter any issues, please <a href="https://www.codemaster.ltd/pages/contact">contact us</a>.</p>
        `;
    }, 2000);
}

function form() {
    setTimeout(() => {
        if (loginForm) {
            loginForm.style.display = 'block';
            resetForm.style.display = 'none';
        }
    }, 2000);
}

// Utility functions to get and set items in localStorage or sessionStorage
function getStorageItem(key) {
    if (localStorage.getItem(key)) {
        return localStorage.getItem(key);
    }
    return sessionStorage.getItem(key);
}

function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        sessionStorage.setItem(key, value);
    }
}

function removeStorageItem(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
}

function sendDiscordNotification1(discordID, action) {
    const now = new Date();
    const hours24 = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    const allowedDays = [5, 6, 0]; // Friday, Saturday, Sunday
    const startHour = 8;
    const endHour = 22;

    // Convert to 12-hour format and determine AM/PM
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedHours = hours12.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    if (allowedDays.includes(day) || (hours24 >= startHour && hours24 < endHour)) {
        const user = validUsers.find(user => user.discordID === discordID);
        const message = {
            title: 'Beta Login | Code Master',
            embeds: [{
                description: `User <@${discordID}> ${action}\n**Time: ${formattedHours}:${formattedMinutes} ${period}**\n**Date: ${now.toLocaleDateString()}**`,
                thumbnail: {
                    url: user ? user.discordPhoto : 'https://www.codemaster.ltd/cdn/shop/files/codemaster_1.jpg?v=1719057471' // Default image if user not found
                },
                username: 'Beta Login | Code Master'
            }]
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

function sendBugNotification(title, description, color, image) {
    const embed = {
        content: `<@&${bugerror}>`,
        embeds: [
            {
                title: title,
                description: description,
                color: color, // Orange color in decimal (0xFFA500)
                image: {
                    url: image
                },
                footer: {
                    text: "Code Master Beta"
                }
            }
        ],
        username: 'Beta Alerts | Code Master'
    };

    fetch(bugwebhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(embed)
    })
    .then(response => {
        if (response.ok) {
            console.log('Bug notification sent successfully');
        } else {
            console.error('Failed to send bug notification:', response.status, response.statusText);
        }
    })
    .catch(error => console.error('Error sending bug notification:', error));
}

function time() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (hours >= 0 && hours < 12) {
        setTimeout(timeOut, 5000);
        infoDiv.innerHTML = '<p>Good Morning</p>';
    } else if (hours >= 12 && hours < 18) {
        setTimeout(timeOut, 5000);
        infoDiv.innerHTML = '<p>Good Afternoon</p>';
    } else if (hours >= 18 && hours < 22) {
        setTimeout(timeOut, 5000);
        infoDiv.innerHTML = '<p>Good Evening</p>';
    } else {
        setTimeout(timeOut, 5000);
        infoDiv.innerHTML = '<p>Good Night</p>';
    }

    if ((hours === 0 && minutes === 0 && seconds === 0) || (hours === 12 && minutes === 0 && seconds === 0)) {
        if (BugNotify) {
            sendBugNotification("Services Unavailable", "We are currently experiencing issues with our services. Some things may or may not work.", 16753920, "https://github.com/CodeMasterLtd/CodeBeta/blob/main/img/down.png?raw=true");
        } else {
            sendBugNotification("Services Online", "Everything seems normal here.", 65280, "https://github.com/CodeMasterLtd/CodeBeta/blob/main/img/online.png?raw=true");
        }
    }
}

time();
addFontAndIconLinks();

document.addEventListener("DOMContentLoaded", function() {
    copyRight();

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            let user = validUsers.find(user => user.name === username && user.password === password);

            if (user) {
                welcome.innerHTML = 'Welcome, ' + username;
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
                sendDiscordNotification1(user.discordID, 'has successfully logged in.');
                userrole.innerHTML = '<h3>User Role: ' + user.role + '</h3>';

                if (user.discordPhoto) {
                    profilePicture.src = user.discordPhoto;
                    profilePicture.style.boxShadow = 'orange 0 0 10px';
                }

                setStorageItem('username', username);
                setStorageItem('discordId', user.discordID);
                setStorageItem('profile-picture', user.discordPhoto);

                setTimeout(() => {
                    window.location.href = 'beta.html'; // Redirect to the dashboard or another page
                }, 3000);
            } else {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'red';
                infoDiv.innerHTML = '<p>Invalid username or password. Please try again.</p>';
                welcome.innerHTML = '';
                profilePicture.src = 'https://www.codemaster.ltd/cdn/shop/files/codemaster_1.jpg?v=1719057471';
                profilePicture.style.boxShadow = 'orange 0 0 10px';
            }
        });
    }

    if (resetPasswordButton) {
        resetPasswordButton.addEventListener('click', function() {
            resetForm.style.display = resetForm.style.display === 'none' ? 'block' : 'none';
            resetPasswordButton.style.display = 'none';
            loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (resetForm) {
        resetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const resetUsername = document.getElementById('reset-username').value.trim();
            const newPassword = document.getElementById('new-password').value.trim();

            updateUserPassword(resetUsername, newPassword);
            refreshUserData();

            const user = validUsers.find(user => user.name === resetUsername);
            if (user.password === newPassword) {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Password reset successful! You can now log in with your new password.</p>';
                resetForm.style.display = 'none';
                setTimeout(() => {
                    loginForm.style.display = 'block';
                    resetPasswordButton.style.display = 'block';
                }, 3000);
            } else {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'red';
                infoDiv.innerHTML = '<p>Invalid username or error in updating password. Please try again.</p>';
                setTimeout(() => {
                    loginForm.style.display = 'block';
                    resetPasswordButton.style.display = 'block';
                }, 3000);
            }
        });
    }
});
