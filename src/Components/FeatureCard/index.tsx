import { Box, Card, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_CAR, DELETE_CAR, useCompareList } from "../../Slices";
import { Car } from "../../Containers/ComparisionPage";

interface Props {
  car: any;
  compare?: boolean;
  setCompare?: any
}

const FeatureCard: React.FC<Props> = ({ car, compare, setCompare }) => {
  const [carDetails, setCarDetails] = useState<Car>();
  const dispatch = useDispatch();
  const compareList = useCompareList();
  const [disableCompare, setDisableCompare] = useState<boolean>(false);

  useEffect(() => {
    if (car) {
      const filteredCar = { ...car };
      delete filteredCar.image;
      delete filteredCar.id;
      setCarDetails(filteredCar);
    }
  }, [car]);

  useEffect(() => {
    console.log(compareList);
    if (compareList?.length > 2) {
      setDisableCompare(true);
    } else {
      setDisableCompare(false);
    }
  }, [compareList]);

  const handleCompareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCompare(isChecked);
    if (isChecked) {
      dispatch(ADD_CAR(car));
    } else {
      dispatch(DELETE_CAR(car.id));
    }
  };

  return (
    <Card sx={{ width: "100%", padding: "0px 20px", marginTop: "40px" }} elevation={4}>
      <Grid container>
        <Grid item xs={12} sm={12} md={10}>
          <Typography fontSize={"24px"} fontWeight={"900"} padding={"10px 0px"}>
            Car Overview
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} padding={"10px"}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={compare}
                  size="small"
                  color="default"
                  onChange={handleCompareChange}
                  disabled={disableCompare && !compare}
                />
              }
              label="compare"
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Divider sx={{ margin: "0px -20px" }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} margin={"20px"} padding={"20px"}>
        {carDetails &&
          Object.entries(carDetails).map(([key, value]) => (
            <Grid xs={12} md={6} container marginTop={"5px"} >
              <Grid item xs={4} md={4}>
                <Typography color={"#6E6F73"} textTransform={"capitalize"}>
                  {key}:
                </Typography>
              </Grid>
              <Grid item xs={8} md={8}>
                <Typography>
                  <>
                    {Array.isArray(value) && value.every((item) => typeof item === "string") ? value.join(", ") : value}
                  </>
                </Typography>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Card>
  );
};

export default FeatureCard;
