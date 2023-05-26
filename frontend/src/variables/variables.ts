//types
import type { SortTypesArrayType } from "../types/sort-types";

export const enum SortAliases {
	SORT_BY_DEFAULT = 'sort-by-default',
	SORT_BY_DATE_UP = 'sort-by-date-up',
	SORT_BY_DATE_DOWN = 'sort-by-date-down',
	SORT_BY_TEMP_UP = 'sort-by-temp-up',
	SORT_BY_TEMP_DOWN = 'sort-by-temp-down',
};

export const enum SortTypes {
	SORT_DEFAULT = 'sort-default',
	SORT_DATE = 'sort-date',
	SORT_TEMP = 'sort-temp',
};

export const SortTypesArray: SortTypesArrayType = [
	{
		type: SortTypes.SORT_DEFAULT,
		name: 'SORT BY DEFAULT',
		alias: SortAliases.SORT_BY_DEFAULT,
	},
	{
		type: SortTypes.SORT_DATE,
		name: 'SORT BY DATE up',
		alias: SortAliases.SORT_BY_DATE_UP,
	},
	{
		type: SortTypes.SORT_DATE,
		name: 'SORT BY DATE down',
		alias: SortAliases.SORT_BY_DATE_DOWN,
	},
	{
		type: SortTypes.SORT_TEMP,
		name: 'SORT BY TEMP up',
		alias: SortAliases.SORT_BY_TEMP_UP,
	},
	{
		type: SortTypes.SORT_TEMP,
		name: 'SORT BY TEMP down',
		alias: SortAliases.SORT_BY_TEMP_DOWN,
	},
];

export const enum cardInnersNames {
	EDIT = 'edit',
	DATA = 'data',
};

export const enum reportUnitValue {
	C = 'c',
	K = 'k',
	F = 'f',
};
