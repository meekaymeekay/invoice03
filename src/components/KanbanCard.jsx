import React from 'react';
import styled from 'styled-components';
import { FaRegClock, FaDollarSign } from 'react-icons/fa';
import { GiStoneBlock } from 'react-icons/gi';

const CardWrapper = styled.div`
  background: ${({ color }) => color || '#b48a5a'};
  color: #fff;
  border-radius: 8px;
  padding: 18px 18px 14px 18px;
  margin-bottom: 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  min-height: 60px;
  border: none;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    filter: brightness(1.05);
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
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
  margin-bottom: 8px;
  letter-spacing: 0.01em;
  color: #fff;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  width: 100%;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 800px) {
    font-size: 0.97rem;
    margin-bottom: 4px;
    gap: 6px;
  }
  
  @media (max-width: 600px) {
    font-size: 0.91rem;
    margin-bottom: 3px;
    gap: 4px;
  }
`;

const TitleText = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  
  @media (max-width: 600px) {
    -webkit-line-clamp: 1;
  }
`;

const StatusIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  opacity: 0.9;
`;

const CardDate = styled.div`
  font-size: 0.91rem;
  color: #fff;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 800px) {
    font-size: 0.87rem;
    gap: 5px;
  }
  
  @media (max-width: 600px) {
    font-size: 0.81rem;
    gap: 4px;
  }
`;

const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const KanbanCard = ({ card, color, onClick }) => {
  // Format the date for better display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If it's not a valid date, try to parse as MM/DD/YYYY format
        const parts = dateString.split('/');
        if (parts.length === 3) {
          return dateString; // Return as is if it's already in MM/DD/YYYY format
        }
        return dateString; // Return original if can't parse
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original if any error
    }
  };

  return (
    <CardWrapper onClick={onClick} color={color}>
      <CardContent>
        <CardTitle title={card.title}>
          {card.foundationComplete && (
            <StatusIcon title="Foundation Complete">
              <GiStoneBlock size={16} />
            </StatusIcon>
          )}
          {card.paidOffComplete && (
            <StatusIcon title="Paid Off">
              <FaDollarSign size={14} />
            </StatusIcon>
          )}
          <TitleText>{card.title}</TitleText>
        </CardTitle>
        <CardDate title={`Updated: ${formatDate(card.updated)}`}>
          <IconWrapper>
            <FaRegClock size={13} />
          </IconWrapper>
          <span>Updated: {formatDate(card.updated)}</span>
        </CardDate>
      </CardContent>
    </CardWrapper>
  );
};

export default KanbanCard;