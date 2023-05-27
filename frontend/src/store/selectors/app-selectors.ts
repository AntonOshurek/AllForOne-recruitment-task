//vars
import { SortAliases } from "../../variables/variables";
//types
import type { IReportType } from "../../types/reports-type";
import type { RootState } from "../../types/store-types";

export const SelectorGetServerData = (state: RootState): IReportType[] => state.app.serverData;
export const SelectorGetFacetingData = (state: RootState): IReportType[] => state.app.facetingData;
export const SelectorGetSortType = (state: RootState): SortAliases => state.app.sortType;