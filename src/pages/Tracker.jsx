import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/SearchStyles";
import IconWithText from "../components/IconWithTExt";
import Logout from "../assets/icons/pngwing.com.png";
import { Link } from "react-router-dom";

const Tracker = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageContainer>
      <Header>
        <LogoSection>
          <Logo>Headstone World</Logo>
          <UserInfo>
            <UserRole>
              {localStorage.getItem("role") === "admin"
                ? "Administrator"
                : localStorage.getItem("role") === "adminWO"
                ? "Work Order Admin"
                : "Viewer"}
            </UserRole>
            <Username>{localStorage.getItem("username")}</Username>
          </UserInfo>
        </LogoSection>
        <StyledLink
          to="/"
          onClick={() => {
            localStorage.removeItem("role");
            localStorage.removeItem("username");
          }}
        >
          <IconWithText iconSrc={Logout} text="Logout" />
        </StyledLink>
      </Header>

      <MainContent>
        <PageHeader>
          <BackButton to="/landing-page">← Back to Dashboard</BackButton>
          <h1>Project Tracker</h1>
          <p>Track and manage your headstone projects</p>
        </PageHeader>

        <ContentSection>
          <PlaceholderCard>
            <PlaceholderIcon>📊</PlaceholderIcon>
            <PlaceholderTitle>Project Tracker Coming Soon</PlaceholderTitle>
            <PlaceholderText>
              This feature is currently under development. You'll be able to track
              project progress, timelines, and status updates here.
            </PlaceholderText>
          </PlaceholderCard>
        </ContentSection>
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.h1`
  margin: 0;
  color: #007bff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  h1 {
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 18px;
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e3f2fd;
  }
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const PlaceholderCard = styled.div`
  background: white;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const PlaceholderTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
`;

const PlaceholderText = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserRole = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
`;

const Username = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 2px;
`;

export default Tracker; 