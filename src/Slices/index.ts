import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Car } from '../Containers/ComparisionPage';

const INITIAL_STATE = () => ({
  loading: false,
  error: [] as string[],
  compareList: [] as unknown as Car[],
  searchHistory: [] as unknown as Car[],
});

interface IACTION<T = unknown> {
  type: string | symbol;
  payload: T;
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState: INITIAL_STATE(),
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = [];
    },
    RESET: (state) => Object.assign(state, INITIAL_STATE()),
    ADD_CAR: (state, action: PayloadAction<Car>) => {
      state.compareList.push(action.payload);
    },
    DELETE_CAR: (state, action: PayloadAction<string | number>) => {
      state.compareList = state.compareList.filter(car => car.id !== action.payload);
    },
    UPDATE_CAR: (state, action: PayloadAction<Car>) => {
      const index = state.compareList.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.compareList[index] = action.payload;
      }
    },
    SEARCH_HISTORY: (state, action: PayloadAction<Car>) => {
      state.searchHistory.push(action.payload);
    },
  },
});

export const { CLEAR_ERROR, RESET, ADD_CAR, DELETE_CAR, UPDATE_CAR, SEARCH_HISTORY } = compareSlice.actions;
export default compareSlice.reducer;

const CompareListSelector = (state: any): any=> state[compareSlice.name].compareList;

export const useCompareList = (): any=> useSelector(CompareListSelector);

const searchHistorySelector = (state: any): any=> state[compareSlice.name].searchHistory;

export const useSearchHistory = (): any=> useSelector(searchHistorySelector);
