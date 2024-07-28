import { getUsers, updateUserPassword } from './users.js';
import { getWebhook, bugError, getWebhookBug } from './config.js';

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
            <p>Code Master Beta.</p>
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
    const timeNow = now.getHours();
    const hours24 = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    const allowedDays = [5, 6, 0]; // Friday, Saturday, Sunday, Monday
    const startHour = 8;
    const endHour = 22;

    // Convert to 12-hour format and determine AM/PM
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedHours = hours12.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Log the current day and time
    console.log(`Current day: ${day}, hours: ${hours24}, minutes: ${formattedMinutes}`);

    // Check if the current time is within the allowed days and hours
    if (allowedDays.includes(day) || (timeNow >= startHour && timeNow < endHour)) {
        const user = validUsers.find(user => user.discordID === discordID);
        console.log(`User found: ${user ? 'yes' : 'no'}`);

        const message = {
            title: 'Beta Login | Code Master',
            embeds: [{
                description: `User <@${discordID}> ${action}\n**Time: ${formattedHours}:${formattedMinutes} ${period}**\n**Date: ${now.toLocaleDateString()}**`,
                thumbnail: {
                    url: user ? user.discordPhoto : 'img/logoMain2.png' // Default image if user not found
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
        console.log('Notification not sent: Outside allowed time window or not an allowed day.');
    }
}

function sendBugNotification(title, description, image) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();


    // Check if the current time is within the allowed days and hours
    if (hours === 0 && minutes === 0 && seconds === 0) {
        const embed = {
            content: `<@&${bugerror}>`,
            embeds: [
                {
                    title: title,
                    description: description,
                    image: {
                        url: image
                    },
                    footer: {
                        text: "Code Master Beta"
                    },
                username: 'Beta Login | Code Master'
            }]
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
                console.log('Discord notification sent successfully');
            } else {
                console.error('Failed to send Discord notification:', response.status, response.statusText);
            }
        })
        .catch(error => console.error('Error sending Discord notification:', error));
    } else {
        console.log('Notification not sent: Outside allowed time window or not an allowed day.');
    }
}

function time() {
    const now = new Date();
    const hours = now.getHours();

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
}

document.addEventListener("DOMContentLoaded", function() {
    copyRight();
    refreshUserData();

    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePassword.textContent = '🙈'; // Change icon to indicate visibility
            togglePassword.title = 'Hide password';
        } else {
            passwordField.type = 'password';
            togglePassword.textContent = '👁️'; // Change icon to indicate hidden
            togglePassword.title = 'Show password';
        }
    });

    const day = new Date().getDay();
    const body = document.body;
    if (body) {
        switch(day) {
            case 0: // Sunday
                body.style.backgroundImage = "url('img/background/codeMaster.jpg')";
                break;
            case 1: // Monday
                body.style.backgroundImage = "url('img/background/raysShine.jpg')";
                break;
            case 2: // Tuesday
            body.style.backgroundImage = "url('img/background/earthPlanet.jpg')";
                break;
            case 3: // Wednesday
            body.style.backgroundImage = "url('img/background/rainbowWaves.jpg')";
                break;
            case 4: // Thursday
            body.style.backgroundImage = "url('img/background/neonLights.jpg')";
                break;
            case 5: // Friday
            body.style.backgroundImage = "url('img/background/neonLights2.jpg')";
                break;
            case 6: // Saturday
            body.style.backgroundImage = "url('img/background/neonLights3.jpg')";
                break;
            default:
                body.style.backgroundImage = "url('img/background/codeMaster.jpg')";
        }
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim().toLowerCase(); // Convert to lowercase

            let user = validUsers.find(user => user.name === username && user.password.toLowerCase() === password); // Convert stored password to lowercase for comparison

            if (user) {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
                sendDiscordNotification1(user.discordID, 'has successfully logged in.');
                userrole.innerHTML = '<h3>User Role: ' + user.role + '</h3>';

                setStorageItem('username', username);
                setStorageItem('discordId', user.discordID);
                setStorageItem('profile-picture', user.discordPhoto);

                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to the dashboard or another page
                }, 2000);
            } else {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'red';
                infoDiv.innerHTML = '<p>Invalid username or password. Please try again.</p>';
                profilePicture.src = 'img/logoMain2.png';
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
            const newPassword = document.getElementById('new-password').value.trim().toLowerCase(); // Convert to lowercase

            updateUserPassword(resetUsername, newPassword);
            refreshUserData();

            const user = validUsers.find(user => user.name === resetUsername);
            if (user && user.password.toLowerCase() === newPassword) { // Convert stored password to lowercase for comparison
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
    time();
    sendBugNotification("Services Available", "Our Services are currently available.", "img/error/online.png");
});
