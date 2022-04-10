import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `${GITHUB_TOKEN}`,
    },
});

// Get search results
export const searchUsers = async (username) => {
    const params = new URLSearchParams({
        q: username,
    });
    const response = await github.get(`/search/users`, {
        params,
    });

    const { items } = response.data;

    return items;
};

//  get user and repos
export const getUserAndRepos = async (username) => {
    const params = {
        sort: "created",
        per_page: 10,
    };
    const [user, repos] = await Promise.all([
        github.get(`/users/${username}`),
        github.get(`/users/${username}/repos`, { params }),
    ]);

    return { user: user.data, repos: repos.data };
};
