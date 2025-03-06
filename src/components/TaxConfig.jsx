import React, { useState } from "react";
import styled from "styled-components";

const TaxConfig = ({ currentTaxPercentage, onTaxUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaxPercentage, setNewTaxPercentage] =
    useState(currentTaxPercentage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tax-config`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({ taxPercentage: parseFloat(newTaxPercentage) }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update tax percentage");
      }

      const data = await response.json();
      onTaxUpdate(data.taxPercentage);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating tax percentage:", error);
      alert("Failed to update tax percentage");
    }
  };

  if (!isEditing) {
    return (
      <Container>
        <p>Current Tax Rate: {currentTaxPercentage}%</p>
        {localStorage.getItem("role") === "admin" && (
          <button onClick={() => setIsEditing(true)}>Edit Tax Rate</button>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={newTaxPercentage}
          onChange={(e) => setNewTaxPercentage(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    </Container>
  );
};

export default TaxConfig;

const Container = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color:  #E7E9EB;

  p {
    margin-bottom: 5px;
  }

  form {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
