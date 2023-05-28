import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//state
import { appState } from '../state/app-state';
//services
import { facetingService } from '../../services';
//types
import type { ISetServerDataAction, ISetFacetingDataAction, ISetSortTypeAction, IDeleteReportTypeAction, IUpdateReportAction } from '../../types/action-types';
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
		deleteReport: (state, action: PayloadAction<IDeleteReportTypeAction>) => {
			const { id } = action.payload;
			state.serverData = state.serverData.filter((item) => item.id !== id);
		},
		updateReport: (state, action: PayloadAction<IUpdateReportAction>) => {
			const { reportForUpdate } = action.payload;
			state.serverData = state.serverData.map((item) => {
				if(item.id === reportForUpdate.id) {
					return reportForUpdate;
				};
				return item;
			});
		},
	},
});

export const { setServerData, setFacetingData, setSortType, deleteReport } = appSlice.actions;

export const setServerDataAction =
	(action: ISetServerDataAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setServerData(action));

		const currentSortType = getState().app.sortType;
		const facetingData = facetingService.sort(currentSortType, action.serverData);
		dispatch(appSlice.actions.setFacetingData({facetingData: facetingData}));
	};

export const setFacetingDataAction =
	(): AppThunk =>
	(dispatch, getState) => {
		const data = getState().app.serverData;
		const currentSortType = getState().app.sortType;
		const facetingData = facetingService.sort(currentSortType, data);
		dispatch(appSlice.actions.setFacetingData({facetingData: facetingData}));
	};

export const setSortTypeAction =
	(action: ISetSortTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setSortType(action));

		//when we add new sort type, we need update faceting data
		const data = getState().app.serverData;
		const facetingData = facetingService.sort(action.sortType, data);
		dispatch(appSlice.actions.setFacetingData({facetingData: facetingData}));
	};

export const deleteReportAction =
	(action: IDeleteReportTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.deleteReport(action));

		//when we delete one item, we need update faceting data
		dispatch(setFacetingDataAction());
	};

export const updateReportAction =
	(action: IUpdateReportAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.updateReport(action));

		//when we delete one item, we need update faceting data
		dispatch(setFacetingDataAction());
	};


export default appSlice.reducer;
