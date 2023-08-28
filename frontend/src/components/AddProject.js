// Import required libraries and hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the AddProject functional component
function AddProject() {
    // Use the useState hook to create state variables for title, description, URL, and successMessage
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [URL, setURL] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Use the useNavigate hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // Define the event handler for the form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Make a POST request to add the new project
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, URL }), // Send the new project details as JSON
        })
        .then(response => response.json()) // Parse the server's response as JSON
        .then(data => {
            setSuccessMessage('Project added successfully'); // Display a success message

            // Redirect to the projects list page after 2 seconds
            setTimeout(() => {
              navigate('/projects');
            }, 2000);
        });
    };

    // Render the form to add a new project, and display a success message if applicable
    return (
        <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <h2>Add a New Project</h2>
            <p>Use the form below to add a new project to the platform. Make sure to provide a descriptive title, a brief summary of the project in the description, and a link to the project if available.</p>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input value={URL} onChange={(e) => setURL(e.target.value)} placeholder="URL" />
                <button type="submit">Add Project</button>
            </form>
        </div>
    )
}

// Export the AddProject component for use in App.js
export default AddProject;
