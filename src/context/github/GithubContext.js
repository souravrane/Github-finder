import React, { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const setLoading = () => dispatch({ type: "SET_LOADING" });

    // Get search results
    const searchUsers = async (username) => {
        setLoading();

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

        dispatch({
            type: "GET_USERS",
            payload: items,
        });
    };

    // Clear users from the state
    const clearUsers = () => {
        dispatch({ type: "CLEAR_USERS" });
    };

    // Get a single user
    const getUser = async (username) => {
        setLoading();
        try {
            const response = await axios.get(
                `${GITHUB_URL}/users/${username}`,
                {
                    headers: {
                        Authorization: `${GITHUB_TOKEN}`,
                    },
                }
            );

            console.log(response);
            const { data } = response;

            dispatch({
                type: "GET_USER",
                payload: data,
            });
        } catch (e) {
            window.location = "/notfound";
        }
    };

    return (
        <GithubContext.Provider
            value={{
                user: state.user,
                users: state.users,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
