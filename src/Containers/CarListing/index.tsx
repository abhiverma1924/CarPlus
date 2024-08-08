import React, { useState } from "react";
import { Box, Card, Skeleton, Tab, Tabs, tabsClasses, Typography } from "@mui/material";
import CarDetailsCard from "../../Components/Card";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import { Car } from "../ComparisionPage";

interface Props{
  title : string;
  secondary: string;
  compareOption: any;
  carList?: Car[];
}

const CarListing:React.FC<Props> = ({title, secondary, compareOption, carList}) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onViewDetails = () => {
    navigate("/view-all-cars");
  };

  return (
    <>
      <Card
        sx={{
          bgcolor: "background.paper",
          width: "90%",
          padding: "10px 0px",
          margin: "40px auto", 
          borderRadius: "10px",
        }}
        elevation={3}
      >
        <Box sx={{ margin: "0px 40px", padding: "0px 10px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: "700", textTransform: "capitalize" }}>{title}</Typography>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          aria-label="scrollable prevent tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .Mui-selected": {
              borderBottom: "none",
            },
          }}
        > 
          {carList?.map((car: any) => (
            <Tab
              key={car.id}
              label={
                <Box sx={{ padding: "10px" }}>
                  <CarDetailsCard car={car} compare={compareOption}/>
                </Box>
              }
            />
          ))}
        </Tabs>
        {secondary && <Box sx={{ margin: "0px 40px", padding: "10px" }} onClick={onViewDetails}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "capitalize",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
          {secondary}
            <ArrowCircleRightIcon sx={{ marginLeft: "8px" }} />
          </Typography>
        </Box>}
      </Card>
    </>
  );
};

export default CarListing;
