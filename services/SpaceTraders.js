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
        const data = await fetch(`https://api.spacetraders.io/users/${newName}/claim`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getAvailableLoans = async (token) => {
    try {
        const response = await fetch(`https://api.spacetraders.io/types/loans?token=${token}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

export const takeALoan = async (token, type) => {
    try {
        const data = await fetch(`https://api.spacetraders.io/my/loans?token=${token}&type=${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getAvailableShips = async (token) => {
    try {
        const response = await fetch(`https://api.spacetraders.io/systems/OE/ship-listings?token=${token}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}