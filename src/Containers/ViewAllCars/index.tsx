import { useEffect, useState } from "react";
import { GetAllCars } from "../../Services";
import { Box, Grid } from "@mui/material";
import CarDetailsCard from "../../Components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../../Components/Header";

const ViewAllCars = () => {
  const [cars, setCars] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCars = async (page: number) => {
    try {
      const carsList = await GetAllCars();
      if (carsList.data.length > 0) {
        setCars((prevCars) => [...prevCars, ...carsList.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
    <Header/>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
      }}
    >
      <InfiniteScroll
        dataLength={cars.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}>No more cars to show</p>}
      >
        <Grid container spacing={2} justifyContent="center" margin={'20px'}>
          {cars.map((car: any, index: number) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CarDetailsCard car={car} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
    </>
  );
};

export default ViewAllCars;
