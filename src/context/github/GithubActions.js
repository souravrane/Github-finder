import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search results
export const searchUsers = async (username) => {
    const params = new URLSearchParams({
        q: username,
    });
    const response = await axios.get(`${GITHUB_URL}/search/users`, {
        headers: {
            Authorization: `${GITHUB_TOKEN}`,
        },
        params,
    });

    const { items } = response.data;

    return items;
};

// Get a single user
export const getUser = async (username) => {
    try {
        const response = await axios.get(`${GITHUB_URL}/users/${username}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`,
            },
        });

        console.log(response);
        const { data } = response;

        return data;
    } catch (e) {
        window.location = "/notfound";
    }
};

// Get user repos
export const getUserRepos = async (username) => {
    const params = new URLSearchParams({
        sort: "created",
        per_page: 10,
    });

    const response = await axios.get(`${GITHUB_URL}/users/${username}/repos`, {
        headers: {
            Authorization: `${GITHUB_TOKEN}`,
        },
        params,
    });

    const { data } = response;

    return data;
};
