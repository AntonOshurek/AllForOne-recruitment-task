import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//state
import { appState } from '../state/app-state';
//services
import { facetingService } from '../../services';
//types
import type { ISetServerDataAction, ISetSortedDataAction, ISetSortTypeAction } from '../../types/action-types';
import type { AppThunk } from '../../types/store-types';

export const appSlice = createSlice({
	name: 'app',
	initialState: appState,

	reducers: {
		setServerData: (state, action: PayloadAction<ISetServerDataAction>) => {
			const { serverData } = action.payload;
			state.serverData = serverData;
		},
		setSortedData: (state, action: PayloadAction<ISetSortedDataAction>) => {
			const { sortedData } = action.payload;
			state.sortedData = sortedData;
		},
		setSortType: (state, action: PayloadAction<ISetSortTypeAction>) => {
			const { sortType } = action.payload;
			state.sortType = sortType;
		},
	},
});

export const { setServerData, setSortedData, setSortType } = appSlice.actions;

export const setServerDataAction =
	(action: ISetServerDataAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setServerData(action));

		const currentSortType = getState().app.sortType;
		const sortedData = facetingService.sort(currentSortType, action.serverData);
		dispatch(appSlice.actions.setSortedData({sortedData: sortedData}));
	};

export const setSortedDataAction =
	(action: ISetSortedDataAction): AppThunk =>
	(dispatch, getState) => {
		const currentSortType = getState().app.sortType;
		const sortedData = facetingService.sort(currentSortType, action.sortedData);
		dispatch(appSlice.actions.setSortedData({sortedData: sortedData}));
	};

export const setSortTypeAction =
	(action: ISetSortTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setSortType(action));

		const data = getState().app.serverData;
		const sortedData = facetingService.sort(action.sortType, data);
		dispatch(appSlice.actions.setSortedData({sortedData: sortedData}));
	};


export default appSlice.reducer;
