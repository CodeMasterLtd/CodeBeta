export const webhook = 'https://discord.com/api/webhooks/1264315006854496288/JZz_aHj85UAm5aipAPkbV2eWtNj4IddhhwQ1SKNF5AcIPbpStWTa4BH1SSG_eUFmyZCD';
export const downloadHook = 'https://discord.com/api/webhooks/1264374034481807380/LPro6kkYJdvwM_rBTjhNRYqrvhKDLxFgw95zuhcdP2CzX8tUtmKXYhCIUmhO7BDcJa26';

export const admins = [
    {
        "discordID": "1030462659092545546",
        "name": "Kieran",
        "password": "Caitlin230124",
        "role": "Admin"
    }
];

export const staff = [
    {
        "discordID": "871902966540542002",
        "name": "Skutela",
        "password": "Skutela21072024",
        "role": "Staff"
    }
];

export const beta = [
    {
        "discordID": "861592808179499008",
        "name": "ByQuadiix",
        "password": "ByQuadiix21072024",
        "role": "Beta"
    }
];

export function getUsers() {
    return [...admins, ...staff, ...beta];
}

export function getWebhook() {
    return webhook;
}

export function getDownloadWebhook() {
    return downloadHook;
}

export function updateUserPassword(username, newPassword) {
    let user = admins.find(user => user.name === username) || 
               staff.find(user => user.name === username) || 
               beta.find(user => user.name === username);
    
    if (user) {
        user.password = newPassword || 'CodeMaster2024';
    }
}
