import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HorizontalRule from "./HorizontalRule";

const BrandingSection = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "Loading...",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/company-details`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch company details");
        }

        const data = await response.json();
        setCompanyDetails(data);
      } catch (error) {
        console.error("Error fetching company details:", error);
        // Fallback to default values if fetch fails
        setCompanyDetails({
          companyName: "HEADSTONE WORLD",
          phone: "713-597-8899",
          email: "headstoneworld@yahoo.com",
          address: "15715 N.Frwy Service Rd Houston, TX 77090",
        });
      }
    };

    fetchCompanyDetails();
  }, []);

  return (
    <BrandingContainer>
      <Branding>{companyDetails.companyName}</Branding>
      <BrandingInfo>
        <p id="phone">{companyDetails.phone}</p>
        <p>{companyDetails.email}</p>
        <p id="address">{companyDetails.address}</p>
      </BrandingInfo>
      <HorizontalRule />
    </BrandingContainer>
  );
};

export default BrandingSection;

const BrandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-top: 15px;
  background: #e7e9eb;

  #phone {
    width: 110px;
  }
  #address {
    width: 340px;
  }
`;

const Branding = styled.h3`
  width: 200px;
`;

const BrandingInfo = styled.div`
  display: flex;
  gap: 25px;
`;
