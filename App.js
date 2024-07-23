import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you move styles to App.css

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newUser = { name, email };

        try {
            if (editingUser) {
                // Update existing user
                await axios.put(`https://curd-backen-d-2.onrender.com/api/users/${editingUser._id}`, newUser);
                setEditingUser(null);
            } else {
                // Create new user
                await axios.post('https://curd-backen-d-2.onrender.com/api/users', newUser);
            }
            setName('');
            setEmail('');
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const fetchUsers = async() => {
        try {
            const response = await axios.get('https://curd-backen-d-2.onrender.com/api/users');
            setUsers(response.data);
            setShowUsers(true);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditingUser(user);
    };

    const handleDelete = async(userId) => {
        try {
            await axios.delete(`https://curd-backen-d-2.onrender.com/api/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const toggleShowUsers = () => {
        setShowUsers(!showUsers);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return ( <
            div className = "App" >
            <
            h1 > User Details < /h1> <
            form onSubmit = { handleSubmit }
            className = "form" >
            <
            div className = "inputGroup" >
            <
            label > Name: < /label> <
            input type = "text"
            value = { name }
            onChange = {
                (e) => setName(e.target.value)
            }
            className = "input" /
            >
            <
            /div> <
            div className = "inputGroup" >
            <
            label > Email: < /label> <
            input type = "email"
            value = { email }
            onChange = {
                (e) => setEmail(e.target.value)
            }
            className = "input" /
            >
            <
            /div> <
            button type = "submit"
            className = "button" > { editingUser ? 'Update' : 'Submit' } <
            /button> < /
            form > <
            button onClick = { toggleShowUsers }
            className = "button" > { showUsers ? 'Hide Users' : 'Show Users' } <
            /button> {
            showUsers && ( <
                ul className = "userList" > {
                    users.map((user) => ( <
                        li key = { user._id }
                        className = "userItem" > { user.name } - { user.email } <
                        button onClick = {
                            () => handleEdit(user)
                        }
                        className = "editButton" >
                        Edit <
                        /button> <
                        button onClick = {
                            () => handleDelete(user._id)
                        }
                        className = "deleteButton" >
                        Delete <
                        /button> < /
                        li >
                    ))
                } <
                /ul>
            )
        } <
        /div>
);
}

export default App;