import { Card, Skeleton } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Components/Header";

const Layout = lazy(() => import("../Containers/Layout"));
const CarDetails = lazy(() => import("../Containers/CarDetails"));
const ComparisonTable = lazy(() => import("../Containers/ComparisionPage"));
const ViewAllCars = lazy(() => import("../Containers/ViewAllCars"));

const Loading = () => (
  <>
    <Header />
    <Card sx={{ margin: "40px", padding:'40px' }}>
      <Skeleton variant="rectangular" width="100%" height={350} sx={{ margin: "40px" }} />
    </Card>
  </>
);

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/home" element={<Layout />} />
          <Route path="/car-details" element={<CarDetails />} />
          <Route path="/comparison-table" element={<ComparisonTable />} />
          <Route path="/view-all-cars" element={<ViewAllCars />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoute;
