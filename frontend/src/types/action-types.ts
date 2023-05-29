//vars
import { SortAliases } from "../variables/variables";
//types
import type { INewReportType, IReportType } from "./reports-type";
import type { IPaginationCounterType } from "./sort-types";

export interface ISetServerDataAction {
	serverData: IReportType[],
};

export interface ISetFacetingDataAction {
	facetingData: IReportType[],
};

export interface ISetSortTypeAction {
	sortType: SortAliases,
};

export interface ISetCityFilterTypeAction {
	city: string,
};

export interface IDeleteReportTypeAction {
	id: string,
};

export interface IUpdateReportTypeAction {
	reportForUpdate: IReportType,
};

export interface ISetNewReportTypeAction {
	newReport: INewReportType,
};

export interface IAddNewReportTypeAction {
	newReport: IReportType,
};

export interface ISetPaginationCountTypeAction {
	newPaginationCount: number,
};
