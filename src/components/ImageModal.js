import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    margin-bottom: 20px;

    .image-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        max-width: 150px;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      p {
        margin-top: 5px;
        font-size: 14px;
      }

      button {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;

    button {
      padding: 8px 16px;
      background-color: #ccc;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #999;
      }
    }

    .selected {
      background-color: #007bff;
      color: #fff;
      font-weight: bold;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
  }
`;

const ImageModal = ({ isOpen, closeModal, handleImageSelect, modalIndex }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch categories when modal opens
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    // Fetch images when category changes
    if (isOpen) {
      fetchImages(selectedCategory);
    }
  }, [selectedCategory, isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/model-categories`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchImages = async (category) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/model-images?category=${category}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const filterImagesByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Select Model"
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          maxWidth: "600px",
          margin: "0 auto",
        },
      }}
    >
      <ModalContainer>
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Select a Model</h2>
        <div className="button-container">
          {categories.map((category, index) => (
            <button
              key={index}
              className={selectedCategory === category ? "selected" : ""}
              onClick={() => filterImagesByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="image-gallery">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image.src} alt={`Model ${index + 1}`} />
              <p>{image.title}</p>
              <button
                onClick={() =>
                  handleImageSelect(image.src, image.title, modalIndex)
                }
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <button onClick={closeModal}>Close</button>
      </ModalContainer>
    </Modal>
  );
};

export default ImageModal;
