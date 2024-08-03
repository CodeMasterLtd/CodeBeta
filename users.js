const initialCEO = [
    {
        "discordID": "1258565691796099072", // Test
        "name": "CodeMaster",
        "password": "Ceo",
        "role": "CEO",
        "discordPhoto": 'https://github.com/CodeMasterLtd/CodeBeta/blob/main/img/logoNeon.png?raw=true'
    }
];

const initialAdmins = [
    {
        "discordID": "1030462659092545546", // CEO
        "name": "Kieran",
        "password": "Caitlin",
        "role": "Admin",
        "discordPhoto": 'https://cdn.discordapp.com/avatars/1030462659092545546/600bd29a4928ee579815a44e2fd17515.png?size=1024'
    },
    {
        "discordID": "1258565691796099072", // Test
        "name": "CodeMaster",
        "password": "Ceo",
        "role": "CEO",
        "discordPhoto": 'https://github.com/CodeMasterLtd/CodeBeta/blob/main/img/logo2.png?raw=true'
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
    return [...initialAdmins, ...initialStaff, ...initialBeta, ...initialCEO];
}

export function getUsers() {
    const initialUsers = getInitialUsers();
    const users = localStorage.getItem('users');
    if (users || initialUsers) {
        return JSON.parse(users), initialUsers;
    } else {
        saveUsers(initialUsers);
        return initialUsers;
    }
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
