import React, { useState, useEffect } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch users from mock API
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                // If successfully fetched from API, get users in JSON format
                const fetchedUsers = await response.json();
                setUsers(fetchedUsers);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        // Fetch users when component mounts
        fetchUsers();
    }, [])

    // Display loading or error messages if users not fetched
    if (loading) {
        return (
            <h3>Loading users...</h3>
        );
    }

    if (error) {
        return (
            <h3>Error encountered: {error}</h3>
        );
    }

    console.log(users);

    return (
        <div>
            <h2>List of users</h2>
            <div>
                {users.map((user) => (
                    // Display each user
                    <div key={user.id}>
                        <div>Name: {user.name} --- Email: {user.email}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}