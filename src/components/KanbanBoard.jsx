import React from 'react';
import styled from 'styled-components';
import KanbanColumn from './KanbanColumn';

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: center;
  gap: 0;
  padding: 32px 1vw 32px 1vw;
  border-radius: 24px;
  margin: 36px auto 0 auto;
  max-width: 100vw;
  min-height: 70vh;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #b48a5a #232946;
  &::-webkit-scrollbar {
    height: 8px;
    background: #232946;
  }
  &::-webkit-scrollbar-thumb {
    background: #b48a5a;
    border-radius: 6px;
  }
  flex-wrap: wrap;
`;

const VerticalDivider = styled.div`
  width: 2px;
  background: linear-gradient(180deg, #232946 0%, #b48a5a 100%);
  margin: 0 12px;
  border-radius: 2px;
  align-self: stretch;
  opacity: 0.18;
`;

const KanbanBoard = ({ columns, cardsByColumn, onCardClick }) => (
  <BoardWrapper>
    {columns.map((col, idx) => [
      <KanbanColumn
        key={col.id}
        column={col}
        cards={cardsByColumn[col.id] || []}
        onCardClick={onCardClick}
      />,
      idx !== columns.length - 1 && <VerticalDivider key={`divider-${col.id}`} />
    ])}
  </BoardWrapper>
);

export default KanbanBoard; 