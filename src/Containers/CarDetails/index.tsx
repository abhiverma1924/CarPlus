import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import FeatureCard from "../../Components/FeatureCard";
import { useCompareList, useSearchHistory } from "../../Slices";
import ComparisionTab from "../../Components/ComparisionTab";
import { ALL_CARS } from "../../Constants/constants";
import CarListing from "../CarListing";
import { Car } from "../ComparisionPage";

const CarDetails: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const searchHistory = useSearchHistory();
  const compareList = useCompareList();
  const [car, setCar] = useState<Car>();
  const [compare, setCompare] = useState<boolean>(false);
  const [compareTab, setCompareTab] = useState<boolean>(false);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
 

  const handleSearchChange = () => {
    let filteredCars = ALL_CARS;
    searchHistory.forEach((cars: any) => {
      filteredCars = filteredCars.filter(
        (car) =>
          (cars.make && car.make.toLowerCase().includes(cars.make.toLowerCase())) ||
          (cars.fuelType && car.fuelType.toLowerCase().includes(cars.fuelType.toLowerCase()))
      );
    });
    setFilteredCars(filteredCars);
  };

  useEffect(() => {
    if (compareList.length > 0) {
      setCompareTab(true);
    } else {
      setCompareTab(false);
    }
  }, [compareList]);

  useEffect(() => {
    if (state) setCar(state.car);
  }, [state]);

  useEffect(() => {
    if (searchHistory.length > 0) {
      handleSearchChange();
      setShowSuggestion(true);
    }
  }, [searchHistory]);

  return (
    <Box sx={{ margin: "0px", overflowX: "none", padding: "0px" }}>
      <Header />
      <Grid container margin={"50px"} width={"50%"}>
        <Grid item xs={12} sm={12} md={12} marginLeft={"30px"}>
          {car && <img src={car.image} width={"100%"} loading="lazy"/>}
          <FeatureCard car={car} compare={compare} setCompare={setCompare} />
        </Grid>
      </Grid>
      {showSuggestion && (
        <CarListing
          title={"Recommended Cars For You"}
          secondary={"View all"}
          compareOption={false}
          carList={filteredCars.slice(0, 10)}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          bottom: 30,
          width: "100%",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        {compareTab && <ComparisionTab />}
      </Box>
    </Box>
  );
};

export default CarDetails;
