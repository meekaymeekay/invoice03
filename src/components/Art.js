import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const Art = forwardRef(
  ({ headStoneName, invoiceNo, oldArtImages, onArtSubmissionSuccess }, ref) => {
    const [artImagesBase64, setArtImagesBase64] = useState([]);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
      if (oldArtImages && oldArtImages.length > 0) {
        const sortedArtImages = oldArtImages.sort(
          (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
        );
        const extractedBase64Images = sortedArtImages.map(
          (item) => item?.base64Data
        );
        setArtImagesBase64(extractedBase64Images);
      }
    }, [oldArtImages]);

    const handleArtImageUpload = (e) => {
      const files = Array.from(e.target.files);

      const loadImages = async () => {
        for (const file of files) {
          const reader = new FileReader();

          reader.onload = () => {
            setArtImagesBase64((prevImages) => [...prevImages, reader.result]);
          };

          reader.readAsDataURL(file);
        }
      };

      loadImages();
    };

    useImperativeHandle(ref, () => ({
      submitArt: async () => {
        try {
          // if (artImagesBase64.length === 0) {
          //   console.error("No art images have been selected.");
          //   return;
          // }

          const formDataToSend = new FormData();
          formDataToSend.append("headstoneName", headStoneName);
          formDataToSend.append("invoiceNo", invoiceNo);

          artImagesBase64.forEach((base64Image, index) => {
            const blob = dataURLtoBlob(base64Image);
            formDataToSend.append(`artImages`, blob, `artImage${index}.png`);
          });

          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/finalArt-submission`,
            {
              method: "POST",
              headers: {
                "ngrok-skip-browser-warning": "69420",
              },
              body: formDataToSend,
            }
          );

          if (response.ok) {
            console.log("Art submission successful!");
            setSubmissionSuccess(true);
            const submittedImages = artImagesBase64.map((base64Image) => ({
              base64Data: base64Image,
            }));

            onArtSubmissionSuccess(submittedImages);
          } else {
            console.error("Art submission failed.");
          }
        } catch (error) {
          console.error("Error submitting art:", error);
        }
      },
    }));

    function dataURLtoBlob(dataURL) {
      const parts = dataURL.split(",");
      const contentType = parts[0].split(";")[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uint8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; i++) {
        uint8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uint8Array], { type: contentType });
    }

    const removeArtImage = (index) => {
      const updatedImages = [...artImagesBase64];
      updatedImages.splice(index, 1);
      setArtImagesBase64(updatedImages);
    };

    const handleThumbnailClick = (image) => {
      setSelectedImage(image);
    };

    const closeModalImg = () => {
      setSelectedImage(null);
    };

    return (
      <ArtContainer>
        <h3>Work Order Art</h3>
        <ArtForm>
          <InputLabel>Photos of Final Art</InputLabel>
          {localStorage.getItem("role") !== "viewer" &&
            artImagesBase64 &&
            artImagesBase64.length < 1 && (
              <input type="file" onChange={handleArtImageUpload} />
            )}

          <div style={{ padding: "1rem" }}>
            {artImagesBase64.map((base64Image, index) => (
              <div
                style={{ position: "relative" }}
                key={index}
                className="thumbnail-container"
              >
                {localStorage.getItem("role") !== "viewer" ? (
                  <DeleteButton onClick={() => removeArtImage(index)}>
                    <FaTrashAlt size={24} color="red" />
                  </DeleteButton>
                ) : null}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Thumbnail
                    src={base64Image}
                    alt={`Art ${index}`}
                    onClick={() => handleThumbnailClick(base64Image)}
                  />
                </div>
                {oldArtImages && oldArtImages[index] && (
                  <ModifiedDate>
                    {new Date(
                      oldArtImages[index].modifiedAt
                    ).toLocaleDateString()}
                  </ModifiedDate>
                )}
              </div>
            ))}
          </div>
          {selectedImage && (
            <ModalOverlay onClick={closeModalImg}>
              <CloseButton onClick={closeModalImg}>X</CloseButton>
              <EnlargedImage src={selectedImage} alt="Enlarged Thumbnail" />
            </ModalOverlay>
          )}
        </ArtForm>
      </ArtContainer>
    );
  }
);

export default Art;

const ArtContainer = styled.div`
  background: #eaf4fc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  h3 {
    font-size: 24px;
    color: #333;
  }
`;

const ArtForm = styled.div`
  margin-top: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const ImageInput = styled.input`
  display: block;
  margin-bottom: 10px;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const EnlargedImage = styled.img`
  max-width: 75%;
  max-height: 75%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: transparent;
  border: none;
  color: red;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const ModifiedDate = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: gray;
  text-align: center;
`;

const DeleteButton = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 10;
`;
