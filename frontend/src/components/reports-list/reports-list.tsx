//components
import ReportsListItem from './reports-list-item/reports-list-item';
//store
import { useAppSelector } from '../../hooks/hooks';
import { SelectorGetFacetingData } from '../../store/selectors/app-selectors';
//types
import type { IReportType } from '../../types/reports-type';
//styles
import './reports-list.scss';

const ReportsList = (): JSX.Element => {
	const reportsData: IReportType[] = useAppSelector(SelectorGetFacetingData);

	return (
		<ul className='reports-list'>
			{
				reportsData.map((report: IReportType) => {
					return <ReportsListItem report={report} key={report.id} />;
				})
			}
		</ul>
	);
};

export default ReportsList;
