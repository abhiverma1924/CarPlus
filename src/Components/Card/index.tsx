import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_CAR, useCompareList } from "../../Slices";
import Toasty from "../Toasty";
import { Car } from "../../Containers/ComparisionPage";

interface Props {
  car: Car;
  noImage?: boolean;
  noButton?: boolean;
  onClose?: () => void;
  compare?: boolean;
}

const CarDetailsCard: React.FC<Props> = ({ car, noImage = true, noButton = true, onClose, compare = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const compareList = useCompareList();
  const [disableCompare, setDisableCompare] = useState<boolean>(false);

  useEffect(() => {
    if (compareList.length > 2) {
      setDisableCompare(true);
    }
  }, [compareList]);

  const addToCompare = () => {
    if (compareList.length < 2) dispatch(ADD_CAR(car));
    else Toasty.info("you can compare only two cars")
  };

  const onViewDetails = () => {
    navigate("/car-details", { state: { car: car } });
  };

  return (
    <Card
      sx={{ maxWidth: 345, marginTop: 2, borderRadius: "10px", position: "relative", width: "100vw" }}
      elevation={3}
    >
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey",
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {noImage && <CardMedia sx={{ height: 160 }} image={"https://shorturl.at/rNL2Q"} title="car image" />}
      <CardContent sx={{ height: 100 }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 800 }} component="div">
          {car?.make} {car?.model}
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }} component="div">
          {car?.price}
        </Typography>
        {compare ? (
          <Grid container columns={{ xs: 12, md: 12 }}>
            <Grid item xs={8} sm={8} md={8} margin={"8px 0px"}>
              <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#6E6F73" }}>
                {car?.color} | {car?.fuelType} | {car?.year}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <FormGroup onClick={addToCompare}>
                <FormControlLabel
                  disabled={disableCompare}
                  control={<Checkbox defaultChecked={false} size="small" color="default" />}
                  label="compare"
                />
              </FormGroup>
            </Grid>
          </Grid>
        ) : (
          <Grid container columns={{ xs: 12, md: 12 }}>
            <Grid item xs={12} sm={12} md={12} margin={"8px 0px"}>
              <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#6E6F73" }}>
                {car?.color} | {car?.fuelType} | {car?.year}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
      {noButton && (
        <CardActions>
          <Button
            onClick={onViewDetails}
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              fontWeight: 900,
            }}
          >
            View Details
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CarDetailsCard;
