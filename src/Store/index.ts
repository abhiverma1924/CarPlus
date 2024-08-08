import { Reducer, Slice, combineReducers, configureStore } from '@reduxjs/toolkit';
import { compareSlice } from '../Slices';

interface ISimpleMap {
	[field: string]: Reducer;
}
const reducerMap: ISimpleMap = { [compareSlice.name]: compareSlice.reducer };

const store = configureStore({
	reducer: combineReducers(reducerMap),
});

export const registerSlice = (slice: Slice): void => {
	reducerMap[slice.name] = slice.reducer;
	store.replaceReducer(combineReducers(reducerMap));
};

export default store;
