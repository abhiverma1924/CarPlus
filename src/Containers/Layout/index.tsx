import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import CarListing from "../CarListing";
import { Box, Card, Skeleton } from "@mui/material";
import ComparisionTab from "../../Components/ComparisionTab";
import { useCompareList, useSearchHistory } from "../../Slices";
import { GetAllCars } from "../../Services";
import { ALL_CARS } from "../../Constants/constants";
import Toasty from "../../Components/Toasty";
import { Car } from "../ComparisionPage";

const Layout = () => {
  const compareList = useCompareList();
  const searchHistory = useSearchHistory();
  const [compareTab, setCompareTab] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (compareList.length > 0) {
      setCompareTab(true);
    }
  }, [compareList]);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const carsList = await GetAllCars();
        setCars(carsList.data);
        setLoading(false);
      } catch (error: any) {
        console.log("error", error);
        Toasty.error(error);
      }
    };
    fetchCars();
  }, []);

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

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Card>
            {/* <Header/> */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={100} // Adjust height according to your content
              sx={{ margin: "20px 0" }}
            />
          </Card>
        ) : (
          <CarListing title={"Latest"} secondary={"View All Latest Cars"} compareOption={false} carList={cars} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {showSuggestion && (
          <CarListing
            title={"Recommended Cars For You"}
            secondary={"View all"}
            compareOption={false}
            carList={filteredCars.slice(0, 10)}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 20,
          width: "100%",
          zIndex: 1000,
        }}
      >
        {compareTab && <ComparisionTab />}
      </Box>
    </>
  );
};
export default Layout;
