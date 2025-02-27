import React, { useState, useEffect } from "react";
import { fetchModelDetails } from "../utils/modelDetailsService";
import styled from "styled-components";

export default function WorkOrderPDF() {
  const [data, setData] = useState(null);
  const [art, setArt] = useState(null);
  const [workOrderData, setWorkOrderData] = useState([]);

  // Fetch data from local storage and JSON file on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("invoiceData");
    const artData = localStorage.getItem("artImage");
    console.log("Stored Data:", JSON.parse(storedData));
    console.log("Art Data:", artData);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (artData && artData !== "undefined") {
      setArt(JSON.parse(artData));
    }
    loadWorkOrderData();
    localStorage.removeItem("invoiceData");
    localStorage.removeItem("artImage");
  }, []);

  const loadWorkOrderData = async () => {
    try {
      const modelDetails = await fetchModelDetails();
      setWorkOrderData(modelDetails);
    } catch (error) {
      console.error("Failed to load work order data", error);
    }
  };

  return (
    <>
      <Container>
        <div id="work-order-pdf">
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              paddingLeft: "2rem",
              background: "#eec843",
            }}
          >
            <SectionTitle>Headstone Name: </SectionTitle>
            <h1
              style={{
                paddingLeft: "4em",
              }}
            >
              {data?.headstoneName}
            </h1>
          </Header>
          <Header>
            <Details>
              <Detail>
                <DetailTitle>Invoice No:</DetailTitle>
                <DetailValue>{data?.invoiceNo}</DetailValue>
              </Detail>
              <Detail>
                <DetailTitle>Date:</DetailTitle>
                <DetailValue>{data?.date}</DetailValue>
              </Detail>
            </Details>
            <CustomerDetails>
              <Detail>
                <DetailTitle>Customer Name:</DetailTitle>
                <DetailValue>{data?.customerName}</DetailValue>
              </Detail>
              <Detail>
                <DetailTitle>Email:</DetailTitle>
                <DetailValue>{data?.customerEmail}</DetailValue>
              </Detail>
              <Detail>
                <DetailTitle>Phone Number:</DetailTitle>
                <DetailValue>{data?.customerPhone}</DetailValue>
              </Detail>
            </CustomerDetails>
          </Header>

          <CemeteryInfo style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <SectionTitle>Cemetery Information</SectionTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                paddingTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", paddingBottom: ".75rem" }}>
                  <DetailTitle>Cemetery Name:&nbsp;</DetailTitle>
                  <DetailValue>
                    {data?.cemetery
                      ? data?.cemetery === "Other"
                        ? data?.customCemetery
                        : data?.cemetery
                      : data?.cemeteryName}
                  </DetailValue>
                </div>
                <div style={{ display: "flex", paddingBottom: ".75rem" }}>
                  <DetailTitle>Cemetery Contact:&nbsp;</DetailTitle>
                  <DetailValue>{data?.cemeteryContact}</DetailValue>
                </div>
                <div style={{ display: "flex" }}>
                  <DetailTitle>Section:&nbsp;</DetailTitle>
                  <DetailValue>{data?.section}</DetailValue>
                  <div
                    style={{
                      display: "flex",
                      paddingLeft: "5rem",
                      paddingRight: "2rem",
                    }}
                  >
                    <DetailTitle>Lot:&nbsp;</DetailTitle>
                    <DetailValue>{data?.lotNumber}</DetailValue>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", paddingBottom: ".75rem" }}>
                  <DetailTitle>Cemetery Address:&nbsp;</DetailTitle>
                  <DetailValue>{data?.cemeteryAddress}</DetailValue>
                </div>
                <div style={{ display: "flex", paddingBottom: ".75rem" }}>
                  <DetailTitle>Cemetery Phone:&nbsp;</DetailTitle>
                  <DetailValue>{data?.cemeteryPhone}</DetailValue>
                </div>
                <div style={{ display: "flex" }}>
                  <DetailTitle>Space:&nbsp;</DetailTitle>
                  <DetailValue>{data?.space}</DetailValue>
                </div>
              </div>
            </div>
          </CemeteryInfo>

          <Header>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "80px",
                maxHeight: "150px",
              }}
            >
              <SectionTitle>Details:</SectionTitle>
              <DetailValue
                style={{
                  marginTop: "5px",
                  textAlign: "left",
                  fontSize: "18px",
                }}
              >
                {data?.details}
              </DetailValue>
            </div>
          </Header>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              padding: "15px",
              paddingRight: "20px",
              backgroundColor: "#87CEEB",
              gap: "25px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {data &&
              [
                {
                  id: "designApproved",
                  label: "Design Approved",
                  key: "designApproved",
                },
                {
                  id: "applicationSubmitted",
                  label: "Application Submitted",
                  key: "applicationSubmitted",
                },
                {
                  id: "applicationApproved",
                  label: "Application Approved",
                  key: "applicationApproved",
                },
                {
                  id: "stoneOrdered",
                  label: "Stone Ordered",
                  key: "stoneOrdered",
                },
                {
                  id: "stoneReceived",
                  label: "Stone Received",
                  key: "stoneReceived",
                },
                {
                  id: "foundationCheck",
                  label: "Foundation",
                  key: "foundationCheck",
                },
                { id: "engraved", label: "Engraved", key: "engraved" },
                {
                  id: "balancePaid",
                  label: "Balance Paid",
                  key: "balancePaid",
                },
                { id: "set", label: "Set", key: "set" },
              ].map(({ id, label, key }) => (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    id={id}
                    style={{ width: "16px", height: "16px" }}
                    checked={data ? data[key] : true} // Bind to state
                    onChange={() => setData({ ...data, [key]: !data[key] })} // Toggle the value in formData
                  />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginTop: "5px",
                    }}
                    htmlFor={id}
                  >
                    {label}
                  </label>
                </div>
              ))}
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <ModelInfo>
              <div style={{ height: "500px" }}>
                <SectionTitle>Models</SectionTitle>

                {data?.model1 && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <img
                          src={data?.model1}
                          style={{
                            width: "127px",
                            height: "90px",
                          }}
                          alt="Selected Model"
                        />
                        <div style={{ display: "flex" }}>
                          <DetailValue>{data?.modelQty1}&nbsp;</DetailValue>
                          <DetailValue>{data?.selectModelImage1}</DetailValue>
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        {data?.modelColor1 === "Custom Color" ? (
                          <DetailValue>{data?.customColor1}</DetailValue>
                        ) : (
                          <DetailValue>{data?.modelColor1}</DetailValue>
                        )}
                        {workOrderData.map((item) => {
                          if (item.Model === data?.selectModelImage1) {
                            return (
                              <div>
                                {" "}
                                <DetailValue key={item.Model}>
                                  {item["line 1"]}
                                </DetailValue>
                                <DetailValue key={item.Model}>
                                  {item["line 2"]}
                                </DetailValue>
                              </div>
                            );
                          }
                          return null; // or you can return something else like 'none' if needed
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#f5f5f5",
                        marginTop: "1rem",
                      }}
                    />
                  </div>
                )}

                {data?.model2 && (
                  <div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <img
                          src={data?.model2}
                          style={{
                            width: "127px",
                            height: "90px",
                          }}
                          alt="Selected Model"
                        />
                        <div style={{ display: "flex" }}>
                          <DetailValue>{data?.modelQty2}&nbsp;</DetailValue>
                          <DetailValue>{data?.selectModelImage2}</DetailValue>
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        {data?.modelColor2 === "Custom Color" ? (
                          <DetailValue>{data?.customColor2}</DetailValue>
                        ) : (
                          <DetailValue>{data?.modelColor2}</DetailValue>
                        )}
                        {workOrderData.map((item) => {
                          if (item.Model === data?.selectModelImage2) {
                            return (
                              <div>
                                {" "}
                                <DetailValue key={item.Model}>
                                  {item["line 1"]}
                                </DetailValue>
                                <DetailValue key={item.Model}>
                                  {item["line 2"]}
                                </DetailValue>
                              </div>
                            );
                          }
                          return null; // or you can return something else like 'none' if needed
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#f5f5f5",
                        marginTop: "1rem",
                      }}
                    />
                  </div>
                )}

                {data?.model3 && (
                  <div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <DetailValue>{data?.modelQty3}&nbsp;</DetailValue>
                          <DetailValue>{data?.model3}</DetailValue>
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        {data?.modelColor3 === "Custom Color" ? (
                          <DetailValue>{data?.customColor3}</DetailValue>
                        ) : (
                          <DetailValue>{data?.modelColor3}</DetailValue>
                        )}
                        {workOrderData.map((item) => {
                          if (item.Model === data?.selectModelImage3) {
                            return (
                              <div>
                                {" "}
                                <DetailValue key={item.Model}>
                                  {item["line 1"]}
                                </DetailValue>
                                <DetailValue key={item.Model}>
                                  {item["line 2"]}
                                </DetailValue>
                              </div>
                            );
                          }
                          return null; // or you can return something else like 'none' if needed
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#f5f5f5",
                        marginTop: "1rem",
                      }}
                    />
                  </div>
                )}

                {data?.model4 && (
                  <div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <DetailValue>{data?.modelQty4}&nbsp;</DetailValue>
                          <DetailValue>{data?.model4}</DetailValue>
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        {data?.modelColor4 === "Custom Color" ? (
                          <DetailValue>{data?.customColor4}</DetailValue>
                        ) : (
                          <DetailValue>{data?.modelColor4}</DetailValue>
                        )}
                        {workOrderData.map((item) => {
                          if (item.Model === data?.selectModelImage4) {
                            return (
                              <div>
                                {" "}
                                <DetailValue key={item.Model}>
                                  {item["line 1"]}
                                </DetailValue>
                                <DetailValue key={item.Model}>
                                  {item["line 2"]}
                                </DetailValue>
                              </div>
                            );
                          }
                          return null; // or you can return something else like 'none' if needed
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#f5f5f5",
                        marginTop: "1rem",
                      }}
                    />
                  </div>
                )}

                {data?.model5 && (
                  <div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <DetailValue>{data?.modelQty5}&nbsp;</DetailValue>
                          <DetailValue>{data?.model5}</DetailValue>
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        {data?.modelColor5 === "Custom Color" ? (
                          <DetailValue>{data?.customColor5}</DetailValue>
                        ) : (
                          <DetailValue>{data?.modelColor5}</DetailValue>
                        )}
                        {workOrderData.map((item) => {
                          if (item.Model === data?.selectModelImage5) {
                            return (
                              <div>
                                {" "}
                                <DetailValue key={item.Model}>
                                  {item["line 1"]}
                                </DetailValue>
                                <DetailValue key={item.Model}>
                                  {item["line 2"]}
                                </DetailValue>
                              </div>
                            );
                          }
                          return null; // or you can return something else like 'none' if needed
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModelInfo>
            <div
              style={{
                width: "50%",
                padding: "15px",
                background: "#eec843",
              }}
            >
              <div style={{ height: "500px" }}>
                <SectionTitle>Art</SectionTitle>
                <div
                  style={{
                    position: "relative",
                    height: "calc(100% - 40px)", // Subtract space for title
                    width: "100%",
                  }}
                >
                  {art && <Thumbnail src={art} alt={`Art`} />}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              marginTop: "5px",
              backgroundColor: "#57facb",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <div style={{ width: "85px" }}>
              <DetailValue style={{ fontSize: "16px" }}>Foundation</DetailValue>
            </div>
            <div
              style={{
                marginLeft: "10px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "10px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "70px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>X _______________________</p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              marginTop: "5px",
              backgroundColor: "#eec843",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <div style={{ width: "85px" }}>
              <DetailValue style={{ fontSize: "16px" }}>Setting</DetailValue>
            </div>
            <div
              style={{
                marginLeft: "10px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "10px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "70px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>X _______________________</p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              marginTop: "5px",
              backgroundColor: "#7cec00",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <div style={{ width: "85px" }}>
              <DetailValue style={{ fontSize: "16px" }}>
                Shipping Delivery
              </DetailValue>
            </div>
            <div
              style={{
                marginLeft: "10px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Complete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Incomplete
                  </p>
                  <div
                    style={{
                      marginTop: "5px",
                      width: "25px",
                      height: "22px",
                      border: "3px solid black",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>Date:</p>
              </div>
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ___/ ___/ ___/
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "10px",
                width: "2px",
                height: "90px",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "70px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>X _______________________</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  @media print {
    .nav-bar {
      display: none;
    }
    title {
      display: none;
    }
  }
`;

const Header = styled.div`
  background-color: #f5f5f5;
  padding: 15px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #000;
`;

const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailTitle = styled.h3`
  font-size: 18px;
  color: #777;
`;

const DetailValue = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const CustomerDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
`;

const CemeteryInfo = styled.div`
  background: #57facb;
  width: 100%;
  padding: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModelInfo = styled.div`
  background: #adff50;
  width: 50%;
  padding: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
