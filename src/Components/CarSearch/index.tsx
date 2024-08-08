import { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ALL_CARS } from "../../Constants/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SEARCH_HISTORY } from "../../Slices";
import { Car } from "../../Containers/ComparisionPage";

const CarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = ALL_CARS.filter(
      (car) => car.make.toLowerCase().includes(value) || car.model.toLowerCase().includes(value)
    );
    setFilteredCars(filtered);
  };

  const handleSelection = (carDetails: Car) => {
    navigate("/car-details", { state: { car: carDetails } });
    dispatch(SEARCH_HISTORY(carDetails));
    setSearchTerm('');
  }

  return (
    <Box sx={{ padding: "0px" }}>
      <TextField
        variant="outlined"
        placeholder="Search Cars or Brands"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          bgcolor: "white",
          borderRadius: "10px",
          width: { xs: "100%", sm: "300px", md: "500px" },
          border: "2px solid black",
        }}
      />
      {searchTerm && (
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "22px",
            top: 30,
            marginLeft: "2px",
            position: "absolute",
            zIndex: "1",
            backgroundColor: "white",
            width: { xs: "100%", sm: "300px", md: "500px" },
          }}
        >
          {filteredCars.map((car: Car, index: number) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={car.id}
              sx={{ backgroundColor: index % 2 != 0 ? "white" : "#f5f5f5", width: "50%" }}
            >
              <Box sx={{ padding: "0px 0px 10px 10px", display: "flex", justifyContent: "start", alignItems: "start" }} onClick={()=> handleSelection(car)}>
                <Typography sx={{ color: "black" }}>
                  {car.make} {car.model}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CarSearch;
