// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialize an Express application
const app = express();
const port = 8080;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize variable to store project data
let webProjects;
// Try to read the 'web-projects.json' file and parse its content
try {
  webProjects = JSON.parse(fs.readFileSync('web-projects.json', 'utf8'));
} catch (error) {
  console.error("Error reading the file:", error);
  webProjects = [];
}

// Endpoint to fetch all web projects
app.get('/api', (req, res) => {
  res.json(webProjects);
});

// Endpoint to add a new web project
app.post('/api', (req, res) => {
    try {
        // Generate a unique ID for the new project
        let newID;
        if (webProjects.length === 0) {
            newID = 1;
        } else {
            newID = Math.max(...webProjects.map(p => p.id)) + 1;
        }
        
        const newProject = { id: newID, ...req.body };
        webProjects.push(newProject);
        
        // Persist the updated projects list to the JSON file
        fs.writeFileSync('web-projects.json', JSON.stringify(webProjects));
        
        res.json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the project' });
    }
});

// Endpoint to delete a project by its ID
app.delete('/api/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    webProjects = webProjects.filter(project => project.id !== id);
    
    // Persist the updated projects list to the JSON file
    fs.writeFileSync('web-projects.json', JSON.stringify(webProjects));
    
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the project' });
  }
});

// Endpoint to update a project by its ID
app.put('/api/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, URL } = req.body;
    const projectToUpdate = webProjects.find(project => project.id === id);

    if (!projectToUpdate) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project details
    if (title) projectToUpdate.title = title;
    if (description) projectToUpdate.description = description;
    if (URL) projectToUpdate.URL = URL;

    // Persist the updated projects list to the JSON file
    fs.writeFileSync('web-projects.json', JSON.stringify(webProjects));
    
    res.json(projectToUpdate);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the project' });
  }
});

// Endpoint to fetch a single project by its ID
app.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const project = webProjects.find(p => p.id === id);
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Middleware to handle requests to undefined routes
app.use((req, res) => {
  res.status(404).send({ message: 'Route not found' });
});
