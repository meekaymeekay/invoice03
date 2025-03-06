import React, { useState, useEffect } from "react";
import IconHome from "../assets/icons/home.png";
import { Link } from "react-router-dom";
import Logout from "../assets/icons/pngwing.com.png";
import styled from "styled-components";
import IconWithText from "../components/IconWithTExt";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  PageContainer,
  Header,
  SearchContainer,
  SearchHeader,
  SearchInputGroup,
  SearchField,
  SearchButton,
  ResultsGrid,
  ResultCard,
  ActionButton,
  NoResults,
  LoadingSpinner,
} from "../components/SearchStyles";

const SearchOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingOrders, setLoadingOrders] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = async () => {
    if (!searchTerm) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/work-orders?headstoneName=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewWorkOrder = async (invoiceNo, year) => {
    try {
      setLoadingOrders((prevLoadingOrders) => ({
        ...prevLoadingOrders,
        [invoiceNo]: true,
      }));

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/work-order?invoiceNo=${invoiceNo}&year=${year}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        // Handle the response data
        const workOrderData = await response.json();
        console.log("SO:", workOrderData);
        // Pass the data to the new route using route state
        navigate("/work-order", { state: workOrderData });
      } else if (response.status === 404) {
        // if work order does not exists
        const stateData = await response.json();
        console.log(stateData);

        navigate("/work-order", { state: stateData.data });
      } else {
        console.error("Failed to fetch work order data");
      }
    } catch (error) {
      console.error("Error fetching work order data:", error);
    } finally {
      setLoadingOrders((prevLoadingOrders) => ({
        ...prevLoadingOrders,
        [invoiceNo]: false,
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <PageContainer>
      <Header>
        <StyledLink to="/landing-page">
          <IconWithText iconSrc={IconHome} text="Home" />
        </StyledLink>
        <StyledLink to="/" onClick={() => localStorage.removeItem("role")}>
          <IconWithText iconSrc={Logout} text="Logout" />
        </StyledLink>
      </Header>

      <SearchContainer>
        <SearchHeader>
          <h1>Search Work Orders</h1>
          <SearchInputGroup>
            <SearchField
              type="text"
              placeholder="Enter headstone name or invoice number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchButton onClick={handleSearch} disabled={loading}>
              {loading ? <LoadingSpinner /> : "Search"}
            </SearchButton>
          </SearchInputGroup>
        </SearchHeader>

        {searchResults.length > 0 ? (
          <ResultsGrid>
            {searchResults.map((result, index) => (
              <ResultCard key={result.invoiceNo}>
                <h3>{result.headstoneName}</h3>
                <p>Invoice #: {result.invoiceNo}</p>
                <ActionButton
                  onClick={() => viewWorkOrder(result.invoiceNo, result.year)}
                  disabled={loadingOrders[result.invoiceNo]}
                >
                  {loadingOrders[result.invoiceNo] ? (
                    <LoadingSpinner />
                  ) : (
                    "View Order"
                  )}
                </ActionButton>
              </ResultCard>
            ))}
          </ResultsGrid>
        ) : (
          searchTerm && <NoResults>No results found</NoResults>
        )}
      </SearchContainer>
    </PageContainer>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default SearchOrder;
