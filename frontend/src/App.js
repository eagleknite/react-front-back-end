// Import required libraries, components, and styles
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import EditProject from './components/EditProject';
import DeleteProject from './components/DeleteProject';
import './App.css';

// Define the main App component
function App() {
  return (
    <Router> {/* Wrap the application in a Router to enable route-based navigation */}
      <div>
        <header>
          <div className="logo">
              {/* Link to the root of the application */}
              <Link to="/" style={{color: 'white', textDecoration: 'none'}}>Web Projects Platform</Link>
          </div>
        </header>
        <Routes> {/* Define the different routes of the application */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/delete-project/:id" element={<DeleteProject />} />

          {/* Default route for the root of the application */}
          <Route path="/" element={
              <>
                  <section className="hero">
                      <h1>Welcome to the Web Projects Platform!</h1>
                      <p>Manage, edit, and showcase your web projects all in one place.</p>
                      {/* Call to action button to add a new project */}
                      <Link to="/add-project" className="cta-btn">Add Your Project</Link>
                  </section>

                  <section className="secondary-cta">
                    <h2>Explore Projects</h2>
                    <p>Discover a variety of web projects developed by talented individuals.</p>
                    {/* Call to action button to view all projects */}
                    <Link to="/projects" className="cta-btn">View All Projects</Link>
                  </section>
              </>
              } />
          </Routes>
        <footer>
          <p>© 2023 Web Projects Platform. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

// Export the App component for rendering in the root index.js file
export default App;
