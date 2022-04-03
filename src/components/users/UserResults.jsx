import React, { useEffect, useState } from "react";
import axios from "axios";

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

    if (loading) return <div>loading...</div>;

    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            {users.map((user) => (
                <h3 key={user.id}>{user.login}</h3>
            ))}
        </div>
    );
}

export default UserResults;
