import { SortTypes, SortAliases } from "../variables/variables"

export interface ISortType {
	type: SortTypes,
	name: string,
	alias: SortAliases,
};

export type SortTypesArrayType = ISortType[];
