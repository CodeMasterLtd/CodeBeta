export const bug = '1236105830051483759';
export const webhook = 'https://discord.com/api/webhooks/1264315006854496288/JZz_aHj85UAm5aipAPkbV2eWtNj4IddhhwQ1SKNF5AcIPbpStWTa4BH1SSG_eUFmyZCD';
export const webhookBug = 'https://discord.com/api/webhooks/1264374034481807380/LPro6kkYJdvwM_rBTjhNRYqrvhKDLxFgw95zuhcdP2CzX8tUtmKXYhCIUmhO7BDcJa26';
export const webhookLogout = 'https://discord.com/api/webhooks/1266026648248127591/9qDVBSzW7LhTlVXfODLqCU2w-szbfDlEo_DpibVQI5-N5_KcbuAW-ttidn3r2HqjcjAt';

const initialAdmins = [
    {
        "discordID": "1030462659092545546", // CEO
        "name": "Kieran",
        "password": "Caitlin",
        "role": "Admin",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/1030462659092545546/600bd29a4928ee579815a44e2fd17515.png?size=1024'
    },
    {
        "discordID": "794738803600261120", // COO
        "name": "Ellwood",
        "password": "Ellwood21072024",
        "role": "Admin",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/794738803600261120/2db54fe9dc04bbc46f83bd534e78bc7c.png?size=1024'
    }
];

const initialStaff = [
    {
        "discordID": "871902966540542002", // Staff
        "name": "Skutela",
        "password": "Skutela21072024",
        "role": "Staff",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/871902966540542002/04ef2b881c3d337cb47dc5c695ffe4e3.png?size=1024'
    }
];

const initialBeta = [
    {
        "discordID": "861592808179499008", /// Beta
        "name": "ByQuadiix",
        "password": "ByQuadiix21072024",
        "role": "Beta",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/861592808179499008/80976390e71deed834c972cbde025087.png?size=1024'
    }
];

function getInitialUsers() {
    return [...initialAdmins, ...initialStaff, ...initialBeta];
}

export function getUsers() {
    const users = localStorage.getItem('users');
    if (users) {
        return JSON.parse(users);
    } else {
        const initialUsers = getInitialUsers();
        saveUsers(initialUsers);
        return initialUsers;
    }
}

export function getWebhook() {
    return webhook;
}

export function getWebhookBug() {
    return webhookBug;
}

export function getWebhookLogout() {
    return webhookLogout;
}

export function bugError() {
    return bug;
}

export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function updateUserPassword(username, newPassword) {
    const users = getUsers();
    let user = users.find(user => user.name === username);
    
    if (user) {
        user.password = newPassword;
        saveUsers(users);
    }
}
