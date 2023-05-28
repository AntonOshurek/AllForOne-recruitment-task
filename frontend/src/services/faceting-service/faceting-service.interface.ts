//vars
import { FilterAliases, SortAliases } from "../../variables/variables";
//types
import type { IReportType } from "../../types/reports-type";

export interface IFacetingService {
	sort: (sortAlias: SortAliases, reportsArray: IReportType[]) => IReportType[],
	filter: (filterAlias: FilterAliases, filterValue: string, reportsArray: IReportType[]) => IReportType[],
};
