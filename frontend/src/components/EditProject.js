// Import required libraries and hooks
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Define the EditProject functional component
function EditProject() {
    // Use the useState hook to create state variables for title, description, and URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [URL, setURL] = useState('');

    // Use the useNavigate hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // Use the useParams hook to get the project ID from the URL
    const { id } = useParams();

    // useEffect hook to fetch the current project's details when the component mounts
    useEffect(() => {
        fetch(`/api/${id}`) // Fetch data for the specific project
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                // Populate the state variables with the fetched data
                setTitle(data.title);
                setDescription(data.description);
                setURL(data.URL);
            });
    }, [id]); // Dependency on 'id' ensures that if the ID changes, the effect runs again

    // Define the event handler for the form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Make a PUT request to update the project details
        fetch(`/api/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, URL }), // Send the updated project details as JSON
        })
        .then(() => {
            navigate('/projects'); // After updating, navigate to the projects list page
        });
    };

    // Render the form to edit the project details
    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={URL} onChange={(e) => setURL(e.target.value)} placeholder="URL" />
            <button type="submit">Update Project</button>
        </form>
    )
}

// Export the EditProject component for use in App.js
export default EditProject;
