import { getUsers, updateUserPassword } from './users.js';
import { getWebhook } from './config.js';

const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('reset-form');
const resetPasswordButton = document.getElementById('reset-password-button');
const infoDiv = document.getElementById('info');
const footer = document.getElementById('footer');
const userrole = document.getElementById('user-role');
const profilePicture = document.getElementById('profile-picture');

resetPasswordButton.style.display = 'none';
let validUsers = getUsers();
validUsers = getUsers();
const webhook = getWebhook();

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
            <p>If you encounter any issues, please <a href="https://www.codemaster.ltd/pages/contact">contact us</a>.</p>
        `;
    }, 2000);
}

//function form() {
//    setTimeout(() => {
//        if (loginForm) {
//            loginForm.style.display = 'block';
//            resetForm.style.display = 'none';
//        }
//    }, 2000);
//}

function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        sessionStorage.setItem(key, value);
    }
}

function sendDiscordNotification1(discordID, action) {
    const now = new Date();
    const timeNow = now.getHours();
    const hours24 = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    const allowedDays = [5, 6, 0]; // Friday, Saturday, Sunday, Tuesday, Wednesday
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

        if (user && (user.username === 'CodeMaster')) {
            console.log('Discordlog not sent: User is Ceo');
            return;
        }
        console.log(`User found: ${user ? 'yes' : 'no'}`);

        const message = {
            title: 'Beta Login | Code Master',
            embeds: [{
                color: 0x9A44F7,
                description: `User <@${discordID}> ${action}\n**Time: ${formattedHours}:${formattedMinutes} ${period}**\n**Date: ${now.toLocaleDateString()}**`,
                thumbnail: {
                    url: user ? user.discordPhoto : 'img/logoMain2.png' // Default image if user not found
                },
                footer: {
                    text: 'Beta Login | Code Master',
                },
                timestamp: now.toISOString() // Add the timestamp
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

function time() {
    const now = new Date();
    const hours = now.getHours();
    infoDiv.style.fontSize = '1.0rem';

    if (hours >= 0 && hours < 12) {
        setTimeout(timeOut, 0);
        infoDiv.innerHTML = '<p> Hello, Good Morning</p>';
    } else if (hours >= 12 && hours < 18) {
        setTimeout(timeOut, 0);
        infoDiv.innerHTML = '<p>Hello, Good Afternoon</p>';
    } else if (hours >= 18 && hours < 22) {
        setTimeout(timeOut, 0);
        infoDiv.innerHTML = '<p>Hello, Good Evening</p>';
    } else {
        setTimeout(timeOut, 0);
        infoDiv.innerHTML = '<p>Hello, Good Night</p>';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    copyRight();
    refreshUserData();
    time();

    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePassword.textContent = '🔒'; // Change icon to indicate visibility
            togglePassword.title = 'Hide password';
        } else {
            passwordField.type = 'password';
            togglePassword.textContent = '🔓'; // Change icon to indicate hidden
            togglePassword.title = 'Show password';
        }
    });

    const body = document.body;
    if (body) {
        // Array of background image URLs
        const backgrounds = [
            'img/background/codeMaster.jpg',
            'img/background/raysShine.jpg',
            'img/background/earthPlanet.jpg',
            'img/background/rainbowWaves.jpg',
            'img/background/neonLights.jpg',
            'img/background/neonLights2.jpg',
            'img/background/neonLights3.jpg',
            'img/background/neonLights4.jpg',
            'img/background/neonLights5.jpg',
            'img/background/neonLights6.jpg',
        ];
    
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
    
        body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
    
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim().toLowerCase(); // Convert to lowercase
            const password = document.getElementById('password').value.trim(); // Convert to lowercase

            // Debugging statements
            console.log("Entered Username:", username);
            console.log("Entered Password:", password);
            console.log("Valid Users:", validUsers);

            let user = validUsers.find(user => user.name.toLowerCase() === username && user.password === password); // Convert stored username to lowercase for comparison

            // Debugging statement
            console.log("Matching User:", user);

            if (user) {
                loginForm.style.display = 'none';

                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Login successful! Redirecting...</p>';
                if (user.name === 'codemaster' || user.name === 'CodeMaster') {
                    console.log('Discord log not sent: User is CodeMaster');
                } else {
                    sendDiscordNotification1(user.discordID, 'has successfully logged in.');
                }

                setStorageItem('username', username);
                setStorageItem('user-role', user.role);
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
                loginForm.style.display = 'block';
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
});
