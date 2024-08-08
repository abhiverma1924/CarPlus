import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Layout from "../src/Containers/Layout"; 
import { useCompareList, useSearchHistory } from "../src/Slices";
import { GetAllCars } from "./Services";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
