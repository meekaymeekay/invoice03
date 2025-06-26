import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(35,36,38,0.92);
  padding: 18px 32px;
  border-bottom: 2px solid #222;
  border-radius: 0 0 18px 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  backdrop-filter: blur(4px);
  @media (max-width: 800px) {
    padding: 12px 10px;
    border-radius: 0 0 12px 12px;
  }
  @media (max-width: 600px) {
    padding: 7px 2px;
    border-radius: 0 0 7px 7px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 800px) {
    gap: 6px;
  }
  @media (max-width: 600px) {
    gap: 3px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 800px) {
    gap: 8px;
  }
  @media (max-width: 600px) {
    gap: 4px;
  }
`;

const Input = styled.input`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1.5px solid #b48a5a;
  background: #18191b;
  color: #fff;
  font-size: 1.05rem;
  outline: none;
  transition: border 0.15s;
  @media (max-width: 800px) {
    font-size: 0.98rem;
    padding: 6px 10px;
  }
  @media (max-width: 600px) {
    font-size: 0.92rem;
    padding: 4px 6px;
  }
  &:focus {
    border: 1.5px solid #8fd19e;
  }
`;

const Button = styled.button`
  padding: 8px 22px;
  border-radius: 6px;
  border: none;
  background: ${({ green }) => (green ? '#8fd19e' : '#4a90e2')};
  color: #232426;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.15s, transform 0.12s;
  @media (max-width: 800px) {
    font-size: 0.98rem;
    padding: 6px 12px;
  }
  @media (max-width: 600px) {
    font-size: 0.92rem;
    padding: 4px 7px;
  }
  &:hover {
    background: ${({ green }) => (green ? '#7bc88b' : '#357ab8')};
    transform: translateY(-2px) scale(1.04);
  }
`;

const KanbanHeader = ({ onSearch, onRefresh, onCreate }) => {
  const [search, setSearch] = useState('');
  return (
    <HeaderWrapper>
      <Left>
        <Input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button onClick={() => onSearch(search)}>Search</Button>
      </Left>
      <Right>
        <Button onClick={onRefresh}>Refresh</Button>
        <Button green onClick={onCreate}>Create</Button>
      </Right>
    </HeaderWrapper>
  );
};

export default KanbanHeader; 