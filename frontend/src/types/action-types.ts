//vars
import { SortAliases } from "../variables/variables";
//types
import type { IReportType } from "./reports-type";

export interface ISetServerDataAction {
	serverData: IReportType[],
};

export interface ISetFacetingDataAction {
	facetingData: IReportType[],
};

export interface ISetSortTypeAction {
	sortType: SortAliases,
};

export interface IDeleteReportTypeAction {
	id: string,
};
