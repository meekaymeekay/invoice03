import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  // State for managing username, password, and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // React Router hook for navigation
  const navigate = useNavigate();
  // Access the authentication context
  const { setIsAuthenticated } = useAuth(); // Access the authentication context

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password cannot be empty");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const { message, role, user } = responseData;
        localStorage.removeItem("role");
        localStorage.setItem("role", role);
        localStorage.removeItem("username");
        localStorage.setItem("username", user);
        console.log(message);
        setIsAuthenticated(true);
        navigate("/landing-page");
      } else if (response.status === 401) {
        setError("Incorrect username or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogin]);

  return (
    <PageContainer>
      <LoginContainer>
        <LogoSection>
          <Logo>Headstone World</Logo>
        </LogoSection>
        <LoginForm>
          <Title>Sign In</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputGroup>
            <InputLabel>Username</InputLabel>
            <StyledInput
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Password</InputLabel>
            <StyledInput
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <LoginButton onClick={handleLogin}>Sign In</LoginButton>
        </LoginForm>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LogoSection = styled.div`
  background: #007bff;
  color: white;
  padding: 30px 20px;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 32px;
  margin: 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 10px 0 0;
  opacity: 0.9;
`;

const LoginForm = styled.div`
  padding: 30px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;
