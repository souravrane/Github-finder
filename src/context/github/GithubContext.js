import React, { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const setLoading = () => dispatch({ type: "SET_LOADING" });

    const fetchUsers = async () => {
        setLoading();
        const response = await axios.get(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`,
            },
        });

        dispatch({
            type: "GET_USERS",
            payload: response.data,
        });
    };

    return (
        <GithubContext.Provider
            value={{ users: state.users, loading: state.loading, fetchUsers }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
