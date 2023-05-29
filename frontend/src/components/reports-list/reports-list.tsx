//components
import ReportsListItem from './reports-list-item/reports-list-item';
import { NewReportItem } from '../';
//store
import { useAppSelector } from '../../hooks/hooks';
import { SelectorGetFacetingData, SelectorGetNewReport, SelectorGetPageCount } from '../../store/selectors/app-selectors';
//vars
import { itemsOnOnePage } from '../../variables/variables';
//types
import type { IReportType } from '../../types/reports-type';
//styles
import './reports-list.scss';

const ReportsList = (): JSX.Element => {
	const reportsData: IReportType[] = useAppSelector(SelectorGetFacetingData);
	const isNewReport = useAppSelector(SelectorGetNewReport);

	const currentPageCount = useAppSelector(SelectorGetPageCount);

	// Вычисляем индексы начала и конца для текущей страницы
	const startIndex = 0;
	const endIndex = startIndex + (itemsOnOnePage * currentPageCount);

	// console.log(Math.ceil(reportsData.length / itemsOnOnePage))

	// Получаем элементы для текущей страницы
	const paginatedData = reportsData.slice(startIndex, endIndex);

	return (
		<ul className='reports-list'>
			{
				isNewReport !== null ? <NewReportItem/> : null
			}
			{
				paginatedData.map((report: IReportType) => {
					return <ReportsListItem report={report} key={report.id} />;
				})
			}
		</ul>
	);
};

export default ReportsList;
