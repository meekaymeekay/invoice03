import React from 'react';
import styled from 'styled-components';
import { FaRegClock } from 'react-icons/fa';

const CardWrapper = styled.div`
  background: ${({ color }) => color || '#b48a5a'};
  color: #fff;
  border-radius: 8px;
  padding: 18px 18px 14px 18px;
  margin-bottom: 16px;
  width: 100%;
  box-shadow: none;
  cursor: pointer;
  transition: transform 0.12s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  min-height: 60px;
  border: none;
  &:hover {
    transform: translateY(-2px) scale(1.01);
    filter: brightness(1.07);
  }
  @media (max-width: 800px) {
    border-radius: 6px;
    padding: 12px 8px 10px 8px;
    min-height: 48px;
    margin-bottom: 10px;
  }
  @media (max-width: 600px) {
    border-radius: 5px;
    padding: 6px 3px 6px 3px;
    min-height: 36px;
    margin-bottom: 6px;
  }
`;

const CardTitle = styled.div`
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 6px;
  letter-spacing: 0.01em;
  color: #fff;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  @media (max-width: 800px) {
    font-size: 0.97rem;
    margin-bottom: 3px;
  }
  @media (max-width: 600px) {
    font-size: 0.91rem;
    margin-bottom: 2px;
  }
`;

const CardDate = styled.div`
  font-size: 0.91rem;
  color: #fff;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  @media (max-width: 800px) {
    font-size: 0.87rem;
  }
  @media (max-width: 600px) {
    font-size: 0.81rem;
  }
`;

const KanbanCard = ({ card, color, onClick }) => {
  return (
    <CardWrapper onClick={onClick} color={color}>
      <CardTitle>{card.title}</CardTitle>
      <CardDate><FaRegClock size={13} /> Updated: {card.updated}</CardDate>
    </CardWrapper>
  );
};

export default KanbanCard;