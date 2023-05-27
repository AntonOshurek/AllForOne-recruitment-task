//vars
import { SortAliases } from "../variables/variables";
//types
import type { IReportType } from "./reports-type"

export interface IAppState {
	serverData: IReportType[] | [],
	sortedData: IReportType[]| [],
	sortType: SortAliases,
};
