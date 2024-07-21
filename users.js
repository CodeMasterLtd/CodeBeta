export const webhook = 'https://discord.com/api/webhooks/1264315006854496288/JZz_aHj85UAm5aipAPkbV2eWtNj4IddhhwQ1SKNF5AcIPbpStWTa4BH1SSG_eUFmyZCD';
export const bug = '1236105830051483759';
export const webhookBug = 'https://discord.com/api/webhooks/1264374034481807380/LPro6kkYJdvwM_rBTjhNRYqrvhKDLxFgw95zuhcdP2CzX8tUtmKXYhCIUmhO7BDcJa26';

export const admins = [
    {
        "discordID": "1030462659092545546", // CEO
        "name": "Kieran",
        "password": "Caitlin230124",
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

export const staff = [
    {
        "discordID": "871902966540542002", // Staff
        "name": "Skutela",
        "password": "Skutela21072024",
        "role": "Staff",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/871902966540542002/04ef2b881c3d337cb47dc5c695ffe4e3.png?size=1024'
    }
];

export const beta = [
    {
        "discordID": "861592808179499008", /// Beta
        "name": "ByQuadiix",
        "password": "ByQuadiix21072024",
        "role": "Beta",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/861592808179499008/80976390e71deed834c972cbde025087.png?size=1024'
    }
];

export function getUsers() {
    return [...admins, ...staff, ...beta];
}

export function getWebhook() {
    return webhook;
}

export function getWebhookBug() {
    return webhookBug;
}

export function bugError() {
    return bug;
}

export function updateUserPassword(username, newPassword) {
    let user = admins.find(user => user.name === username) || 
               staff.find(user => user.name === username) || 
               beta.find(user => user.name === username);
    
    if (user) {
        user.password = newPassword || 'CodeMaster2024';
    }
}