//vars
import { SortAliases } from "../../variables/variables";
//types
import type { IAppState } from "../../types/state-types";

export const appState: IAppState = {
	serverData: [],
	facetingData: [],
	sortType: SortAliases.SORT_BY_DEFAULT,
	cityFilter: '',
	paginationCount: 1,
	newReport: null,
};
