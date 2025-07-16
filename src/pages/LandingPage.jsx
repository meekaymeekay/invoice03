import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/SearchStyles";
import IconWithText from "../components/IconWithTExt";

// Assets
import Logout from "../assets/icons/pngwing.com.png";
import invoiceImage from "../assets/images/invoice.png";
import searchImage from "../assets/images/search.png";
import reportImage from "../assets/images/report.png";
import searchInvoice from "../assets/images/pngwing.com.png";
import trackerImage from "../assets/images/tracker.png";

// Constants
const USER_ROLES = {
  ADMIN: "admin",
  ADMIN_WO: "adminWO",
  VIEWER: "viewer"
};

const ROLE_DISPLAY_NAMES = {
  [USER_ROLES.ADMIN]: "Administrator",
  [USER_ROLES.ADMIN_WO]: "Work Order Admin",
  [USER_ROLES.VIEWER]: "Viewer"
};

const NAVIGATION_OPTIONS = {
  [USER_ROLES.ADMIN]: [
    {
      path: "/invoice-form",
      icon: invoiceImage,
      alt: "Create Invoice",
      text: "Create New Invoice"
    },
    {
      path: "/search-invoice",
      icon: searchInvoice,
      alt: "Search Invoice",
      text: "Search Invoice"
    },
    {
      path: "/search-order",
      icon: searchImage,
      alt: "Search Order",
      text: "Search Order"
    },
    {
      path: "/report",
      icon: reportImage,
      alt: "Report",
      text: "Generate Report"
    },
    {
      path: "/tracker",
      icon: trackerImage,
      alt: "Project Tracker",
      text: "Project Tracker"
    }
  ],
  [USER_ROLES.ADMIN_WO]: [
    {
      path: "/search-invoice",
      icon: searchInvoice,
      alt: "Search Invoice",
      text: "Search Invoice"
    },
    {
      path: "/search-order",
      icon: searchImage,
      alt: "Search Order",
      text: "Search Order"
    },
    {
      path: "/report",
      icon: reportImage,
      alt: "Report",
      text: "Generate Report"
    },
    {
      path: "/tracker",
      icon: trackerImage,
      alt: "Project Tracker",
      text: "Project Tracker"
    }
  ],
  [USER_ROLES.VIEWER]: [
    {
      path: "/search-invoice",
      icon: searchInvoice,
      alt: "Search Invoice",
      text: "Search Invoice"
    },
    {
      path: "/search-order",
      icon: searchImage,
      alt: "Search Order",
      text: "Search Order"
    },
    {
      path: "/report",
      icon: reportImage,
      alt: "Report",
      text: "Generate Report"
    },
    {
      path: "/tracker",
      icon: trackerImage,
      alt: "Project Tracker",
      text: "Project Tracker"
    }
  ]
};

// Utility functions
const getUserRole = () => {
  return localStorage.getItem("role") || USER_ROLES.VIEWER;
};

const getUserDisplayName = (role) => {
  return ROLE_DISPLAY_NAMES[role] || ROLE_DISPLAY_NAMES[USER_ROLES.VIEWER];
};

const handleLogout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};

// Sub-components
const NavigationOption = ({ option }) => (
  <OptionCard to={option.path}>
    <OptionIcon src={option.icon} alt={option.alt} />
    <OptionText>{option.text}</OptionText>
  </OptionCard>
);

const UserInfoSection = () => {
  const role = getUserRole();
  const username = localStorage.getItem("username") || "Unknown User";
  
  return (
    <UserInfo>
      <UserRole>{getUserDisplayName(role)}</UserRole>
      <Username>{username}</Username>
    </UserInfo>
  );
};

const LogoutButton = () => (
  <StyledLink to="/" onClick={handleLogout}>
    <IconWithText iconSrc={Logout} text="Logout" />
  </StyledLink>
);

const WelcomeSection = () => (
  <WelcomeContainer>
    <WelcomeTitle>Welcome to Headstone World</WelcomeTitle>
    <WelcomeSubtitle>Select an option below to get started</WelcomeSubtitle>
  </WelcomeContainer>
);

const NavigationGrid = () => {
  const userRole = getUserRole();
  const navigationOptions = NAVIGATION_OPTIONS[userRole] || [];

  return (
    <OptionsGrid>
      {navigationOptions.map((option, index) => (
        <NavigationOption key={`${option.path}-${index}`} option={option} />
      ))}
    </OptionsGrid>
  );
};

// Main component
const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const userRole = useMemo(() => getUserRole(), []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageContainer>
      <Header>
        <LogoSection>
          <Logo>Headstone World</Logo>
          <UserInfoSection />
        </LogoSection>
        <LogoutButton />
      </Header>

      <MainContent>
        <WelcomeSection />
        <NavigationGrid />
      </MainContent>
    </PageContainer>
  );
};

// Styled Components
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

const WelcomeContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const WelcomeTitle = styled.h1`
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 10px;
`;

const WelcomeSubtitle = styled.p`
  color: #666;
  font-size: 18px;
  margin: 0;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const OptionCard = styled(Link)`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

const OptionIcon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 15px;
  transition: transform 0.2s ease-in-out;

  ${OptionCard}:hover & {
    transform: scale(1.05);
  }
`;

const OptionText = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
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

export default LandingPage;
