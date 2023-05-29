//services
import { facetingService } from "../../services";
//store
import {
	addNewReport,
	deleteReport,
	discardNewReport,
	setCityFilter,
	setFacetingData,
	setNewReport,
	setServerData,
	setSortType,
	updateReport
} from "../slices/app-slice";
//vars
import { FilterAliases } from "../../variables/variables";
//types
import type {
	IAddNewReportTypeAction,
	IDeleteReportTypeAction,
	ISetCityFilterTypeAction,
	ISetNewReportTypeAction,
	ISetServerDataAction,
	ISetSortTypeAction,
	IUpdateReportTypeAction
} from "../../types/action-types";
import type { AppThunk } from "../../types/store-types";

export const setServerDataAction =
	(action: ISetServerDataAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(setServerData(action));

		const currentSortType = getState().app.sortType;
		const facetingData = facetingService.sort(currentSortType, action.serverData);
		dispatch(setFacetingData({facetingData: facetingData}));
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

		dispatch(setFacetingData({facetingData: filtredArray}));
	};

export const setSortTypeAction =
	(action: ISetSortTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(setSortType(action));

		dispatch(setFacetingDataAction());
	};

export const setCityFilterTypeAction =
	(action: ISetCityFilterTypeAction): AppThunk =>
	(dispatch, getState) => {
		dispatch(setCityFilter(action));

		dispatch(setFacetingDataAction());
	};

export const deleteReportAction =
	(action: IDeleteReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(deleteReport(action));

		dispatch(setFacetingDataAction());
	};

export const updateReportAction =
	(action: IUpdateReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(updateReport(action));

		dispatch(setFacetingDataAction());
	};

export const setNewReportAction =
	(action: ISetNewReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(setNewReport({newReport: action.newReport}));
	};

export const discardNewReportAction =
	(): AppThunk =>
	(dispatch) => {
		dispatch(discardNewReport());
	};

export const addNewReportAction =
	(action: IAddNewReportTypeAction): AppThunk =>
	(dispatch) => {
		dispatch(addNewReport({newReport: action.newReport}));

		dispatch(setFacetingDataAction());
	};
