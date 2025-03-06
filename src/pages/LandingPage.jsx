import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../assets/icons/pngwing.com.png";
import Option from "../components/Option";
import IconWithText from "../components/IconWithTExt";
import { Link } from "react-router-dom";
import invoiceImage from "../assets/images/invoice.png";
import searchImage from "../assets/images/search.png";
import reportImage from "../assets/images/report.png";
import searchInvoice from "../assets/images/pngwing.com.png";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/SearchStyles";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
        <WelcomeSection>
          <h1>Welcome to Headstone World</h1>
          <p>Select an option below to get started</p>
        </WelcomeSection>

        <OptionsGrid>
          {localStorage.getItem("role") === "admin" && (
            <>
              <OptionCard to="/invoice-form">
                <OptionIcon src={invoiceImage} alt="Create Invoice" />
                <OptionText>Create New Invoice</OptionText>
              </OptionCard>
              <OptionCard to="/search-invoice">
                <OptionIcon src={searchInvoice} alt="Search Invoice" />
                <OptionText>Search Invoice</OptionText>
              </OptionCard>
              <OptionCard to="/search-order">
                <OptionIcon src={searchImage} alt="Search Order" />
                <OptionText>Search Order</OptionText>
              </OptionCard>
              <OptionCard to="/report">
                <OptionIcon src={reportImage} alt="Report" />
                <OptionText>Generate Report</OptionText>
              </OptionCard>
            </>
          )}
          {/* Add similar conditions for other roles */}
        </OptionsGrid>
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

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;

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
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const OptionIcon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 15px;
`;

const OptionText = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
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
