import dayjs from 'dayjs';
//vars
import { SortAliases } from "../../variables/variables";
//types
import type { IFacetingService } from "./faceting-service.interface";
import type { IReportType } from "../../types/reports-type";

class FacetingService implements IFacetingService {
	sort(sortAlias: SortAliases, reportsArray: IReportType[]): IReportType[] {

		let sortResult: IReportType[];

		switch(sortAlias) {
			case SortAliases.SORT_BY_DEFAULT:
				sortResult = reportsArray;
				break;
			case SortAliases.SORT_BY_DATE_UP:
				const sortedByDateUp = [...reportsArray].sort((a, b) => {
					const dateA = dayjs(a.date);
					const dateB = dayjs(b.date);
					return dateA.diff(dateB);
				});
				sortResult = sortedByDateUp;
				break;
			case SortAliases.SORT_BY_DATE_DOWN:
				const sortedByDateDown = [...reportsArray].sort((a, b) => {
					const dateA = dayjs(a.date);
					const dateB = dayjs(b.date);
					return dateB.diff(dateA);
				});
				sortResult = sortedByDateDown;
				break;
			case SortAliases.SORT_BY_TEMP_UP:
				const sortedByTempUp = [...reportsArray].sort((a, b) => {;
					return a.temperature - b.temperature;
				});
				sortResult = sortedByTempUp;
				break;
			case SortAliases.SORT_BY_TEMP_DOWN:
				const sortedByTempDown = [...reportsArray].sort((a, b) => {
					return b.temperature - a.temperature;
				});
				sortResult = sortedByTempDown;
				break;
			default:
				sortResult = reportsArray;
		}
		return sortResult;
	};

	filter() {

	};
};

const facetingService = new FacetingService();

export default facetingService;
