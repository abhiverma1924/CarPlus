import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import CarDetailsCard from "../../Components/Card";
import ComparisionTable from "../../Components/ComparisionTable";
import Header from "../../Components/Header";
import CarListing from "../CarListing";
import { DELETE_CAR, useCompareList, useSearchHistory } from "../../Slices";
import { useDispatch } from "react-redux";
import { ALL_CARS } from "../../Constants/constants";
import { useNavigate } from "react-router-dom";

export interface Car {
  id: number | string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  features: string[];
  owners: number;
  image: string;
}

export type CarKey = keyof Omit<Car, "id">;

const ComparisonTable: React.FC = () => {
  const compareList = useCompareList();
  const searchHistory = useSearchHistory();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstCar, setFirstCar] = useState<any>({});
  const [secondCar, setSecondCar] = useState<any>({});
  const [firstEmpty, setFirstEmpty] = useState<boolean>(true);
  const [secondEmpty, setSecondEmpty] = useState<boolean>(true);
  const [filteredCars, setFilteredCars] = useState<any>([]);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

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
    if (searchHistory.length > 0) {
      handleSearchChange();
      setShowSuggestion(true);
    }
  }, [searchHistory]);

  useEffect(() => {
    if (compareList)
      if (compareList.length == 1) {
        setFirstCar(compareList[0]);
        setFirstEmpty(false);
        setSecondCar({});
        setSecondEmpty(true);
      } else if (compareList.length == 2) {
        setFirstCar(compareList[0]);
        setFirstEmpty(false);
        setSecondCar(compareList[1]);
        setSecondEmpty(false);
      } else {
        setFirstEmpty(true);
        setSecondEmpty(true);
      }
    console.log(firstCar, "fitst car");
    console.log(secondCar, "second car");
  }, [compareList]);

  const onFirstClose = () => {
    dispatch(DELETE_CAR(firstCar.id));
    setFirstCar({});
    setFirstEmpty(true);
  };

  const onSecondClose = () => {
    dispatch(DELETE_CAR(secondCar.id));
    setSecondCar({});
    setSecondEmpty(true);
  };
  
  const viewAll = () => {
    navigate("/view-all-cars");
  };
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Grid container justifyContent="center" sx={{ width: "100%", paddingTop: "20px" }}>
          <Grid item container spacing={2} sx={{ width: "60%", padding: "10px" }}>
            <Grid item xs={12} md={5}>
              {!firstEmpty ? (
                <CarDetailsCard car={firstCar} onClose={onFirstClose} />
              ) : (
                <Card
                  onClick={viewAll}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                    borderRadius: "10px",
                    padding: "30px",
                    height: "300px",
                    width: "280px",
                  }}
                  elevation={3}
                >
                  <Typography sx={{ color: "#6E6F73", fontSize: "16px" }}>
                    We have a wide variety of cars to add from recommended cars. Add to start comparison.
                  </Typography>
                </Card>
              )}
            </Grid>
            <Grid item xs={12} md={5}>
              {!secondEmpty ? (
                <CarDetailsCard car={secondCar} onClose={onSecondClose} />
              ) : (
                <Card
                  onClick={viewAll}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                    borderRadius: "10px",
                    padding: "30px",
                    height: "300px",
                    width: "280px",
                  }}
                  elevation={3}
                >
                  <Typography sx={{ color: "#6E6F73", fontSize: "16px" }}>
                    We have a wide variety of cars to add from recommended cars. Add to start comparison.
                  </Typography>
                </Card>
              )}
            </Grid>
          </Grid>
        </Grid>
        {compareList.length == 2 && (
          <Grid container justifyContent="center" sx={{ width: "60%", margin: "40px 0px" }}>
            <Grid item sx={{ width: "100%", marginTop: "10px" }}>
              <ComparisionTable cars={compareList} />
            </Grid>
          </Grid>
        )}
      </Box>
      {showSuggestion ? (
        <CarListing
          title={"Recommended Cars For You"}
          secondary={"view all"}
          compareOption={false}
          carList={filteredCars}
        />
      ) : (
        <CarListing title={"Latest Cars"} secondary={"view all"} compareOption={false} carList={ALL_CARS} />
      )}
    </>
  );
};

export default ComparisonTable;
