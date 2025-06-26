import React, { useState } from 'react';
import styled from 'styled-components';
import KanbanHeader from '../components/KanbanHeader';
import KanbanBoard from '../components/KanbanBoard';
import ProjectModal from '../components/ProjectModal';

const stages = [
  { id: 'start', title: 'Start' },
  { id: 'designApproval', title: 'Design Approval' },
  { id: 'cemeteryApproval', title: 'Cemetery Approval' },
  { id: 'order', title: 'Order' },
  { id: 'production', title: 'Production' },
  { id: 'service', title: 'Service' },
  // { id: 'completed', title: 'Completed' }, // Hidden in Kanban view
];

// Example mock data
const initialCards = {
  start: [ { id: '1', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '2', title: 'xbnxdgyn', updated: '4/9/2025' },],
  designApproval: [
    { id: '1', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '2', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '3', title: 'xbnxdgyn', updated: '4/9/2025' },
  ],
  cemeteryApproval: [ { id: '1', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '2', title: 'xbnxdgyn', updated: '4/9/2025' },],
  order: [ { id: '1', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '2', title: 'xbnxdgyn', updated: '4/9/2025' },],
  production: [ { id: '1', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '2', title: 'xbnxdgyn', updated: '4/9/2025' },],
  service: [ { id: '1', title: 'xbnxdgyn', updated: '4/9/2025' },
    { id: '2', title: 'xbnxdgyn', updated: '4/9/2025' },],
  // completed: [],
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #18191b;
`;



const Tracker = () => {
  const [cardsByColumn, setCardsByColumn] = useState(initialCards);
  const [showModal, setShowModal] = useState(false);

  // Handlers (stubbed for now)
  const handleSearch = (query) => {
    alert('Search for: ' + query);
  };
  
  const handleRefresh = () => {
    alert('Refreshed!');
  };
  
  const handleCreate = () => {
    setShowModal(true);
  };
  
  const handleCardClick = (card) => {
    alert('Clicked card: ' + card.title);
  };
  
  const handleModalClose = () => {
    setShowModal(false);
  };
  
  const handleProjectSave = (newProject) => {
    setCardsByColumn((prev) => ({
      ...prev,
      start: [newProject, ...prev.start],
    }));
  };

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
      />
    </PageWrapper>
  );
};

export default Tracker;
