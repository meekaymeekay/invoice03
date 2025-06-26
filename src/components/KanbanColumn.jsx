import React from 'react';
import styled from 'styled-components';
import KanbanCard from './KanbanCard';

const stageColors = {
  start: '#d46a6a',
  designApproval: '#d4a86a',
  cemeteryApproval: '#7ad46a',
  order: '#7ad46a',
  production: '#6a9fd4',
  service: '#6a7ad4',
};

const ColumnWrapper = styled.div`
  background: none;
  border-radius: 0;
  min-width: 220px;
  max-width: 260px;
  flex: 1 1 220px;
  padding: 18px 6px 12px 6px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  min-height: 100%;
  @media (max-width: 1000px) {
    min-width: 180px;
    max-width: 1fr;
  }
  @media (max-width: 600px) {
    min-width: 140px;
  }
`;

const ColumnTitle = styled.h2`
  background: #232946;
  color: #fff;
  font-size: 1.32rem;
  font-weight: 900;
  margin-bottom: 22px;
  letter-spacing: 0.03em;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  border-radius: 0;
  padding: 20px 0 20px 0;
  width: 100%;
  text-align: center;
  border-bottom: 3px solid #b48a5a;
  box-shadow: 0 2px 8px rgba(180,138,90,0.04);
`;

const CardContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const KanbanColumn = ({ column, cards, onCardClick }) => {
  const color = stageColors[column.id] || '#b48a5a';
  return (
    <ColumnWrapper>
      <ColumnTitle>{column.title}</ColumnTitle>
      <CardContainer>
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} color={color} onClick={() => onCardClick(card)} />
        ))}
      </CardContainer>
    </ColumnWrapper>
  );
};

export default KanbanColumn; 