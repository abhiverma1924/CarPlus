import {Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Car } from "../../../Containers/ComparisionPage";
import { useDispatch } from "react-redux";
import { DELETE_CAR } from "../../../Slices";

interface Props {
  car: Car;
}

const SingleTab: React.FC<Props> = ({ car }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(DELETE_CAR(car.id))
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" position="relative" md={4} marginLeft={"20px"}>
        <Grid md={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15px 5px" }}>
          <IconButton onClick={onRemove} sx={{ backgroundColor: "#faf8f7" }}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={car.image} width={"120px"} height={"70px"} style={{ borderRadius: "10px" }} loading="lazy"/>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography sx={{ fontSize: "18px", fontWeight: 800 }} component="div">
            {car?.make} {car?.model}
          </Typography>
          <Typography>{`${car?.year} | ${car?.price} | ${car?.color}`}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleTab;
