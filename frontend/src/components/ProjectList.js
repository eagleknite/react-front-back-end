// Import required libraries and components
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Define the ProjectList functional component
function ProjectList() {
    // Use the useState hook to create a state variable `projects` and its setter `setProjects`
    const [projects, setProjects] = useState([]);

    // useEffect hook to fetch the list of projects from the server when the component mounts
    useEffect(() => {
        fetch('/api') // Fetch data from the server's API endpoint
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                setProjects(data); // Update the projects state with the fetched data
            });
    }, []); // The empty dependency array ensures this useEffect runs only once, similar to componentDidMount

    // Render the component
    return (
        <div>
            <h2>Projects</h2>
            <p>Welcome to the projects list! Here you can view all the projects, edit them, or delete them. Feel free to explore the projects and understand their purpose and impact.</p>
            <ul>
                {/* Map through the projects array and render each project */}
                {projects.map(project => (
                    <li key={project.id}>
                        <div className="project-content">
                            <div className="project-details">
                                {/* Display project title */}
                                <strong>Title:</strong> {project.title} <br />
                                {/* Display project description */}
                                <strong>Description:</strong> {project.description} <br />
                                {/* Display project URL as a clickable link */}
                                <strong>URL:</strong> <a href={project.URL} target="_blank" rel="noopener noreferrer">{project.URL}</a>
                            </div>
                            <div className="project-actions">
                                {/* Link to edit the current project */}
                                <Link className="edit-link" to={`/edit-project/${project.id}`}>Edit</Link>
                                {/* Link to delete the current project */}
                                <Link className="delete-link" to={`/delete-project/${project.id}`}>Delete</Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Export the ProjectList component for use in App.js
export default ProjectList;
