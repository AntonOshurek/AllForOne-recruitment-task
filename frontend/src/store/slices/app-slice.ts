import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//state
import { appState } from '../state/app-state';
//types
import type {
	ISetServerDataAction,
	ISetFacetingDataAction,
	ISetSortTypeAction,
	IDeleteReportTypeAction,
	IUpdateReportTypeAction,
	ISetNewReportTypeAction,
	IAddNewReportTypeAction,
	ISetCityFilterTypeAction,
	ISetPaginationCountTypeAction
} from '../../types/action-types';

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
		setCityFilter: (state, action: PayloadAction<ISetCityFilterTypeAction>) => {
			const { city } = action.payload;
			state.cityFilter = city;
		},
		deleteReport: (state, action: PayloadAction<IDeleteReportTypeAction>) => {
			const { id } = action.payload;
			state.serverData = state.serverData.filter((item) => item.id !== id);
		},
		updateReport: (state, action: PayloadAction<IUpdateReportTypeAction>) => {
			const { reportForUpdate } = action.payload;
			state.serverData = state.serverData.map((item) => {
				if(item.id === reportForUpdate.id) {
					return reportForUpdate;
				};
				return item;
			});
		},
		setNewReport: (state, action: PayloadAction<ISetNewReportTypeAction>) => {
			state.newReport = action.payload.newReport;
		},
		discardNewReport: (state) => {
			state.newReport = null;
		},
		addNewReport: (state, action: PayloadAction<IAddNewReportTypeAction>) => {
			state.serverData = [action.payload.newReport, ...state.serverData];
		},
		setPaginationCount: (state, action: PayloadAction<ISetPaginationCountTypeAction>) => {
			state.paginationCount = action.payload.newPaginationCount;
		},
	},
});

export const {
	setServerData,
	setFacetingData,
	setSortType,
	deleteReport,
	setNewReport,
	discardNewReport,
	addNewReport,
	setPaginationCount,
	setCityFilter,
	updateReport,
} = appSlice.actions;

export default appSlice.reducer;
