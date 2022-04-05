import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_GITHUB_URL}/users`,
            {
                headers: {
                    Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
                },
            }
        );

        setUsers(response.data);
        setLoading(false);
    };

    if (loading) return <Spinner />;
    else
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
}

export default UserResults;
