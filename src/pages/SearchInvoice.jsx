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

const SearchInvoice = () => {
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

  const viewInvoice = async (invoiceNo) => {
    // Make a GET API call using invoiceNo
    try {
      setLoadingOrders((prevLoadingOrders) => ({
        ...prevLoadingOrders,
        [invoiceNo]: true,
      }));

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/invoice?invoiceNo=${invoiceNo}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        // Handle the response data as needed
        const invoiceData = await response.json();
        // Pass the data to the new route using route state
        navigate("/invoice-form", { state: invoiceData });
      } else {
        // Handle the case when the GET request fails
        console.error("Failed to fetch invoice data");
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  const viewWorkOrder = async (invoiceNo) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/work-order?invoiceNo=${invoiceNo}`,
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
        // Pass the data to the new route using route state
        navigate("/work-order", { state: workOrderData });
      } else if (response.status === 404) {
        // if work order does not exists
        const stateData = await response.json();
        navigate("/work-order", { state: stateData.data });
      } else {
        console.error("Failed to fetch work order data");
      }
    } catch (error) {
      console.error("Error fetching work order data:", error);
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
          <h1>Search Invoices</h1>
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
                  onClick={() => viewInvoice(result.invoiceNo)}
                  disabled={loadingOrders[result.invoiceNo]}
                >
                  {loadingOrders[result.invoiceNo] ? (
                    <LoadingSpinner />
                  ) : (
                    "View Invoice"
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

export default SearchInvoice;
