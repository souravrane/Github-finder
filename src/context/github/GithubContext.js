import React, { createContext, useState } from "react";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const response = await axios.get(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`,
            },
        });

        setUsers(response.data);
        setLoading(false);
    };

    return (
        <GithubContext.Provider value={{ users, loading, fetchUsers }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
