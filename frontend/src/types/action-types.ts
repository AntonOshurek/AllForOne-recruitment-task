//vars
import { SortAliases } from "../variables/variables";
//types
import type { IReportType } from "./reports-type";

export interface ISetServerDataAction {
	serverData: IReportType[],
};

export interface ISetSortedDataAction {
	sortedData: IReportType[],
};

export interface ISetSortTypeAction {
	sortType: SortAliases,
};
