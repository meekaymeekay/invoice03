import React, { useState, useEffect } from "react";
import IconHome from "../assets/icons/home.png";
import { Link } from "react-router-dom";
import Logout from "../assets/icons/pngwing.com.png";
import styled from "styled-components";
import IconWithText from "../components/IconWithTExt";
import {
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Report() {
  const [reports, setReports] = useState([]);
  const [sumOfDeposits, setSumOfDeposits] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!startDate || !endDate) return; // If either date is not selected, do nothing
        console.log(startDate, endDate);

        // Assuming startDate and endDate are already in a format that can be converted to Date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const formattedStartDate = `${startDateObj.getFullYear()}-${(
          startDateObj.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${startDateObj
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        const formattedEndDate = `${endDateObj.getFullYear()}-${(
          endDateObj.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${endDateObj
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        console.log(formattedStartDate, formattedEndDate);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/reports?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
        const data = await response.json();
        setReports(data.reports);
        setSumOfDeposits(data.sumOfDeposits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <Container>
      <NavBar className="nav-bar">
        <StyledLink to="/landing-page">
          <IconWithText iconSrc={IconHome} text="Home" />
        </StyledLink>
        <StyledLink to="/">
          <IconWithText
            onClick={() => {
              localStorage.removeItem("role");
            }}
            iconSrc={Logout}
            text="Logout"
          />
        </StyledLink>
      </NavBar>
      <Heading>Report</Heading>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(props) => <TextField {...props} />}
            maxDate={endDate} // Set the maximum date for start date picker
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(props) => <TextField {...props} />}
            minDate={startDate} // Set the minimum date for end date picker
          />
        </div>
        <Table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "4rem",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Date
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Time
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                User
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Headstone
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Invoice
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Work Order
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Deposit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.date}
                </TableCell>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.time}
                </TableCell>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.user}
                </TableCell>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.headstoneName}
                </TableCell>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.type === "invoice" ? "X" : ""}
                </TableCell>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.type === "Work Order" ? "X" : ""}
                </TableCell>
                <TableCell
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                >
                  {report.deposit || "-"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={6}
                style={{
                  textAlign: "right",
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                Total Deposits:
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {sumOfDeposits}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </LocalizationProvider>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const NavBar = styled.nav`
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid grey;
  border-radius: 5px;
  border-top: none;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Heading = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 20px;
`;