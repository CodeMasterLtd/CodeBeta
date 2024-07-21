import { getUsers, getWebhook, updateUserPassword, bugError, getWebhookBug } from './users.js';

const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('reset-form');
const resetPasswordButton = document.getElementById('reset-password-button');
const infoDiv = document.getElementById('info');
const welcome = document.getElementById('welcome');
const userrole = document.getElementById('user-role');
const footer = document.getElementById('footer');
const profilePicture = document.getElementById('profile-picture');

let validUsers;
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

function sendDiscordNotification1(discordID, action) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    const allowedDays = [5, 6, 0]; // Friday, Saturday, Sunday
    const startHour = 9;
    const endHour = 22;

    if (allowedDays.includes(day) || (hours >= startHour && hours < endHour)) {
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

    if (hours >= 3 && hours < 12) {
        setTimeout(timeOut, 2500);
        infoDiv.innerHTML = '<p>Good Morning</p>';
    } else if (hours >= 12 && hours < 18) {
        setTimeout(timeOut, 2500);
        infoDiv.innerHTML = '<p>Good Afternoon</p>';
    } else if (hours >= 18 && hours < 22) {
        setTimeout(timeOut, 2500);
        infoDiv.innerHTML = '<p>Good Evening</p>';
    } else {
        setTimeout(timeOut, 2500);
        infoDiv.innerHTML = '<p>Good Night</p>';
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
        if (BugNotify === true) {
            sendBugNotification("Services Unavailable",  "We are currently experiencing issues with our services. Please try again later.", 16753920, "https://github.com/CodeMasterLtd/CodeBeta/blob/main/img/down.png?raw=true");
        } else if (BugNotify === false) {
            sendBugNotification("Services Online",  "Everything seems normal here.", 65280, "https://github.com/CodeMasterLtd/CodeBeta/blob/main/img/online.png?raw=true");
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    resetPasswordButton.style.display = 'none';
    validUsers = getUsers();
    
    addFontAndIconLinks();
    copyRight();
    time(); // Call time function here

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

                if (user.discordPhoto) {
                    profilePicture.src = user.discordPhoto;
                    profilePicture.style.boxShadow = 'orange 0 0 10px';
                }
                
                setTimeout(() => {
                    window.location.href = './beta.html'; // Redirect to the dashboard or another page
                }, 3000);
            } else {
                const validUser = validUsers.find(user => 
                    user.name === username || 
                    user.password === password || 
                    user.role.toLowerCase() === selectedRole.toLowerCase()
                );
    
                if (!validUser) {
                    infoDiv.style.fontSize = '1.2em';
                    infoDiv.style.color = 'red';
                    infoDiv.innerHTML = '<p>Invalid username, password, or role. Please try again.</p>';
                } else {
                    if (validUser.name !== username) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'red';
                        infoDiv.innerHTML = '<p>Invalid username.</p>';
                    } else if (validUser.password !== password) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'red';
                        infoDiv.innerHTML = '<p>Invalid password.</p>';
                    } else if (validUser.role.toLowerCase() !== selectedRole.toLowerCase()) {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'red';
                        infoDiv.innerHTML = '<p>Invalid role.</p>';
                    } else {
                        infoDiv.style.fontSize = '1.2em';
                        infoDiv.style.color = 'amber';
                        infoDiv.innerHTML = `<p>You don't have an account!.</p>`;
                    }
                }
    
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
            
            // Update the password
            updateUserPassword(resetUsername, newPassword);
            
            // Refresh the user data
            refreshUserData();
            
            // Check if update was successful
            const user = validUsers.find(user => user.name === resetUsername);
            if (user) {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'green';
                infoDiv.innerHTML = '<p>Password reset successful! You can now log in with your new password.</p>';
                resetForm.style.display = 'none';
                timeOut();
                form();
            } else {
                infoDiv.style.fontSize = '1.2em';
                infoDiv.style.color = 'red';
                infoDiv.innerHTML = '<p>Invalid username. Please try again.</p>';
                timeOut();
                form();
            }
        });
    }
});
