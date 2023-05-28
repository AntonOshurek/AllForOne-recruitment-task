//components
import ReportsListItem from './reports-list-item/reports-list-item';
import { NewReportItem } from '../';
//store
import { useAppSelector } from '../../hooks/hooks';
import { SelectorGetFacetingData, SelectorGetNewReport } from '../../store/selectors/app-selectors';
//types
import type { IReportType } from '../../types/reports-type';
//styles
import './reports-list.scss';

const ReportsList = (): JSX.Element => {
	const reportsData: IReportType[] = useAppSelector(SelectorGetFacetingData);
	const isNewReport = useAppSelector(SelectorGetNewReport);

	return (
		<ul className='reports-list'>
			{
				isNewReport !== null ? <NewReportItem/> : null
			}
			{
				reportsData.map((report: IReportType) => {
					return <ReportsListItem report={report} key={report.id} />;
				})
			}
		</ul>
	);
};

export default ReportsList;
