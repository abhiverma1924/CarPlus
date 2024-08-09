import { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import VersusIcon from "../../Assets/versus.png";
import SingleTab from "./SingleTab";
import { useCompareList } from "../../Slices";
import { useNavigate } from "react-router-dom";

const ComparisionTab = () => {
  const compareList = useCompareList();
  const navigate = useNavigate();
  const [firstCar, setFirstCar] = useState<any>({});
  const [secondCar, setSecondCar] = useState<any>({});
  const [firstEmpty, setFirstEmpty] = useState<boolean>(true);
  const [secondEmpty, setSecondEmpty] = useState<boolean>(true);

  const onCompare = () => {
    navigate('/car-compare')
  };

  const viewAll = () =>{
    navigate('/view-all-cars');
  }

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

  return (
    <Card
      elevation={3}
      sx={{
        width: "60%",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Grid container columnGap={1}>
        {!firstEmpty ? (
          <SingleTab car={firstCar} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15px" }} onClick={viewAll}>
            <Typography sx={{ fontSize: "16px", color: "grey", fontWeight: 400 }}>
              Add another car to start comparison
            </Typography>
          </Box>
        )}
        <Grid padding={"20px 10px"}>
          <img src={VersusIcon} width={40} height={40} loading="lazy"/>
        </Grid>
        {!secondEmpty ? (
          <SingleTab car={secondCar} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15px" }} onClick={viewAll}>
            <Typography sx={{ fontSize: "16px", color: "grey", fontWeight: 400 }}>
              Add another car to start comparison
            </Typography>
          </Box>
        )}
        <Grid md={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            onClick={onCompare}
            disabled={!(compareList.length===2)}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          >
            View Details
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ComparisionTab;
