import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//state
import { appState } from '../state/app-state';
//services
import { facetingService } from '../../services';
//types
import type { ISetServerDataAction, ISetFacetingDataAction, ISetSortTypeAction } from '../../types/action-types';
import type { AppThunk } from '../../types/store-types';

export const appSlice = createSlice({
	name: 'app',
	initialState: appState,

	reducers: {
		setServerData: (state, action: PayloadAction<ISetServerDataAction>) => {
			const { serverData } = action.payload;
			state.serverData = serverData;
		},
		setFacetingData: (state, action: PayloadAction<ISetFacetingDataAction>) => {
			const { facetingData } = action.payload;
			state.facetingData = facetingData;
		},
		setSortType: (state, action: PayloadAction<ISetSortTypeAction>) => {
			const { sortType } = action.payload;
			state.sortType = sortType;
		},
	},
});

export const { setServerData, setFacetingData, setSortType } = appSlice.actions;

export const setServerDataAction =
	(action: ISetServerDataAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setServerData(action));

		const currentSortType = getState().app.sortType;
		const facetingData = facetingService.sort(currentSortType, action.serverData);
		dispatch(appSlice.actions.setFacetingData({facetingData: facetingData}));
	};

export const setFacetingDataAction =
	(action: ISetFacetingDataAction): AppThunk =>
	(dispatch, getState) => {
		const currentSortType = getState().app.sortType;
		const facetingData = facetingService.sort(currentSortType, action.facetingData);
		dispatch(appSlice.actions.setFacetingData({facetingData: facetingData}));
	};

export const setSortTypeAction =
	(action: ISetSortTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setSortType(action));

		const data = getState().app.serverData;
		const facetingData = facetingService.sort(action.sortType, data);
		dispatch(appSlice.actions.setFacetingData({facetingData: facetingData}));
	};


export default appSlice.reducer;
