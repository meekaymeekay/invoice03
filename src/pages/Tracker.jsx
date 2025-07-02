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
  { id: "completed", title: "Completed" },
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

const Tracker = () => {
  const [cardsByColumn, setCardsByColumn] = useState(initialCards);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

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
      setCardsByColumn(projectsData);
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

  // Handlers
  const handleSearch = (query) => {
    if (!query.trim()) {
      fetchProjects(); // Reset to all projects if search is empty
      return;
    }
    
    // Filter projects based on search query (only name/title since that's what we have)
    const filteredData = {};
    Object.keys(cardsByColumn).forEach(status => {
      filteredData[status] = cardsByColumn[status].filter(card => 
        card.title.toLowerCase().includes(query.toLowerCase()) ||
        card.id.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCardsByColumn(filteredData);
  };

  const handleRefresh = () => {
    fetchProjects();
  };

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleCardClick = (card) => {
    // TODO: Implement card detail view
    alert("Clicked card: " + card.title + " (Updated: " + card.updated + ")");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleProjectSave = async (newProject) => {
    try {
      setSaving(true);
      
      const response = await fetch('http://localhost:3001/save-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify(newProject),
      });

      const result = await response.json();

      if (result.success) {
        // Show success notification
        showNotification(result.message, true);
        
        // Close modal
        setShowModal(false);
        
        // Refresh projects to show the new one
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
      />
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
