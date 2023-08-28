// Import required libraries and hooks
import React,{ useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Define the DeleteProject functional component
function DeleteProject() {
    // Use the useState hook to create a state variable for the project and its setter
    const [project, setProject] = useState({});

    // Use the useNavigate hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // Use the useParams hook to get the project ID from the URL
    const { id } = useParams();

    // useEffect hook to fetch the details of the project to be deleted when the component mounts
    useEffect(() => {
        fetch(`/api/${id}`) // Fetch data for the specific project
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setProject(data)); // Populate the project state with the fetched data
    }, [id]); // Dependency on 'id' ensures that if the ID changes, the effect runs again

    // Define the event handler for the delete button click
    const handleDelete = () => {
        // Make a DELETE request to remove the project
        fetch(`/api/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            navigate('/projects'); // After deleting, navigate to the projects list page
        });
    };

    // If the project data hasn't been loaded yet, display a loading message
    if (!project) return <div>Loading...</div>;
    
    // Render the details of the project to be deleted and provide a delete button
    return (
        <div className="delete-page">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.URL}>{project.URL}</a>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

// Export the DeleteProject component for use in App.js
export default DeleteProject;
