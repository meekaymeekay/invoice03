import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EndNoteConfig = ({ currentContent, onContentUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(currentContent);

  useEffect(() => {
    setNewContent(currentContent);
  }, [currentContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/end-note-config`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({ content: newContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update end note");
      }

      const data = await response.json();
      onContentUpdate(data.content);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating end note:", error);
      alert("Failed to update end note");
    }
  };

  if (!isEditing) {
    return (
      <Container>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: currentContent }}
        />
        {localStorage.getItem("role") === "admin" && (
          <button onClick={() => setIsEditing(true)}>Edit End Note</button>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={newContent}
          onChange={setNewContent}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          }}
        />
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EndNoteConfig;

const Container = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color:  #E7E9EB;

  .preview {
    margin-bottom: 10px;
  }

  .button-group {
    margin-top: 10px;
    display: flex;
    gap: 10px;
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

  .ql-container {
    height: 150px;
  }
`;
