import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//state
import { appState } from '../state/app-state';
//services
import { facetingService } from '../../services';
//types
import type { ISetServerDataAction, ISetFacetingDataAction, ISetSortTypeAction, IDeleteReportTypeAction, IUpdateReportTypeAction, ISetNewReportTypeAction, IAddNewReportTypeAction } from '../../types/action-types';
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
		}
	},
});

export const { setServerData, setFacetingData, setSortType, deleteReport, setNewReport, discardNewReport, addNewReport } = appSlice.actions;

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
	(dispatch) => {
		dispatch(appSlice.actions.deleteReport(action));

		//when we delete one item, we need update faceting data
		dispatch(setFacetingDataAction());
	};

export const updateReportAction =
	(action: IUpdateReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(appSlice.actions.updateReport(action));

		//when we delete one item, we need update faceting data
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

		//when we add new one to state, we need update faceting data
		dispatch(setFacetingDataAction());
	};

export default appSlice.reducer;
