const endpoints = {
    serverState: `https://api.spacetraders.io/game/status`,
}

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`https://api.spacetraders.io/my/account?token=${token}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getServerState = async () => {
    try {
        const response = await fetch(endpoints.serverState);
        const data = await response.json();

        return data.status == 'spacetraders is currently online and available to play'
    } catch (error) {
        console.error(error)
    }
}

export const getNewUser = async (newName) => {
    try {
        const response = await fetch(`https://api.spacetraders.io/users/${newName}/claim`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getAvailableLoans = async (token) => {
    try {
        const response = await fetch(`https://api.spacetraders.io/types/loans?token=${token}`);
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error(error)
    }
}