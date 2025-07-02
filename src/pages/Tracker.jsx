import React, { useState, useEffect } from "react";
import styled from "styled-components";
import KanbanHeader from "../components/KanbanHeader";
import KanbanBoard from "../components/KanbanBoard";
import ProjectModal from "../components/ProjectModal";

const stages = [
  { id: "start", title: "Start" },
  { id: "designApproval", title: "Design Approval" },
  { id: "cemeteryApproval", title: "Cemetery Approval" },
  { id: "order", title: "Order" },
  { id: "production", title: "Production" },
  { id: "service", title: "Service" },
  // { id: "completed", title: "Completed" }, // Hidden from Kanban view
];

// Example mock data
const initialCards = {
  start: [],
  designApproval: [],
  cemeteryApproval: [],
  order: [],
  production: [],
  service: [],
  completed: [],
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #18191b;
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  background: ${props => props.success ? '#8fd19e' : '#ff6a6a'};
  color: ${props => props.success ? '#232426' : '#fff'};
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  font-weight: 600;
  animation: slideIn 0.3s ease-out;
  max-width: 400px;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const SearchResultsInfo = styled.div`
  background: rgba(35,36,38,0.92);
  color: #b48a5a;
  padding: 12px 32px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  border-bottom: 1px solid #444;
`;

const Tracker = () => {
  const [cardsByColumn, setCardsByColumn] = useState(initialCards);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [allProjects, setAllProjects] = useState(initialCards); // Store complete dataset
  const [searchQuery, setSearchQuery] = useState("");

  // API call to fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/get-projects', {
        headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projectsData = await response.json();
      console.log(projectsData);
      setAllProjects(projectsData); // Store complete dataset
      
      // Apply current search if any
      if (searchQuery.trim()) {
        applySearch(searchQuery, projectsData);
      } else {
        setCardsByColumn(projectsData);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Show notification function
  const showNotification = (message, isSuccess = true) => {
    setNotification({ message, success: isSuccess });
    setTimeout(() => setNotification(null), 4000);
  };

  // Apply search filter to projects
  const applySearch = (query, projectsData = allProjects) => {
    if (!query.trim()) {
      setCardsByColumn(projectsData);
      return;
    }
    
    const searchTerm = query.toLowerCase();
    const filteredData = {};
    
    Object.keys(projectsData).forEach(status => {
      filteredData[status] = projectsData[status].filter(card => 
        card.title.toLowerCase().includes(searchTerm) ||
        card.id.toLowerCase().includes(searchTerm)
      );
    });
    
    setCardsByColumn(filteredData);
  };

  // Calculate total search results
  const getTotalSearchResults = () => {
    return Object.values(cardsByColumn).reduce((total, columnProjects) => total + columnProjects.length, 0);
  };

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    applySearch(query);
  };

  const handleRefresh = () => {
    setSearchQuery(""); // Clear search when refreshing
    fetchProjects();
  };

  const handleCreate = () => {
    setEditingProject(null); // Clear any editing state
    setShowModal(true);
  };

  const handleCardClick = async (card) => {
    try {
      setLoadingProject(true);
      const response = await fetch(`http://localhost:3001/get-project/${encodeURIComponent(card.id)}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      const result = await response.json();

      if (result.success) {
        setEditingProject({
          ...result.project,
          originalId: card.id,
          currentStage: result.currentStage
        });
        setShowModal(true);
      } else {
        showNotification(result.message, false);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      showNotification('Failed to load project details. Please try again.', false);
    } finally {
      setLoadingProject(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProject(null); // Clear editing state when modal closes
  };

  const handleProjectSave = async (projectData) => {
    try {
      setSaving(true);
      
      const isEditing = editingProject !== null;
      const url = isEditing 
        ? `http://localhost:3001/update-project/${encodeURIComponent(editingProject.originalId)}`
        : 'http://localhost:3001/save-project';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      // Add currentStage for updates
      const payload = isEditing 
        ? { ...projectData, currentStage: editingProject.currentStage }
        : projectData;
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        // Show success notification
        showNotification(result.message, true);
        
        // Close modal and clear editing state
        setShowModal(false);
        setEditingProject(null);
        
        // Refresh projects to show the updated/new one
        fetchProjects();
      } else {
        // Show error notification
        showNotification(result.message, false);
        // Don't close modal so user can fix the issue
      }
    } catch (error) {
      console.error('Error saving project:', error);
      showNotification('Failed to save project. Please try again.', false);
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <PageWrapper>
        <KanbanHeader
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          onCreate={handleCreate}
          searchValue={searchQuery}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          color: '#fff',
          fontSize: '1.2rem'
        }}>
          Loading projects...
        </div>
      </PageWrapper>
    );
  }

  // Error state
  if (error) {
    return (
      <PageWrapper>
        <KanbanHeader
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          onCreate={handleCreate}
          searchValue={searchQuery}
        />
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          color: '#ff6a6a',
          fontSize: '1.2rem'
        }}>
          <div>Error loading projects: {error}</div>
          <button 
            onClick={handleRefresh}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: '#8fd19e',
              border: 'none',
              borderRadius: '4px',
              color: '#232426',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <KanbanHeader
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        onCreate={handleCreate}
        searchValue={searchQuery}
      />
      {searchQuery.trim() && (
        <SearchResultsInfo>
          Found {getTotalSearchResults()} project{getTotalSearchResults() !== 1 ? 's' : ''} matching "{searchQuery}"
        </SearchResultsInfo>
      )}
      <KanbanBoard
        columns={stages}
        cardsByColumn={cardsByColumn}
        onCardClick={handleCardClick}
      />
      <ProjectModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSave={handleProjectSave}
        saving={saving}
        editingProject={editingProject}
        isEditing={editingProject !== null}
        loadingProject={loadingProject}
      />
      {notification && (
        <NotificationWrapper success={notification.success}>
          {notification.message}
        </NotificationWrapper>
      )}
    </PageWrapper>
  );
};

export default Tracker;
