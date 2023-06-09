//vars
import { SortAliases } from "../variables/variables";
//types
import type { INewReportType, IReportType } from "./reports-type"

export interface IAppState {
	serverData: IReportType[] | [],
	facetingData: IReportType[]| [],
	sortType: SortAliases,
	cityFilter: string,
	paginationCount: number,
	newReport: INewReportType | null,
};
