import dayjs from 'dayjs';
//vars
import { FilterAliases, SortAliases } from "../../variables/variables";
//utils
import { removeSpaces } from '../../utils/utils';
//services
import temperatureService from '../temperature-service/temperature-service';
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
				const sortedByTempUp = [...reportsArray].sort((a, b) => {
					//transform temp to kelvin for compare
					const aKelvin = temperatureService.convertToKelvin(a.unit, a.temperature);
					const bKelvin = temperatureService.convertToKelvin(b.unit, b.temperature);

					return aKelvin - bKelvin;
				});
				sortResult = sortedByTempUp;
				break;
			case SortAliases.SORT_BY_TEMP_DOWN:
				const sortedByTempDown = [...reportsArray].sort((a, b) => {
					//transform temp to kelvin for compare
					const aKelvin = temperatureService.convertToKelvin(a.unit, a.temperature);
					const bKelvin = temperatureService.convertToKelvin(b.unit, b.temperature);

					return bKelvin - aKelvin;
				});
				sortResult = sortedByTempDown;
				break;
			default:
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _: never = sortAlias;
				throw new Error('[FacetingService] uncorrect sortAlias')
		}
		return sortResult;
	};

	filter(filterAlias: FilterAliases, filterValue: string, reportsArray: IReportType[]): IReportType[] {
		let sortResult: IReportType[];

		switch(filterAlias) {
			case FilterAliases.FILTER_BY_CITY:
				const filtredByCity = reportsArray.filter((item) => {
					const itemCity = removeSpaces(item.city.toLowerCase().trim());
					const filterCity = removeSpaces(filterValue.toLowerCase().trim());

					if(itemCity.includes(filterCity)) {
						return item;
					} else {
						return null
					};
				});

				sortResult = filtredByCity;
				break;
			default:
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _: never = filterAlias;
				throw new Error('[FacetingService] uncorrect sortAlias')
		};

		return sortResult;
	};
};

const facetingService = new FacetingService();

export default facetingService;
