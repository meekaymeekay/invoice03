import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

export const Header = styled.header`
  background: white;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchHeader = styled.header`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;

  h1 {
    color: #2c3e50;
    margin-bottom: 25px;
    font-size: 28px;
  }
`;

export const SearchInputGroup = styled.div`
  display: flex;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SearchField = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

export const SearchButton = styled.button`
  padding: 12px 30px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;

  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const ResultCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #eee;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  h3 {
    color: #2c3e50;
    font-size: 20px;
    margin: 0 0 15px 0;
    font-weight: 600;
  }

  p {
    color: #666;
    margin: 8px 0;
    font-size: 15px;
  }
`;

export const ActionButton = styled(SearchButton)`
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NoResults = styled.p`
  text-align: center;
  color: #666;
  margin-top: 30px;
  font-size: 18px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
