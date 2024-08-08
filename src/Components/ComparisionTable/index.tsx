import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Car, CarKey } from "../../Containers/ComparisionPage";

interface Props {
  cars: Car[];
}
const ComparisionTable: React.FC<Props> = ({ cars }) => {
  const [showDifferences, setShowDifferences] = useState(false);
  const keys = Object.keys(cars[0]).filter((key) => key !== "id") as CarKey[];

  const renderRows = () => {
    let visibleRowIndex = 0; 
    return keys.map((key) => {
      const values = cars.map((car: { [x: string]: any }) => car[key]);
      const allValuesEqual = values.every((value: any) => value === values[0]);
      if (showDifferences && allValuesEqual) {
        return null; 
      }
      const row = (
        <TableRow key={key} sx={{ backgroundColor: visibleRowIndex % 2 === 0 ? "white" : "#f5f5f5" }}>
          <TableCell>{key}</TableCell>
          {values.map((value: any, index: number) => (
            <TableCell key={index}>
              {key === "image" ? <> - </> : value}
            </TableCell>
          ))}
        </TableRow>
      );
      visibleRowIndex++; 
      return row;
    });
  };

  return (
    <Box sx={{ width: "80%" }}>
      <FormControlLabel
        control={
          <Checkbox checked={showDifferences} onChange={() => setShowDifferences(!showDifferences)} color="primary" />
        }
        label="Hide common features"
      />
      <TableContainer component={Paper} sx={{ margin: "20px 0px" }} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Feature</TableCell>
              {cars.map((car: any) => (
                <TableCell key={car.id}>
                  {car.make} {car.model}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComparisionTable;
