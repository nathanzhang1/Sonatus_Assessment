import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "./UserList.css";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");

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

                // Convert user data into strings first
                const stringifiedUserData = fetchedUsers.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: `${user.address.suite}, ${user.address.street}, ${user.address.city}`,
                    phone: user.phone,
                    company: user.company.name,
                  }));
                setUsers(stringifiedUserData);
                setFilteredUsers(stringifiedUserData);
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

    // Update filtered users when search changes
    useEffect(() => {
        // If nothing in search bar show all users
        if (!search) {
            setFilteredUsers(users);
            return;
        }

        // Convert search term to lower case to standardize search
        const lowerSearch = search.toLowerCase();

        // Set filtered users to those with matching name or email
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(lowerSearch) || user.email.toLowerCase().includes(lowerSearch)
        );
        setFilteredUsers(filtered);
    }, [search, users]);

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
            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="user-search"
            />
            <div className="grid-container">
                {filteredUsers.map(user => (
                    // Display each user
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}