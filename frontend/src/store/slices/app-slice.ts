import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//state
import { appState } from '../state/app-state';
//vars
import { FilterAliases } from '../../variables/variables';
//services
import { facetingService } from '../../services';
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
} = appSlice.actions;

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
		const cityFilter = getState().app.cityFilter;

		const facetingData = facetingService.sort(currentSortType, data);
		const filtredArray = facetingService.filter(
			FilterAliases.FILTER_BY_CITY,
			cityFilter,
			facetingData
		);

		dispatch(appSlice.actions.setFacetingData({facetingData: filtredArray}));
	};

export const setSortTypeAction =
	(action: ISetSortTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setSortType(action));

		dispatch(setFacetingDataAction());
	};

export const setCityFilterTypeAction =
	(action: ISetCityFilterTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(appSlice.actions.setCityFilter(action));

		dispatch(setFacetingDataAction());
	};

export const deleteReportAction =
	(action: IDeleteReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(appSlice.actions.deleteReport(action));

		dispatch(setFacetingDataAction());
	};

export const updateReportAction =
	(action: IUpdateReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(appSlice.actions.updateReport(action));

		dispatch(setFacetingDataAction());
	};

export const setNewReportAction =
	(action: ISetNewReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(appSlice.actions.setNewReport({newReport: action.newReport}));
	};

export const discardNewReportAction =
	(): AppThunk =>
	(dispatch) => {
		dispatch(appSlice.actions.discardNewReport());
	};

export const addNewReportAction =
	(action: IAddNewReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(appSlice.actions.addNewReport({newReport: action.newReport}));

		dispatch(setFacetingDataAction());
	};

export default appSlice.reducer;
