//vars
import { SortAliases } from "../../variables/variables";
//types
import type { INewReportType, IReportType } from "../../types/reports-type";
import type { RootState } from "../../types/store-types";

export const SelectorGetServerData = (state: RootState): IReportType[] => state.app.serverData;
export const SelectorGetServerDataLength = (state: RootState): number => state.app.serverData.length;
export const SelectorGetFacetingData = (state: RootState): IReportType[] => state.app.facetingData;
export const SelectorGetSortType = (state: RootState): SortAliases => state.app.sortType;
export const SelectorGetNewReport = (state: RootState): INewReportType | null => state.app.newReport;
export const SelectorGetPageCount = (state: RootState): number => state.app.paginationCount;
