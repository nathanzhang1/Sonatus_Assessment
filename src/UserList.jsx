import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "./UserList.css";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

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
                setDisplayedUsers(stringifiedUserData);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [])


    // Update filtered users when search changes
    useEffect(() => {
        // Filter users if there is a search term
        let filtered = users.filter(user => {
            const lowerSearch = search.toLowerCase();
            return (
              user.name.toLowerCase().includes(lowerSearch) || user.email.toLowerCase().includes(lowerSearch)
            );
          });

        // If a sort criteria is selected, sort the filtered array.
        if (sortBy) {
            filtered.sort((a, b) => {
                // Compare strings alphabetically or reverse alphabetically depending on sort order
                const aValue = a[sortBy].toLowerCase();
                const bValue = b[sortBy].toLowerCase();

                if (aValue < bValue) {
                    return (sortOrder === "asc" ? -1 : 1);
                }

                if (aValue > bValue) {
                    return sortOrder === "asc" ? 1 : -1;
                }

                return 0;
            });
        }

        setDisplayedUsers(filtered);
    }, [search, users, sortBy, sortOrder]);


    // Toggles sort order when clicked
    const handleSortByName = () => {
        if (sortBy === "name") {
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } 
        else {
            setSortBy("name");
            setSortOrder("asc");
        }
    };

    const handleSortByEmail = () => {
        if (sortBy === "email") {
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } 
        else {
            setSortBy("email");
            setSortOrder("asc");
        }
    };

    // Sort button defaults to up arrow and is toggled upon click
    const nameArrow = sortBy === "name" ? (sortOrder === "asc" ? "▼" : "▲") : "▲";
    const emailArrow = sortBy === "email" ? (sortOrder === "asc" ? "▼" : "▲") : "▲";

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

    console.log("users", users);
    console.log("displayed", displayedUsers);

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
            <div className="sort-buttons">
                <button onClick={handleSortByName}>
                    Name {nameArrow}
                </button>
                <button onClick={handleSortByEmail}>
                    Email {emailArrow}
                </button>
            </div>
            <div className="grid-container">
                {displayedUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}