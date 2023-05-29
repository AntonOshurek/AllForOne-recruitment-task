import { SortTypes, SortAliases } from "../variables/variables"

export interface ISortType {
	type: SortTypes,
	name: string,
	alias: SortAliases,
};

export interface IPaginationCounterType {
	pageCount: number,
	maxPageCount: number,
};

export type SortTypesArrayType = ISortType[];
